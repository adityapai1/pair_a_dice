# from flask import Flask, jsonify
# from flask_cors import CORS
# import pymongo
# from secrets import randbelow
# import math
# import string

# app = Flask(__name__)
# CORS(app)

# def generate_secure_random_number(start, end):
#     return start + randbelow(end - start + 1)

# def generate_word_key():
#     return int(''.join(str(generate_secure_random_number(1, 6)) for _ in range(5)))

# def fetch_word_from_mongodb(key):
#     client = pymongo.MongoClient("mongodb+srv://adotus:goodboy@cluster0.lcdexx1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
#     db = client["Basedb"]
#     collection = db["word_list"]
    
#     try:
#         result = collection.find_one({"key": key})
#         return result["value"] if result else None
#     finally:
#         client.close()

# def generate_random_sentence(n):
#     words = []
#     for _ in range(n):
#         key = generate_word_key()
#         word = fetch_word_from_mongodb(key)
#         if word:
#             words.append(word)
#             print(words)
#         else:
#             print(f"No word found for key: {key}")  # Log missing words
    
#     return ' '.join(words) if words else "No words generated."

# def calculate_entropy(password):
#     length = len(password)
#     char_sets = {
#         'lowercase': 0,
#         'uppercase': 0,
#         'digits': 0,
#         'special': 0
#     }
#     special_chars = set(string.punctuation + ' ')
    
#     for char in password:
#         if char in string.ascii_lowercase:
#             char_sets['lowercase'] = 26
#         elif char in string.ascii_uppercase:
#             char_sets['uppercase'] = 26
#         elif char in string.digits:
#             char_sets['digits'] = 10
#         elif char in special_chars:
#             char_sets['special'] += 1
    
#     character_range = sum(char_sets.values())
#     entropy = math.log2(character_range ** length)
#     print(f'{entropy} is the entropy.')
#     return entropy

# @app.route('/generate-sentence/<int:n>', methods=['GET'])
# def get_random_sentence(n):
#     sentence = generate_random_sentence(n)
#     entropy = calculate_entropy(sentence)
#     return jsonify({
#         "sentence": sentence,
#         "entropy": round(entropy)
#     })

# if __name__ == '__main__':
#     app.run(debug=True)

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
    return entropy

def format_years(years):
    if years >= 1_000_000_000:
        return f"{years / 1_000_000_000:.2f} billion years"
    elif years >= 1_000_000:
        return f"{years / 1_000_000:.2f} million years"
    elif years >= 1_000:
        return f"{years / 1_000:.2f} thousand years"
    else:
        return f"{years:.2f} years"

def time_to_crack(entropy_bits, attempts_per_second=1_000_000_000):
    # Constants
    SECONDS_IN_A_YEAR = 31_536_000

    # Calculate time to crack in seconds
    combinations = 2 ** entropy_bits
    time_seconds = combinations / attempts_per_second

    # Convert seconds to years
    time_years = time_seconds / SECONDS_IN_A_YEAR

    return format_years(time_years)

@app.route('/generate-sentence/<int:n>', methods=['GET'])
def get_random_sentence(n):
    sentence = generate_random_sentence(n)
    entropy = calculate_entropy(sentence)
    crack_time = time_to_crack(entropy)
    
    return jsonify({
        "sentence": sentence,
        "entropy": round(entropy, 2),
        "time_to_crack": crack_time
    })

if __name__ == '__main__':
    app.run(debug=True)
