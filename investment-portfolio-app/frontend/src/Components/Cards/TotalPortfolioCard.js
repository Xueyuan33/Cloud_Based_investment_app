import * as React from 'react';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import SyncRequest from '../SyncRequest';

// Return total value of all future products
export function getTotalFutureValue() {
    try {
        const res = SyncRequest("http://129.114.27.23:1314/investments/futurevalue/");
        const totalFutureValue = res["total_value"];
        return totalFutureValue;
    } catch {
        // Return 0 upon exceptions
        return 0;
    }
}
// Return total value of all stock products
export function getTotalStockValue() {
    try {
        const res = SyncRequest("http://129.114.27.23:1314/investments/stockvalue/");
        const totalStockValue = res["total_value"];
        return totalStockValue;

    } catch {
        // Return 0 upon exceptions
        return 0;
    }
}

// Return total value of all cd products
export function getTotalCDValue() {
    try {
        const res = SyncRequest("http://129.114.27.23:1314/investments/cdvalue/");
        const totalCDValue = res["total_value"];
        return totalCDValue;

    } catch {
        // Return 0 upon exceptions
        return 0;
    }
}

// Return total value of all investment products
function getTotalInvestmentValue() {
    return getTotalStockValue() + getTotalFutureValue() + getTotalCDValue();
}

export default function TotalInvestmentCard() {
    return (
      <CardContent>
        <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
          Total Investment Worth
        </Typography>
        <Typography variant="h5" sx={{ fontSize: 40 }} component="div">
        $ {Math.round(getTotalInvestmentValue() * 100) / 100}
        </Typography>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          As of {new Date().toJSON().substring(0, 19)}
        </Typography>
      </CardContent>
    );
};