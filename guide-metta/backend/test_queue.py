#!/usr/bin/env python3
"""
Test script for the queuing system
"""
import requests
import time
import threading
import json

BASE_URL = "http://localhost:5000"

def test_single_request():
    """Test a single request"""
    print("Testing single request...")
    
    code = "(+ 2 3)"
    response = requests.post(f"{BASE_URL}/run-metta", json={
        "code": code,
        "language": "metta",
        "codeId": "test_1"
    })
    
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()

def test_multiple_requests():
    """Test multiple concurrent requests"""
    print("Testing multiple concurrent requests...")
    
    def make_request(request_id):
        code = f"(+ {request_id} {request_id})"
        response = requests.post(f"{BASE_URL}/run-metta", json={
            "code": code,
            "language": "metta",
            "codeId": f"test_{request_id}"
        })
        print(f"Request {request_id}: Status {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"Request {request_id}: Result {result.get('result', 'No result')}")
        else:
            print(f"Request {request_id}: Error {response.text}")
        print()
    
    # Start multiple threads
    threads = []
    for i in range(5):
        thread = threading.Thread(target=make_request, args=(i+1,))
        threads.append(thread)
        thread.start()
    
    # Wait for all threads to complete
    for thread in threads:
        thread.join()
    
    print("All requests completed!")

def test_queue_status():
    """Test queue status endpoint"""
    print("Testing queue status...")
    
    response = requests.get(f"{BASE_URL}/queue-status")
    print(f"Status: {response.status_code}")
    print(f"Queue status: {response.json()}")
    print()

def test_python_queue():
    """Test Python code queuing"""
    print("Testing Python code queuing...")
    
    def make_python_request(request_id):
        code = f"print('Python request {request_id}')"
        response = requests.post(f"{BASE_URL}/run-python", json={
            "code": code
        })
        print(f"Python Request {request_id}: Status {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"Python Request {request_id}: Result {result.get('result', 'No result')}")
        else:
            print(f"Python Request {request_id}: Error {response.text}")
        print()
    
    # Start multiple threads
    threads = []
    for i in range(3):
        thread = threading.Thread(target=make_python_request, args=(i+1,))
        threads.append(thread)
        thread.start()
    
    # Wait for all threads to complete
    for thread in threads:
        thread.join()
    
    print("All Python requests completed!")

if __name__ == "__main__":
    print("Starting queue system tests...")
    print("=" * 50)
    
    # Test queue status
    test_queue_status()
    
    # Test single request
    test_single_request()
    
    # Test multiple concurrent requests
    test_multiple_requests()
    
    # Test Python queuing
    test_python_queue()
    
    # Final queue status
    test_queue_status()
    
    print("=" * 50)
    print("All tests completed!") 