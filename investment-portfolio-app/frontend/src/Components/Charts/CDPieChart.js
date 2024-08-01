import React from "react";
import { Chart } from "react-google-charts";
import SyncRequest from "../SyncRequest";


const data = [
    ["CD Portfolio", "$"] 
];

// Get all cds
const getCD = async () => {
    const tmp = [];
    var url = "http://129.114.27.23:1314/investments/cds";
    var cdData;
    var r = await fetch(url)
      .then((response) => response.json())
      .then((response) => cdData = response);
    // Go through each stock and get its price
    for (var entry in cdData) {
        var e = cdData[entry];
        var current_price = 0;
        try {
            const res = SyncRequest("http://129.114.27.23:1314/investments/cdvalue/" + e["name"]);
            current_price = res["current_value"];

        } catch {
            current_price = 0;
        }
        
        // Add entry for current cd
        data.push([e["name"], current_price]);
    }    
  };

getCD();

const options = {
    title: "CD Portfolio",
    pieHole: 0.3,
    is3D: false
};

export default function CDPieChart() {
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