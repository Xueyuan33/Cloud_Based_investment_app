import { MongoClient } from "mongodb";

const connectionString = process.env.MONGODB_URL || "";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}


let live_investment_data_db = conn.db("live_investment_data");
console.log("Connected to database live_investment_data.");
export default live_investment_data_db;