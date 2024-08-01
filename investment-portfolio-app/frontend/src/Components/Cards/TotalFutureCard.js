import * as React from 'react';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { getTotalFutureValue } from './TotalPortfolioCard';


export default function TotalFutureCard() {
    return (
      <CardContent>
        <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
          Total Future Worth
        </Typography>
        <Typography variant="h5" sx={{ fontSize: 40 }} component="div">
        $ {Math.round(getTotalFutureValue() * 100) / 100}
        </Typography>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
        As of {new Date().toJSON().substring(0, 19)}
        </Typography>
      </CardContent>
    );
}