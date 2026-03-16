"""
from fastapi import FastAPI
from pydantic import BaseModel
import subprocess
import sys
import os

app = FastAPI()

class CodeRequest(BaseModel):
    code: str

@app.post("/execute")
async def execute_python(request: CodeRequest):
    try:
        # Run the code as a subprocess
        # -c flag allows running a string as a python script
        result = subprocess.run(
            [sys.executable, "-c", request.code],
            capture_output=True,
            text=True,
            timeout=5  # Kills the code if it takes > 5 seconds
        )

        return {
            "stdout": result.stdout,
            "stderr": result.stderr,
            "exit_code": result.returncode
        }

    except subprocess.TimeoutExpired:
        return {
            "stdout": "",
            "stderr": "Error: Execution timed out (5s limit exceeded).",
            "exit_code": 124
        }
    except Exception as e:
        return {
            "stdout": "",
            "stderr": f"Server Error: {str(e)}",
            "exit_code": 1
        }

if __name__ == "__main__":
    import uvicorn
    # Start the Python microservice on port 8000
    print("Python Executor running on http://localhost:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)
"""
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import subprocess
import sys

app = FastAPI()

# Define the structure of the incoming request
class CodeRequest(BaseModel):
    code: str

@app.post("/execute")
async def run_python_code(request: CodeRequest):
    try:
        # We run the code using the current python executable
        # '-c' tells python to execute the string following it
        process = subprocess.run(
            [sys.executable, "-c", request.code],
            capture_output=True,
            text=True,
            timeout=5  # Stops infinite loops after 5 seconds
        )

        # Send back the results
        return {
            "stdout": process.stdout,
            "stderr": process.stderr,
            "exit_code": process.returncode
        }

    except subprocess.TimeoutExpired:
        return {
            "stdout": "",
            "stderr": "Error: Code execution timed out (5s limit).",
            "exit_code": 124
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # Start the server on port 8000
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
