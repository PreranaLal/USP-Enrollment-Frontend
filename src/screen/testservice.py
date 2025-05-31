# test_service_update.py

import requests

student_id = 4
service_id = "v_grade"
url = f"http://localhost:4149/api/services/{student_id}/{service_id}"

payload = {
    "service_available": "Y"  # or "N"
}

response = requests.put(url, json=payload)

print("Status code:", response.status_code)
print("Response:", response.json())