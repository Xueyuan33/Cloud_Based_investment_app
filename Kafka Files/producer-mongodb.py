from pymongo import MongoClient
import requests
import time
import os   # need this for popen
import time # for sleep
from kafka import KafkaProducer  # producer of events
import json

def get_database(name):
 
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
   CONNECTION_STRING = "mongodb://group07:cs4287-spring-2024@3.222.26.93:27017"
 
   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
   client = MongoClient(CONNECTION_STRING)
 
   # Create the database for our example (we will use the same database throughout the tutorial
   return client[name]
  
# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":   
    
    # Get new data every 20 seconds
    while True:
        # Get the database
        read_db = get_database("investment_data_subscription")
        collection_name = read_db["stocks"]
        all_items = collection_name.find()
        write_db = get_database("live_investment_data")
        response_list = []

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
                time.sleep(2)
                response_list.append(response)                
                print (f"Sending data {response}")
        # Write new data to database
        x = write_db["stock_data"].insert_many(response_list)
                
                
        collection_name = read_db["futures"]
        all_items = collection_name.find()
        response_list = []

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
                response_list.append(response)
                time.sleep(2)
                print (f"Sending data {response}")
        # Write new data to database
        x = write_db["future_data"].insert_many(response_list)
                
        time.sleep(20)
    
