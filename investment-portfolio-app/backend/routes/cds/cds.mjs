import express from "express";
import subscription_db from "../../db/investment_subscription_conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();


// Get all cds
router.get("/cds/", async (req, res) => {
  let collection = await subscription_db.collection("cds");
  let results = await collection.find({})
    .toArray();

  res.send(results).status(200);
});

// Add a new cd document to the collection
router.post("/cds/", async (req, res) => {
  // Check if record is already in the db and update if so
  let collection = await subscription_db.collection("cds");
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});


// Get cds using symbol
router.get("/cds/:name/", async (req, res) => {
  let collection = await subscription_db.collection("cds");
  let query = {name: String(req.params.name)};
  let result = await collection.findOne(query);
  console.log(result);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Delete a cd entry
router.delete("/cds/:_id", async (req, res) => {
  const query = { _id: ObjectId(req.params._id) };

  const collection = subscription_db.collection("cds");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

// Update a cd entry
router.put("/cds/:_id", async (req, res) => {
  const filter = {
    _id: ObjectId(req.params._id)
  };

  const params = {
    $set: {
      depositAmount: req.body.depositAmount,
      institution: req.body.institution,
      name: req.body.name,
      purchaseTime: req.body.purchaseTime,
      rate: req.body.rate,
      termMonths: req.body.termMonths
    },
  };
  const options = { upsert: false };
  const collection = subscription_db.collection("cds");
  let result = await collection.updateOne(filter, params, options);
  res.send(result).status(200);
});

export default router;
