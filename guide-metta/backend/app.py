import time
import subprocess
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS
from hyperon import MeTTa

app = Flask(__name__)
CORS(app)

# Persistent MeTTa session and code history
metta_session = MeTTa()
code_history = []  # List of dictionaries: [{"id": "code_id", "code": "metta_code"}, ...]


@app.route('/run-metta', methods=['POST'])
def run_metta():
    global metta_session, code_history

    data = request.get_json()

    if not data or 'code' not in data or data.get("language") != "metta":
        return jsonify({"error": "Invalid input"}), 400

    new_code = data['code']
    code_id = data.get('codeId')

    if not code_id:
        return jsonify({"error": "codeId is required"}), 400

    try:
        # Store code in history
        code_entry = {"id": code_id, "code": new_code}
        
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
        result = metta_session.run(new_code)

        # Convert result atoms to string
        result_strs = [str(atom).strip() for atom in result]
        formatted_result = '\n'.join(result_strs) + '\n'

        return jsonify({
            "result": formatted_result,
            "codeId": code_id,
            "historyLength": len(code_history)
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


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