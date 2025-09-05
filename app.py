from flask import Flask, request, jsonify
from flask_cors import CORS
from difflib import SequenceMatcher

app = Flask(__name__)
CORS(app)

correct_points = {
    "Īmān": "Īmān",
    "Namaz": "Namaz",
    "Ilm & Zikr": "Ilm & Zikr",
    "Ikram-e-Muslim": "Ikram-e-Muslim",
    "Ikhlas-e-Niyya": "Ikhlas-e-Niyya",
    "Dawat-i-Allah": "Dawat-i-Allah"
}

def similarity(a, b):
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()

@app.route('/check', methods=['POST'])
def check():
    data = request.get_json()
    user_text = data.get('text','')
    point = data.get('point','')
    correct_text = correct_points.get(point,'')
    score = similarity(user_text, correct_text)
    return jsonify({"score": score})

if __name__ == "__main__":
    app.run(port=5000)
