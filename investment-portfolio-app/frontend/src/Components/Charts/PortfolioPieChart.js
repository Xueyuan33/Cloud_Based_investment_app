import React from "react";
import { Chart } from "react-google-charts";
import SyncRequest from "../SyncRequest";



// Return total value of all stock products
function getTotalStockValue() {
    const res = SyncRequest("http://129.114.27.23:1314/investments/stockvalue/");
    const totalStockValue = res["total_value"];
    return totalStockValue;
}

// Return total value of all future products
function getTotalFutureValue() {
    const res = SyncRequest("http://129.114.27.23:1314/investments/futurevalue/");
    const totalFutureValue = res["total_value"];
    return totalFutureValue;
}

// Return total value of all CD products
function getTotalCDValue() {
    const res = SyncRequest("http://129.114.27.23:1314/investments/cdvalue/");
    const totalCDValue = res["total_value"];
    return totalCDValue;
}



const data = [
    ["Investment Portfolio", "$"],
    ["Stock", getTotalStockValue()],
    ["Future", getTotalFutureValue()],
    ["CD", getTotalCDValue()]
    
];

const options = {
    title: "Investment Portfolio",
    pieHole: 0.3,
    is3D: false
};

export default function PortfolioPieChart() {
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