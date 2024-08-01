import express from "express";
import subscription_db from "../db/investment_subscription_conn.mjs";
import live_investment_data_db from "../db/live_investment_data_conn.mjs";

const router = express.Router();

// Get all stocks
router.get("/total/", async (req, res) => {
  // Get all stocks and their share amount
  var sum = 0;
  let collection = await subscription_db.collection("stocks");
  let all_stocks = await collection.find({})
    .toArray();

  var sum = 0;
  for (var idx in all_stocks) {
    var cur_amount = all_stocks[idx]["amount"];
    var cur_symbol = all_stocks[idx]["symbol"];
    
    let col = await live_investment_data_db.collection("stock_data");
    let query = {
      symbol: String(cur_symbol)
    };
    let options = {
      // Sort matched documents in descending order by rating
      sort: { "regularMarketTime": -1 },
    };
    let stock_info = await col.findOne(query, options);
    if (!stock_info) {
      continue;
    } else {
      sum += cur_amount * stock_info["regularMarketPrice"];

    }
    
  }
  // Get all futures and their share amount
  collection = await subscription_db.collection("futures");
  let all_futures = await collection.find({})
    .toArray();

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


export default router;

