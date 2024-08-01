import express from "express";
import subscription_db from "../../db/investment_subscription_conn.mjs";

const router = express.Router();


function calculateCDValue(cur_cd) {
  var cur_deposit_amount = cur_cd["depositAmount"];
  var cur_name = cur_cd["name"];
  var cur_rate = cur_cd["rate"];
  var cur_term_months = cur_cd["termMonths"];
  // Get how many days we've had this cd
  var cur_purchase_date = new Date(cur_cd["purchaseTime"]);
  var today_date = new Date();
  var diff_time = Math.abs(today_date - cur_purchase_date);
  var diff_days = Math.ceil(diff_time / (1000 * 60 * 60 * 24)); 
  // Cap max holding date to term length
  if (diff_days / 31 >= cur_term_months) {
    diff_days = cur_term_months * 31;
  }
  // Use formula to calculate CD value
  // current cd value = principal * ((1 + APY) ^ (1/365))^(today - purchase date)
  var cur_daily_rate = Math.pow((1 + Number(cur_rate)), 1/365);
   
  var cur_cd_value = cur_deposit_amount * Math.pow(cur_daily_rate, diff_days);
  return cur_cd_value;
}

// Get all cd values using symbol
router.get("/cdvalue", async (req, res) => {
  // Get all cds and their share amount
  var sum = 0;
  let collection = await subscription_db.collection("cds");
  let all_cds = await collection.find({})
    .toArray();

  var sum = 0.0;
  for (var idx in all_cds) {
    // Add to total cd value
    sum += calculateCDValue(all_cds[idx]);
  }
  
  res.send({
    "total_value": sum
  }).status(200);
});


// Get latest cd price using name
router.get("/cdvalue/:name/", async (req, res) => {
  let collection = await subscription_db.collection("cds");
  let query = {
    name: String(req.params.name)
  };
  
  let cur_cd = await collection.findOne(query);

  var result = {
    "current_value": calculateCDValue(cur_cd)
  };

  res.send(result).status(200);
});


export default router;
