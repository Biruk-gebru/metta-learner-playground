import time
import subprocess
import sys
import threading
import queue
import uuid
from flask import Flask, request, jsonify
from flask_cors import CORS
from hyperon import MeTTa

app = Flask(__name__)
CORS(app, origins=['https://metta-learner-playground.vercel.app'])

# Persistent MeTTa session and code history
metta_session = MeTTa()
code_history = []  # List of dictionaries: [{"id": "code_id", "code": "metta_code"}, ...]

# Queuing system for handling multiple run requests
request_queue = queue.Queue()
processing_lock = threading.Lock()
is_processing = False

# Store results for each request
request_results = {}

def process_queue():
    """Background worker to process queued requests"""
    global is_processing, metta_session, code_history
    
    while True:
        try:
            # Get next request from queue
            request_data = request_queue.get(timeout=1)
            if request_data is None:  # Shutdown signal
                break
                
            request_id, code, code_id, language = request_data
            
            try:
                if language == "metta":
                    # Store code in history
                    code_entry = {"id": code_id, "code": code}
                    
                    # Check if this code_id already exists and update it
                    existing_index = None
                    for i, entry in enumerate(code_history):
                        if entry["id"] == code_id:
                            existing_index = i
                            break
                    
                    if existing_index is not None:
                        # Update existing entry
                        code_history[existing_index] = code_entry
                    else:
                        # Add new entry
                        code_history.append(code_entry)

                    # Run code
                    result = metta_session.run(code)

                    # Convert result atoms to string
                    result_strs = [str(atom).strip() for atom in result]
                    formatted_result = '\n'.join(result_strs) + '\n'

                    # Store result
                    request_results[request_id] = {
                        "result": formatted_result,
                        "codeId": code_id,
                        "historyLength": len(code_history),
                        "status": "completed"
                    }
                elif language == "python":
                    # Run Python code in subprocess
                    result = subprocess.run(
                        [sys.executable, '-c', code],
                        capture_output=True,
                        text=True,
                        timeout=5
                    )
                    output = result.stdout
                    error = result.stderr
                    
                    if result.returncode != 0:
                        error_msg = error.strip() if error else f"Python execution failed with return code {result.returncode}"
                        request_results[request_id] = {
                            "error": error_msg,
                            "status": "error"
                        }
                    else:
                        request_results[request_id] = {
                            "result": output,
                            "status": "completed"
                        }
                        
            except subprocess.TimeoutExpired:
                request_results[request_id] = {
                    "error": "Execution timed out after 5 seconds",
                    "status": "error"
                }
            except Exception as e:
                request_results[request_id] = {
                    "error": str(e),
                    "status": "error"
                }
            
            # Mark task as done
            request_queue.task_done()
            
        except queue.Empty:
            continue
        except Exception as e:
            print(f"Error in queue processor: {e}")
            continue

# Start the background worker thread
worker_thread = threading.Thread(target=process_queue, daemon=True)
worker_thread.start()

@app.route('/run-metta', methods=['POST'])
def run_metta():
    data = request.get_json()

    if not data or 'code' not in data or data.get("language") != "metta":
        return jsonify({"error": "Invalid input"}), 400

    new_code = data['code']
    code_id = data.get('codeId')

    if not code_id:
        return jsonify({"error": "codeId is required"}), 400

    # Generate unique request ID
    request_id = str(uuid.uuid4())
    
    # Add request to queue
    request_queue.put((request_id, new_code, code_id, "metta"))
    
    # Wait for result with timeout
    timeout = 30  # 30 seconds timeout
    start_time = time.time()
    
    while time.time() - start_time < timeout:
        if request_id in request_results:
            result = request_results.pop(request_id)
            if result["status"] == "completed":
                return jsonify({
                    "result": result["result"],
                    "codeId": result["codeId"],
                    "historyLength": result["historyLength"]
                })
            else:
                return jsonify({"error": result["error"]}), 500
        time.sleep(0.1)
    
    # Timeout occurred
    return jsonify({"error": "Request timed out"}), 408

@app.route('/run-python', methods=['POST'])
def run_python():
    data = request.get_json()
    if not data or 'code' not in data:
        return jsonify({"error": "Invalid input"}), 400
    
    code = data['code']
    
    # Generate unique request ID
    request_id = str(uuid.uuid4())
    
    # Add request to queue
    request_queue.put((request_id, code, None, "python"))
    
    # Wait for result with timeout
    timeout = 30  # 30 seconds timeout
    start_time = time.time()
    
    while time.time() - start_time < timeout:
        if request_id in request_results:
            result = request_results.pop(request_id)
            if result["status"] == "completed":
                return jsonify({"result": result["result"]})
            else:
                return jsonify({"error": result["error"]}), 500
        time.sleep(0.1)
    
    # Timeout occurred
    return jsonify({"error": "Request timed out"}), 408

@app.route('/reset-to-code', methods=['POST'])
def reset_to_code():
    """Reset atomspace and replay code history up to (but excluding) the specified code ID"""
    global metta_session, code_history

    data = request.get_json()
    
    if not data or 'codeId' not in data:
        return jsonify({"error": "codeId is required"}), 400
    
    target_code_id = data['codeId']

    if len(code_history) == 0 :
      return "", 200
    
    try:
        # Find the index of the target code ID
        target_index = None
        for i, entry in enumerate(code_history):
            if entry["id"] == target_code_id:
                target_index = i
                break
        
        if target_index is None:
            return jsonify({"error": f"Code ID '{target_code_id}' not found in history"}), 404
        
        # Reset the MeTTa session
        metta_session = MeTTa()
        
        # Keep only the code entries before the target index
        previous_code = code_history[:target_index]
        code_history = previous_code
        
        # Replay all previous code
        replay_results = []
        for entry in code_history:
            try:
                result = metta_session.run(entry["code"])
                result_strs = [str(atom).strip() for atom in result]
                replay_results.append({
                    "id": entry["id"],
                    "result": '\n'.join(result_strs) + '\n' if result_strs else ""
                })
            except Exception as replay_error:
                replay_results.append({
                    "id": entry["id"],
                    "error": str(replay_error)
                })
        
        return "", 200
    
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


@app.route('/reset-atomspace', methods=['POST'])
def reset_atomspace():
    """Complete reset of atomspace and code history"""
    global metta_session, code_history
    metta_session = MeTTa()
    code_history = []
    return jsonify({"message": "AtomSpace and code history completely reset."})


@app.route('/get-history', methods=['GET'])
def get_history():
    """Get the current code history"""
    return jsonify({
        "history": code_history,
        "length": len(code_history)
    })


@app.route('/remove-code', methods=['POST'])
def remove_code():
    """Remove a specific code entry and all subsequent ones, then replay"""
    global metta_session, code_history

    data = request.get_json()
    
    if not data or 'codeId' not in data:
        return jsonify({"error": "codeId is required"}), 400
    
    target_code_id = data['codeId']

    if len(code_history) == 0 :
        return "", 200
    
    try:
        # Find the index of the target code ID
        target_index = None
        for i, entry in enumerate(code_history):
            if entry["id"] == target_code_id:
                target_index = i
                break
        
        if target_index is None:
            return jsonify({"error": f"Code ID '{target_code_id}' not found in history"}), 404
        
        # Store removed entries for response
        removed_entries = code_history[target_index:]
        
        # Reset the MeTTa session
        metta_session = MeTTa()
        
        # Keep only the code entries before the target index
        code_history = code_history[:target_index]
        
        # Replay remaining code
        replay_results = []
        for entry in code_history:
            try:
                result = metta_session.run(entry["code"])
                result_strs = [str(atom).strip() for atom in result]
                replay_results.append({
                    "id": entry["id"],
                    "result": '\n'.join(result_strs) + '\n' if result_strs else ""
                })
            except Exception as replay_error:
                replay_results.append({
                    "id": entry["id"],
                    "error": str(replay_error)
                })
        
        return "", 200
    
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


@app.route('/queue-status', methods=['GET'])
def queue_status():
    """Get the current queue status"""
    return jsonify({
        "queue_size": request_queue.qsize(),
        "is_processing": is_processing,
        "pending_requests": len(request_results)
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000) 