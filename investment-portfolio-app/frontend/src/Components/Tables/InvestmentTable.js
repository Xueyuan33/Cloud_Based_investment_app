import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SyncRequest from '../SyncRequest';
import StockTable from './StockTable';
import FutureTable from './FutureTable';
import CDTable from './CDTable';




export default function InvestmentTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Investment Type</TableCell>
            <TableCell>Total Investment Value ($)</TableCell>
          </TableRow>
        </TableHead>
        {/* Insert the stock table */}
        <StockTable />
        {/* Insert the future table */}
        <FutureTable />
        {/* Insert the cd table */}
        <CDTable />
        
      </Table>
    </TableContainer>
  );
}