import React from "react";
import { Chart } from "react-google-charts";
import SyncRequest from "../SyncRequest";


const data = [
    ["Stock Portfolio", "$"] 
];

// Get all stocks
const getStock = async () => {
    // Get all stocks
    const tmp = [];
    var url = "http://129.114.27.23:1314/investments/stocks";
    var stockData;
    var r = await fetch(url)
      .then((response) => response.json())
      .then((response) => stockData = response);
    // Go through each stock and get its price
    for (var entry in stockData) {
        var e = stockData[entry];
        var current_price = 0;
        try {
            const res = SyncRequest("http://129.114.27.23:1314/investments/stockvalue/" + e["symbol"]);
            current_price = res["regularMarketPrice"];

        } catch {
            current_price = 0;
        }
        
        // Add entry for current stock
        data.push([e["symbol"], e["amount"] * current_price]);
    }    
  };

getStock();

const options = {
    title: "Stock Portfolio",
    pieHole: 0.3,
    is3D: false
};

export default function StockPieChart() {
    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"350px"}
            />
    );
};