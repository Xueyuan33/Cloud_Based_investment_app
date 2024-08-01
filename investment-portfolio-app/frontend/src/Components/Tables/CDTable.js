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

// Create CD data from json entries
function createCDData(name, entries) {
  var cdData = {
    name,
    entry: []
  };
  for (var idx in entries) {
    var e = entries[idx];
    console.log(e);
    const res = SyncRequest("http://129.114.27.23:1314/investments/cdvalue/" + e.name);
    var price = res.current_value;
      cdData.entry.push(
        {
          name: e.name,
          depositAmount: e.depositAmount,
          institution: e.institution,
          purchaseTime: e.purchaseTime,
          rate: e.rate,
          termMonths: e.termMonths,
          date: e.date,
          _id: e._id,
          price: Math.round(price * 100) / 100
        }
      );    
  }
  return cdData;
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
    data["depositAmount"] = input.row.depositAmount;
    data["institution"] = input.row.institution;
    data["name"] = input.row.name;
    data["purchaseTime"] = input.row.purchaseTime;
    data["rate"] = input.row.rate;
    data["termMonths"] = input.row.termMonths;
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

  const res = SyncRequest("http://129.114.27.23:1314/investments/cdvalue/");
  const totalCDValue = res["total_value"];

  const handleDelete = (row) => {
    var url = "http://129.114.27.23:1314/investments/cds/" + row._id;
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
        <TableCell>{Math.round(totalCDValue * 100) / 100}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="products">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Institution</TableCell>
                    <TableCell>Deposit Amount ($)</TableCell>
                    <TableCell>Term Months</TableCell>
                    <TableCell>Rate</TableCell>
                    <TableCell>Current Value ($)</TableCell>
                    <TableCell>Purchase Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.entry.map((entryRow) => (
                    <TableRow key={entryRow.name}>
                      <EditableTableCell
                        row={entryRow}
                        fieldName="name"
                        baseUrl="http://129.114.27.23:1314/investments/cds/"
                      />
                      <EditableTableCell
                        row={entryRow}
                        fieldName="institution"
                        baseUrl="http://129.114.27.23:1314/investments/cds/"
                      />
                      <EditableTableCell
                        row={entryRow}
                        fieldName="depositAmount"
                        baseUrl="http://129.114.27.23:1314/investments/cds/"
                      />
                      <EditableTableCell
                        row={entryRow}
                        fieldName="termMonths"
                        baseUrl="http://129.114.27.23:1314/investments/cds/"
                      />
                      <EditableTableCell
                        row={entryRow}
                        fieldName="rate"
                        baseUrl="http://129.114.27.23:1314/investments/cds/"
                      />
                      <TableCell>{entryRow.price}</TableCell>
                      <EditableTableCell
                        row={entryRow}
                        fieldName="purchaseTime"
                        baseUrl="http://129.114.27.23:1314/investments/cds/"
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
        depositAmount: PropTypes.number.isRequired,
        institution: PropTypes.string,
        rate: PropTypes.number.isRequired,
        termMonths: PropTypes.number.isRequired,
        purchaseTime: PropTypes.string.isRequired,
		    date: PropTypes.string.isRequired,
        price: PropTypes.number
      }),
    ).isRequired,
  }).isRequired,
};



export default function CDTable() {
  const [rows, setRows] = React.useState([]);
  
  const getCD = async () => {
    const tmp = [];
    var url = "http://129.114.27.23:1314/investments/cds";
    var cdData;
    var r = await fetch(url)
      .then((response) => response.json())
      .then((response) => cdData = response);
    var lst = [];
    for (var entry in cdData) {
      var e = cdData[entry];
      lst.push(e);
    }
    tmp.push(createCDData("cd", lst));
    setRows(tmp);
  };
  
  React.useEffect(() => {
    getCD()
  }, []);
  
  return (
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
  );
}