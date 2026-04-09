import requests

URL = "http://localhost:5000/api/data"

data = {
    "s1": 0,
    "s2": 1,
    "s3": 0,
    "s4": 1
}

print("Sending:", data)
response = requests.post(URL, json=data)

print("Response:", response.json())