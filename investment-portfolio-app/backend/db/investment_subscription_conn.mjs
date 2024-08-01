import { MongoClient } from "mongodb";

const connectionString = process.env.MONGODB_URL || "";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}


let subscription_db = conn.db("investment_data_subscription");
console.log("Connected to database investment_data_subscription.");
export default subscription_db;
