import random
import pymongo
from secrets import randbelow

def generate_secure_random_number(start, end):
    return start + randbelow(end - start + 1)

def generate_word_key():
    return ''.join(str(generate_secure_random_number(1, 6)) for _ in range(5))

def fetch_word_from_mongodb(key):
    # Replace with your MongoDB Atlas connection string
    client = pymongo.MongoClient("mongodb+srv://adotus:goodboy@cluster0.lcdexx1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&tls=true&tlsAllowInvalidCertificates=true")
    db = client["Basedb"]
    collection = db["word_list"]
    
    result = collection.find_one({"key": key})
    return result["value"] if result else None

def generate_random_sentence(n):
    words = []
    for _ in range(n):
        key = generate_word_key()
        word = fetch_word_from_mongodb(key)
        if word:
            words.append(word)
    
    return ' '.join(words)

# Example usage
n = 5  
sentence = generate_random_sentence(n)
print(sentence)

