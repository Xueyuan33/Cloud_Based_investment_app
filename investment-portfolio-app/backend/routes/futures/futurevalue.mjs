import express from "express";
import subscription_db from "../../db/investment_subscription_conn.mjs";
import live_investment_data_db from "../../db/live_investment_data_conn.mjs";

const router = express.Router();


// Get all future values using symbol
router.get("/futurevalue", async (req, res) => {
  // Get all futures and their share amount
  var sum = 0;
  let collection = await subscription_db.collection("futures");
  let all_futures = await collection.find({})
    .toArray();

  var sum = 0;
  for (var idx in all_futures) {
    var cur_amount = all_futures[idx]["amount"];
    var cur_symbol = all_futures[idx]["symbol"];
    
    let col = await live_investment_data_db.collection("future_data");
    let query = {
      symbol: String(cur_symbol)
    };
    let options = {
      // Sort matched documents in descending order by rating
      sort: { "regularMarketTime": -1 },
    };
    let future_info = await col.findOne(query, options);
    if (!future_info) {
      continue;
    } else {
      sum += cur_amount * future_info["regularMarketPrice"];

    }
    
  }
  
  res.send({
    "total_value": sum
  }).status(200);
});


// Get latest future price using symbol
router.get("/futurevalue/:symbol/", async (req, res) => {
  let collection = await live_investment_data_db.collection("future_data");
  let query = {
    symbol: String(req.params.symbol)
  };
  let options = {
    // Sort matched documents in descending order by rating
    sort: { "regularMarketTime": -1 },
  };
  let result = await collection.findOne(query, options);

  if (!result) res.send({}).status(404);
  else res.send(result).status(200);
});


export default router;
