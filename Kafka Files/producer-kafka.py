from pymongo import MongoClient 
import requests
import time
import os   # need this for popen
import time # for sleep
from kafka import KafkaProducer  # producer of events
import json

def get_database():
 
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
   CONNECTION_STRING = "mongodb://group07:cs4287-spring-2024@3.222.26.93:27017"
 
   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
   client = MongoClient(CONNECTION_STRING)
 
   # Create the database for our example (we will use the same database throughout the tutorial
   return client["investment_data_subscription"]
  
# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":   
    # The broker ip
    broker_ip = "3.222.26.93"
    # Connect to the kafka producer
    producer = KafkaProducer (bootstrap_servers=broker_ip, acks=1)  # wait for leader to write to log
    
    # Get new data every 20 seconds
    while True:
        # Get the database
        db = get_database()
        collection_name = db["stocks"]
        all_items = collection_name.find()

        # Stream stock data for all stock products in db
        for item in all_items:
            if "symbol" in item.keys():
                #api = item.get("api", None)
                # Use yahoo finance api for now
                api = "https://query1.finance.yahoo.com/v8/finance/chart/{sym}?interval=1m&includePrePost=true&events=div%7Csplit%7Cearn&&lang=en-US&region=US" \
                    .format(sym = item["symbol"])
                header = {
                    "User-Agent": "insomnia/8.6.1"
                }
                r = requests.get(api, headers=header)
                response = r.json()["chart"]["result"][0]["meta"]
                print(response)
                time.sleep(2)
                print (f"Sending data {response}")
                producer.send (item["symbol"], value=bytes (json.dumps(response), 'ascii'))
                producer.flush ()   # try to empty the sending buffer
        
        time.sleep(20)
    
    producer.close()
