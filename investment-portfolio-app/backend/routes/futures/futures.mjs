import express from "express";
import subscription_db from "../../db/investment_subscription_conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all futures
router.get("/futures/", async (req, res) => {
  let collection = await subscription_db.collection("futures");
  let results = await collection.find({})
    .toArray();

  res.send(results).status(200);
});

// Add a new future document to the collection
router.post("/futures/", async (req, res) => {
  let collection = await subscription_db.collection("futures");
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});


// Get futures using symbol
router.get("/futures/:symbol/", async (req, res) => {
  let collection = await subscription_db.collection("futures");
  let query = {symbol: String(req.params.symbol)};
  let result = await collection.findOne(query);
  console.log(result);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Delete a future entry
router.delete("/futures/:_id", async (req, res) => {
  const query = { _id: ObjectId(req.params._id) };

  const collection = subscription_db.collection("futures");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

// Update a future entry
router.put("/futures/:_id", async (req, res) => {
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
  const collection = subscription_db.collection("futures");
  let result = await collection.updateOne(filter, params, options);
  res.send(result).status(200);
});

export default router;
