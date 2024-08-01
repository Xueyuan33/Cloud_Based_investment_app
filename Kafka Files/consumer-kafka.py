import os   # need this for popen
import time # for sleep
from kafka import KafkaConsumer  # consumer of events
from pymongo import MongoClient



def get_database(db_name):
 
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
   CONNECTION_STRING = "mongodb://group07:cs4287-spring-2024@3.222.26.93:27017"
 
   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
   client = MongoClient(CONNECTION_STRING)
 
   # Create the database for our example (we will use the same database throughout the tutorial
   return client[db_name]


if __name__ == "__main__":
    # Get the database
    investment_subscription_db = get_database("investment_data_subscription")
    collection_name = investment_subscription_db["stocks"]
    all_items = collection_name.find()

    
    # acquire the consumer
    # (you will need to change this to your bootstrap server's IP addr)
    consumer = KafkaConsumer (bootstrap_servers="10.110.14.111:30000")

    # subscribe to topics
    consumer.subscribe (topics=all_items)

    # we keep reading and printing
    for msg in consumer:
        # Get latest subscriptions
        investment_subscription_db = get_database("investment_data_subscription")
        collection_name = investment_subscription_db["stocks"]
        current_all_items = collection_name.find()
        consumer.subscribe (topics=current_all_items)

        # Save message to mongodb database
        live_data_db = get_database("live_investment_data")
        live_data_col = live_data_db("stock_data")
        print (str(msg.value, 'ascii'))
        x = live_data_col.insert_one(msg)
    # we are done. As such, we are not going to get here as the above loop
    # is a forever loop.
    consumer.close ()
    
