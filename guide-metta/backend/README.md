# MeTTa Learner Backend

This is the backend server for the MeTTa Learner playground, providing code execution services for MeTTa and Python code.

## Features

### Code Execution
- **MeTTa Code Execution**: Run MeTTa code with persistent session state
- **Python Code Execution**: Run Python code in isolated subprocesses
- **Code History**: Maintains a history of executed code for session management

### Execution Model
- As of the latest update, both `/run-metta` and `/run-python` execute requests synchronously (no background queue), which avoids timeouts under common WSGI setups.
- A background queue and status endpoint still exist for potential future use, but are not used by the current run endpoints.

### API Endpoints

#### `/run-metta` (POST)
Execute MeTTa code with session persistence. Runs synchronously.

**Request Body:**
```json
{
  "code": "(+ 2 3)",
  "language": "metta",
  "codeId": "unique_code_id"
}
```

**Response:**
```json
{
  "result": "5\n",
  "codeId": "unique_code_id",
  "historyLength": 1
}
```

#### `/run-python` (POST)
Execute Python code in an isolated environment.

**Request Body:**
```json
{
  "code": "print('Hello, World!')"
}
```

**Response:**
```json
{
  "result": "Hello, World!\n"
}
```

#### `/queue-status` (GET)
Get current queue status information (legacy/diagnostic; run endpoints do not currently enqueue requests).

**Response:**
```json
{
  "queue_size": 2,
  "is_processing": true,
  "pending_requests": 1
}
```

#### `/reset-atomspace` (POST)
Reset the MeTTa session and clear code history.

#### `/get-history` (GET)
Get the current code execution history.

#### `/reset-to-code` (POST)
Reset to a specific point in code history and replay.

#### `/remove-code` (POST)
Remove a specific code entry and replay remaining code.

## Notes on the Legacy Queue
The project still includes a background queue worker and a `/queue-status` endpoint for future scenarios where queued execution may be desirable. The primary run endpoints are synchronous, which simplifies behavior and avoids reverse-proxy timeouts.

## Development

### Running Locally
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Testing
```bash
python test_queue.py
```

### Deployment
The backend is deployed on Render. Relevant files: `render.yaml`, `Procfile`, and `runtime.txt` (Python 3.12.x).

Environment variables to set on Render:
- `FRONTEND_URL`: The exact URL of your frontend (e.g., `https://metta-learner-playground.vercel.app`). Used for CORS.
- Optional: `PYTHON_RUN_TIMEOUT` (default `30`).

Health check:
- `GET /health` returns basic status for platform probes.

## Dependencies
- Flask: Web framework
- Flask-CORS: Cross-origin resource sharing
- Hyperon: MeTTa execution engine
- Python standard library: threading, queue, subprocess, etc.

## Contact
For questions, open an issue or reach out on Telegram: https://t.me/Biruk_Gebru