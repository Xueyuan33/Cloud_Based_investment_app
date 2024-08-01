import * as React from 'react';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { getTotalCDValue } from './TotalPortfolioCard';


export default function TotalCDCard() {
    return (
      <CardContent>
        <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
          Total CD Worth
        </Typography>
        <Typography variant="h5" sx={{ fontSize: 40 }} component="div">
        $ {Math.round(getTotalCDValue() * 100) / 100}
        </Typography>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
        As of {new Date().toJSON().substring(0, 19)}
        </Typography>
      </CardContent>
    );
}