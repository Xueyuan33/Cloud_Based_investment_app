import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SyncRequest from '../SyncRequest';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';


// Create future data from json entries
function createFutureData(name, entries) {
  var futureData = {
    name,
    entry: []
  };
  for (var idx in entries) {
    var e = entries[idx];
    const res = SyncRequest("http://129.114.27.23:1314/investments/futurevalue/" + e.symbol);
    var price = res.regularMarketPrice;
      futureData.entry.push(
        {
          name: e.name,
          symbol: e.symbol,
          amount: e.amount,
          description: e.description,
          purchaseTime: e.purchaseTime,
          api: e.api,
          date: e.date,
          _id: e._id,
          price: price,
          totalProductValue: e.amount * price
        }
      );    
  }
  return futureData;
}



function EditableTableCell(input) {
  let newVal = input.row[input.fieldName];
  var url = input.baseUrl + input.row._id;
  
  function handleUpdate() {
    // post change to api
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    var data = {
    };
    // Set values
    data["amount"] = input.row.amount;
    data["name"] = input.row.name;
    data["purchaseTime"] = input.row.purchaseTime;
    data["symbol"] = input.row.symbol;
    data["description"] = input.row.description;
    data["api"] = input.row.api;
    data[input.fieldName] = newVal;
    var json = JSON.stringify(data);
    xhr.send(json);
    // Reload the window
    //window.location.reload();
  }
  
  const handleTextFieldChange = e => {
    newVal = e.target.value;
  };

  return (
    <TableCell>
      <TextField
        onChange={handleTextFieldChange}
        defaultValue={input.row[input.fieldName]}
      />
      <Button
        variant="outlined"
        color="primary"
        onClick={() => handleUpdate()}>
        Save
      </Button>
    </TableCell>
    
      
  );
};


function Row(props) {
  
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const res = SyncRequest("http://129.114.27.23:1314/investments/futurevalue/");
  const totalFutureValue = res["total_value"];

  const handleDelete = (row) => {
    var url = "http://129.114.27.23:1314/investments/futures/" + row._id;
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url, true);
    xhr.send(null);
    window.location.reload();
    
  };


  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{Math.round(totalFutureValue * 100) / 100}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="products">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Symbol</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Unit Value ($)</TableCell>
                    <TableCell>Total Value ($)</TableCell>
                    <TableCell>Purchase Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.entry.map((entryRow) => (
                    <TableRow key={entryRow.name}>
                      <EditableTableCell
                        row={entryRow}
                        fieldName="name"
                        baseUrl="http://129.114.27.23:1314/investments/futures/"
                      />
                      <EditableTableCell
                        row={entryRow}
                        fieldName="symbol"
                        baseUrl="http://129.114.27.23:1314/investments/futures/"
                      />
                      <EditableTableCell
                        row={entryRow}
                        fieldName="amount"
                        baseUrl="http://129.114.27.23:1314/investments/futures/"
                      />
                      <TableCell>{entryRow.price}</TableCell>
                      <TableCell>{entryRow.totalProductValue}</TableCell>
                      <EditableTableCell
                        row={entryRow}
                        fieldName="purchaseTime"
                        baseUrl="http://129.114.27.23:1314/investments/futures/"
                      />
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDelete(entryRow)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string,
    entry: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        purchaseTime: PropTypes.string.isRequired,
		    api: PropTypes.string.isRequired,
		    date: PropTypes.string.isRequired,
        price: PropTypes.number
      }),
    ).isRequired,
  }).isRequired,
};



export default function FutureTable() {
  const [rows, setRows] = React.useState([]);
  
  const getFuture = async () => {
    const tmp = [];
    var url = "http://129.114.27.23:1314/investments/futures";
    var futureData;
    var r = await fetch(url)
      .then((response) => response.json())
      .then((response) => futureData = response);
    var lst = [];
    for (var entry in futureData) {
      var e = futureData[entry];
      lst.push(e);
    }
    tmp.push(createFutureData("future", lst));
    setRows(tmp);
  };
  
  React.useEffect(() => {
    getFuture()
  }, []);
  
  return (
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
  );
}