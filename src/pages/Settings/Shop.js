import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, Typography } from '../../../node_modules/@mui/material/index';
import { getRequest } from 'services/apiService';
import { useNavigate } from 'react-router-dom';

export default function Shop() {

  // const [selectionModel, setSelectionModel] = React.useState([])
  const [data, setData] = React.useState({})

  const navigate = useNavigate()

  const fetchData = async () => {
    const response = await getRequest("shop/1");
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
            Shop Information
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Tooltip sx={{ float: 'right',margin:'12px' }} title="Edit">
            <IconButton>
              <EditIcon onClick={()=>{navigate('/settings/shop/update/')}}/>
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
      <TableBody>
          <TableRow>
            <TableCell><b>Name</b></TableCell>
            <TableCell align="right">{data.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Address</b></TableCell>
            <TableCell align="right">{data.address}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Phone</b></TableCell>
            <TableCell align="right">{data.phone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Open Time</b></TableCell>
            <TableCell align="right">{data.open_time}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Close Time</b></TableCell>
            <TableCell align="right">{data.close_time}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </>
  );
}