# from flask import Flask, jsonify
# from flask_cors import CORS
# import pymongo
# from secrets import randbelow

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

# @app.route('/generate-sentence/<int:n>', methods=['GET'])
# def get_random_sentence(n):
#     sentence = generate_random_sentence(n)
#     return jsonify({"sentence": sentence})

# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, jsonify
from flask_cors import CORS
import pymongo
from secrets import randbelow

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

@app.route('/generate-sentence/<int:n>', methods=['GET'])
def get_random_sentence(n):
    sentence = generate_random_sentence(n)
    return jsonify({"sentence": sentence})

if __name__ == '__main__':
    app.run(debug=True)