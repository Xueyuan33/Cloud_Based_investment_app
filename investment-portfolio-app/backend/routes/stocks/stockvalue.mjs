import express from "express";
import subscription_db from "../../db/investment_subscription_conn.mjs";
import live_investment_data_db from "../../db/live_investment_data_conn.mjs";

const router = express.Router();


// Get all stock values using symbol
router.get("/stockvalue", async (req, res) => {
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
  
  res.send({
    "total_value": sum
  }).status(200);
});


// Get latest stock price using symbol
router.get("/stockvalue/:symbol/", async (req, res) => {
  let collection = await live_investment_data_db.collection("stock_data");
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
