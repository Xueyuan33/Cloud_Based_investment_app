import React from "react";
import { Chart } from "react-google-charts";
import SyncRequest from "../SyncRequest";


const data = [
    ["Future Portfolio", "$"] 
];

// Get all futures
const getFuture = async () => {
    const tmp = [];
    var url = "http://129.114.27.23:1314/investments/futures";
    var futureData;
    var r = await fetch(url)
      .then((response) => response.json())
      .then((response) => futureData = response);
    // Go through each stock and get its price
    for (var entry in futureData) {
        var e = futureData[entry];
        var current_price = 0;
        try {
            const res = SyncRequest("http://129.114.27.23:1314/investments/futurevalue/" + e["symbol"]);
            current_price = res["regularMarketPrice"];

        } catch {
            current_price = 0;
        }
        
        // Add entry for current stock
        data.push([e["symbol"], e["amount"] * current_price]);
    }    
  };

getFuture();

const options = {
    title: "Future Portfolio",
    pieHole: 0.3,
    is3D: false
};

export default function FuturePieChart() {
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