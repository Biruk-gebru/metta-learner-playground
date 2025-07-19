import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from hyperon import MeTTa
import subprocess
import sys
import threading
import queue

app = Flask(__name__)
CORS(app)

# Persistent MeTTa session and code history
try:
    metta_session = MeTTa()
    print("MeTTa session initialized successfully")  # Debug log
except Exception as e:
    print(f"Error initializing MeTTa session: {e}")  # Debug log
    metta_session = None
code_history = []  # List of dictionaries: [{"id": "code_id", "code": "metta_code"}, ...]

# Queue and lock for managing concurrent MeTTa runs
run_queue = queue.Queue()
run_lock = threading.Lock()
max_concurrent_runs = 2
current_runs = 0

# Helper to process the queue

def process_queue():
    global current_runs
    while not run_queue.empty() and current_runs < max_concurrent_runs:
        func, args, kwargs = run_queue.get()
        threading.Thread(target=func, args=args, kwargs=kwargs).start()
        current_runs += 1

@app.route('/run-metta', methods=['POST'])
def run_metta():
    global metta_session, code_history, current_runs
    try:
        data = request.get_json()
        if not data or 'code' not in data or data.get("language") != "metta":
            return jsonify({"error": "Invalid input"}), 400
        new_code = data['code']
        code_id = data.get('codeId')
        if not code_id:
            return jsonify({"error": "codeId is required"}), 400
        print(f"Received MeTTa code: {new_code}")  # Debug log
    except Exception as e:
        print(f"Error parsing request: {e}")  # Debug log
        return jsonify({"error": f"Request parsing error: {str(e)}"}), 400

    def execute_code():
        nonlocal new_code, code_id
        try:
            code_entry = {"id": code_id, "code": new_code}
            existing_index = None
            for i, entry in enumerate(code_history):
                if entry["id"] == code_id:
                    existing_index = i
                    break
            if existing_index is not None:
                code_history[existing_index] = code_entry
            else:
                code_history.append(code_entry)
            result = []
            exception = [None]  # type: ignore[list-item]
            def run_code():
                try:
                    print(f"Starting MeTTa execution: {new_code}")  # Debug log
                    # Create a fresh session for each execution to avoid hanging
                    fresh_session = MeTTa()
                    res = fresh_session.run(new_code)
                    print(f"MeTTa execution completed, got {len(res)} results")  # Debug log
                    result.extend(res)
                except Exception as e:
                    print(f"MeTTa execution error: {e}")  # Debug log
                    exception[0] = e  # type: ignore[assignment]
            thread = threading.Thread(target=run_code)
            thread.start()
            thread.join(timeout=10)
            if thread.is_alive():
                return jsonify({"error": "Execution timed out after 10 seconds."}), 400
            if exception[0]:
                raise exception[0]
            def is_definition(atom):
                s = str(atom).strip()
                return s.startswith('(=') or s.startswith('=')
            result_strs = [str(atom).strip() for atom in result if not is_definition(atom)]
            formatted_result = '\n'.join(result_strs) + '\n'
            return jsonify({
                "result": formatted_result,
                "codeId": code_id,
                "historyLength": len(code_history)
            })
        finally:
            global current_runs
            with run_lock:
                current_runs -= 1
                process_queue()

    with run_lock:
        if current_runs < max_concurrent_runs:
            current_runs += 1
            return execute_code()
        else:
            run_queue.put((execute_code, (), {}))
            return jsonify({"message": "Your request is queued and will run when resources are available."}), 202

@app.route('/reset-to-code', methods=['POST'])
def reset_to_code():
    global metta_session, code_history
    data = request.get_json()
    if not data or 'codeId' not in data:
        return jsonify({"error": "codeId is required"}), 400
    target_code_id = data['codeId']
    if len(code_history) == 0 :
      return jsonify({"message": "No code history to reset"}), 200
    try:
        target_index = None
        for i, entry in enumerate(code_history):
            if entry["id"] == target_code_id:
                target_index = i
                break
        if target_index is None:
            return jsonify({"error": f"Code ID '{target_code_id}' not found in history"}), 404
        metta_session = MeTTa()
        previous_code = code_history[:target_index]
        code_history = previous_code
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
        return jsonify({"message": "Successfully reset to code"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/reset-atomspace', methods=['POST'])
def reset_atomspace():
    global metta_session, code_history
    metta_session = MeTTa()
    code_history = []
    return jsonify({"message": "AtomSpace and code history completely reset."})

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Backend is running"})

@app.route('/test-metta', methods=['GET'])
def test_metta():
    try:
        test_session = MeTTa()
        result = test_session.run("(+ 1 2)")
        return jsonify({"status": "success", "result": str(result)})
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)})

@app.route('/get-history', methods=['GET'])
def get_history():
    return jsonify({
        "history": code_history,
        "length": len(code_history)
    })

@app.route('/remove-code', methods=['POST'])
def remove_code():
    global metta_session, code_history
    data = request.get_json()
    if not data or 'codeId' not in data:
        return jsonify({"error": "codeId is required"}), 400
    target_code_id = data['codeId']
    if len(code_history) == 0 :
        return jsonify({"message": "No code history to remove"}), 200
    try:
        target_index = None
        for i, entry in enumerate(code_history):
            if entry["id"] == target_code_id:
                target_index = i
                break
        if target_index is None:
            return jsonify({"error": f"Code ID '{target_code_id}' not found in history"}), 404
        removed_entries = code_history[target_index:]
        metta_session = MeTTa()
        code_history = code_history[:target_index]
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
        return jsonify({"message": "Successfully removed code"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/run-python', methods=['POST'])
def run_python():
    data = request.get_json()
    if not data or 'code' not in data:
        return jsonify({"error": "Invalid input"}), 400
    code = data['code']
    try:
        # Run the code in a subprocess with a timeout and capture output
        result = subprocess.run(
            [sys.executable, '-c', code],
            capture_output=True,
            text=True,
            timeout=5
        )
        output = result.stdout
        error = result.stderr
        if result.returncode != 0:
            return jsonify({"error": error or "Unknown error"}), 400
        return jsonify({"result": output})
    except subprocess.TimeoutExpired:
        return jsonify({"error": "Execution timed out"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000) 