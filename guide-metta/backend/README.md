# MeTTa Learner Backend

This is the backend server for the MeTTa Learner playground, providing code execution services for MeTTa and Python code.

## Features

### Code Execution
- **MeTTa Code Execution**: Run MeTTa code with persistent session state
- **Python Code Execution**: Run Python code in isolated subprocesses
- **Code History**: Maintains a history of executed code for session management

### Queuing System
The backend implements a robust queuing system to handle multiple concurrent requests:

- **Sequential Processing**: All code execution requests are processed in the order they are received
- **Background Worker**: Uses a dedicated background thread to process queued requests
- **Request Tracking**: Each request gets a unique ID for tracking and result retrieval
- **Timeout Protection**: Requests timeout after 30 seconds to prevent hanging
- **Error Handling**: Comprehensive error handling for both MeTTa and Python execution

### API Endpoints

#### `/run-metta` (POST)
Execute MeTTa code with session persistence.

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
Get current queue status information.

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

## Queuing System Details

### How It Works
1. **Request Reception**: When a request comes in, it's assigned a unique ID and added to a queue
2. **Background Processing**: A dedicated worker thread processes requests from the queue sequentially
3. **Result Storage**: Results are stored in a dictionary keyed by request ID
4. **Response**: The main thread polls for results and returns them when ready

### Benefits
- **Prevents Race Conditions**: Only one code execution happens at a time
- **Maintains Session Integrity**: MeTTa session state remains consistent
- **Handles High Load**: Multiple users can submit requests without conflicts
- **Fair Processing**: Requests are processed in first-come-first-served order

### Error Handling
- **Timeout Protection**: Requests timeout after 30 seconds
- **Exception Handling**: All exceptions are caught and returned as error responses
- **Resource Cleanup**: Failed requests don't block the queue

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
The backend is deployed on Railway and configured via `railway.toml` and `Procfile`.

## Dependencies
- Flask: Web framework
- Flask-CORS: Cross-origin resource sharing
- Hyperon: MeTTa execution engine
- Python standard library: threading, queue, subprocess, etc. 