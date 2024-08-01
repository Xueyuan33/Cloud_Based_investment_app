import express from "express";
import subscription_db from "../../db/investment_subscription_conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all stocks
router.get("/stocks/", async (req, res) => {
  let collection = await subscription_db.collection("stocks");
  let results = await collection.find({})
    .toArray();

  res.send(results).status(200);
});

// Add a new stock document to the collection
router.post("/stocks/", async (req, res) => {
  let collection = await subscription_db.collection("stocks");
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});


// Get stocks using symbol
router.get("/stocks/:symbol/", async (req, res) => {
  let collection = await subscription_db.collection("stocks");
  let query = {symbol: String(req.params.symbol)};
  let result = await collection.findOne(query);
  console.log(result);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Delete a stock entry
router.delete("/stocks/:_id", async (req, res) => {
  const query = { _id: ObjectId(req.params._id) };

  const collection = subscription_db.collection("stocks");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});


// Update a stock entry
router.put("/stocks/:_id", async (req, res) => {
  const filter = {
    _id: ObjectId(req.params._id)
  };

  const params = {
    $set: {
      name: req.body.name,
      symbol: req.body.symbol,
      amount: req.body.amount,
      description: req.body.description,
      purchaseTime: req.body.purchaseTime,
      api: req.body.api
    },
  };
  const options = { upsert: false };
  const collection = subscription_db.collection("stocks");
  let result = await collection.updateOne(filter, params, options);
  res.send(result).status(200);
});


/*

// Get the live price of stock from subscription_db
// Get a single stock using id
router.get("/stocks/values/symbol/:symbol", async (req, res) => {
  const symbol = req.params("symbol");
  console.log(symbol);
  let collection = await live_investment_data_db.collection("stock_data");
  let query = {symbol: ObjectId(req.params.symbol)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});
*/
export default router;
