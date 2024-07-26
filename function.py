import pymongo

def import_to_mongodb(file_path, db_name, collection_name):
    # Connect to MongoDB
    client = pymongo.MongoClient("mongodb+srv://adotus:goodboy@cluster0.lcdexx1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    db = client[db_name]
    collection = db[collection_name]

    # Read text file
    with open(file_path, 'r') as file:
        lines = file.readlines()

    # Skip the header line if necessary
    data = []
    for line in lines:
        parts = line.strip().split('\t')
        try:
            key = int(parts[0])
            value = parts[1]
            data.append({"key": key, "value": value})
        except ValueError:
            continue  # Skip lines where the key cannot be converted to an integer

    # Insert data into MongoDB
    collection.insert_many(data)

# Example usage
file_path = "/Users/adit/Downloads/wordlist.txt"
db_name = "Basedb"
collection_name = "word_list"
import_to_mongodb(file_path, db_name, collection_name)
