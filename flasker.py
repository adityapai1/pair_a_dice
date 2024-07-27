from flask import Flask, jsonify
from flask_cors import CORS
import pymongo
from secrets import randbelow
import math
import string

app = Flask(__name__)
CORS(app)

def generate_secure_random_number(start, end):
    return start + randbelow(end - start + 1)

def generate_word_key():
    return int(''.join(str(generate_secure_random_number(1, 6)) for _ in range(5)))

def fetch_word_from_mongodb(key):
    client = pymongo.MongoClient("mongodb+srv://adotus:goodboy@cluster0.lcdexx1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    db = client["Basedb"]
    collection = db["word_list"]
    
    try:
        result = collection.find_one({"key": key})
        return result["value"] if result else None
    finally:
        client.close()

def generate_random_sentence(n):
    words = []
    for _ in range(n):
        key = generate_word_key()
        word = fetch_word_from_mongodb(key)
        if word:
            words.append(word)
            print(words)
        else:
            print(f"No word found for key: {key}")  # Log missing words
    
    return ' '.join(words) if words else "No words generated."

def calculate_entropy(password):
    length = len(password)
    char_sets = {
        'lowercase': 0,
        'uppercase': 0,
        'digits': 0,
        'special': 0
    }
    special_chars = set(string.punctuation + ' ')
    
    for char in password:
        if char in string.ascii_lowercase:
            char_sets['lowercase'] = 26
        elif char in string.ascii_uppercase:
            char_sets['uppercase'] = 26
        elif char in string.digits:
            char_sets['digits'] = 10
        elif char in special_chars:
            char_sets['special'] += 1
    
    character_range = sum(char_sets.values())
    entropy = math.log2(character_range ** length)
    print(f'{entropy} is the entropy.')
    return entropy

@app.route('/generate-sentence/<int:n>', methods=['GET'])
def get_random_sentence(n):
    sentence = generate_random_sentence(n)
    entropy = calculate_entropy(sentence)
    return jsonify({
        "sentence": sentence,
        "entropy": round(entropy, 2)
    })

if __name__ == '__main__':
    app.run(debug=True)