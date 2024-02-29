import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, Typography } from '../../../node_modules/@mui/material/index';
import { getRequest } from 'services/apiService';
import { useNavigate } from 'react-router-dom';

export default function Printer() {

  const [data, setData] = React.useState({})

  const navigate = useNavigate()

  const fetchData = async () => {
    const response = await getRequest("printer");
    if (response.data) {
        setData(response.data);
    }
  }

  React.useEffect(()=>{
    fetchData()
  },[])

  return (
  <>
    <TableContainer component={Paper}>
      <Grid container>
        <Grid item xs={6}>
          <Typography sx={{margin:'12px' }} variant="h4" gutterBottom>
            Printer Information
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Tooltip sx={{ float: 'right',margin:'12px' }} title="Edit">
            <IconButton>
              <EditIcon onClick={()=>{navigate('/settings/printer/update/')}}/>
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
      <TableBody>
          <TableRow>
            <TableCell><b>Invoice Ip</b></TableCell>
            <TableCell align="right">{data.invoice_ip}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Kichen Ip</b></TableCell>
            <TableCell align="right">{data.kitchen_ip}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Bar Ip</b></TableCell>
            <TableCell align="right">{data.bar_ip}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </>
  );
}