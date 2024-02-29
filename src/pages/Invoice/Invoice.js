import * as React from 'react';
import { 
  Paper, Box, Collapse, IconButton, Table, 
  TableBody, TableCell,  TableHead,
  TableRow, Tooltip, Grid
} from '../../../node_modules/@mui/material/index';
import { getRequest } from 'services/apiService';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
import SkeletonComponent from 'components/SkeletonComponent';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import SearchComponents from 'components/SearchComponent';


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate()

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
        <TableCell component="th" scope="row">{row.id}</TableCell>
        <Tooltip title={row.invoice_number}>
          <TableCell align="left">
            {row.invoice_number.length > 12 ? (`${row.invoice_number.slice(0,12)}...`):(row.invoice_number)}
          </TableCell>
        </Tooltip>
        <TableCell align="left">{row.orders.table_number.name}</TableCell>
        <Tooltip title={row.customer.name}>
          <TableCell align="left">
            {row.customer.name.length > 9 ? (`${row.customer.name.slice(0,9)}...`):(row.customer.name)}
          </TableCell>
        </Tooltip>
        <TableCell align="left">{row.orders.guest}</TableCell>
        <TableCell align="left">{row.subtotal}</TableCell>
        <TableCell align="left">{row.tax}</TableCell>
        <TableCell align="left">{row.discount}</TableCell>
        <TableCell align="left">{row.total}</TableCell>
        <TableCell align="left">{row.charge}</TableCell>
        <TableCell align="left">{row.refund}</TableCell>
        <TableCell align="left">
          {new Intl.DateTimeFormat('en-US', {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true}).format(new Date(row.created_at))}
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => navigate(`/invoices/detail/${row.id}`)}
          >
            <FeedOutlinedIcon />
          </IconButton>
        </TableCell>
        {/* <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => navigate(`/invoices/detail/${row.id}`)}
          >
            <DeleteOutlinedIcon />
          </IconButton>
        </TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={14}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                  <TableCell>ID</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell align="left">Amount</TableCell>
                    <TableCell align="left">Total price</TableCell>
                    <TableCell align="left">Waiter</TableCell>
                    <TableCell align="left">Profit</TableCell>
                    <TableCell align="left">Created At</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.orders.order_items.map((historyRow, index) => (
                    <TableRow key={historyRow.created_at}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{historyRow.product.name}</TableCell>
                      <TableCell>{historyRow.qty}</TableCell>
                      <TableCell align="left">{historyRow.product.price}</TableCell>
                      <TableCell align="left">{historyRow.total_price}</TableCell>
                      <TableCell align="left">{historyRow.user.name}</TableCell>
                      <TableCell align="left">{historyRow.profit}</TableCell>
                      <TableCell align="left">
                      {new Intl.DateTimeFormat('en-US', {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true}).format(new Date(historyRow.created_at))}
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

export default function Invoice() {

  const [data, setData] = React.useState([])
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(true)

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    console.log(parseInt(event.target.value, 10))
  };

  const fetchData = async () => {
    setLoading(true)
    let params = {per_page:rowsPerPage, page:page}
    console.log(params)
    const response = await getRequest("invoice", params);
    if (response.data) {
        setData(response.data.data);
        setTotal(response.data.total)
    }
    setLoading(false)
  }
  const fetchWithParams = async (data) => {
    setLoading(true)
    const paramsRequest = {columns: "id,invoice_number,subtotal,total,charge,refund", search: data }
    const response = await getRequest("invoice",paramsRequest);
    if (response.data) {
        setData(response.data);
    }
    setLoading(false)
  }

  React.useEffect(()=>{
    fetchData()
  },[page,rowsPerPage])

  return (
    <>
    <Box
      component={Paper}
      sx={{
        height: '90%',
        width: '1100px',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      {loading ? (
        <SkeletonComponent />
      ):(
      <>
      <Grid container>
        <Grid item xs={6} >
          
        </Grid>
        <Grid item xs={6} sx={{ display:"flex",justifyContent:"flex-end" }}>
          <SearchComponents fetchFun={(data)=>{fetchWithParams(data)}}/>
        </Grid>
      </Grid>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Id</TableCell>
            <TableCell align="left">Invoice No</TableCell>
            <TableCell align="left">Table</TableCell>
            <TableCell align="left">Customer</TableCell>
            <TableCell align="left">Guest</TableCell>
            <TableCell align="left">Sub Total</TableCell>
            <TableCell align="left">Tax</TableCell>
            <TableCell align="left">Discount</TableCell>
            <TableCell align="left">Total</TableCell>
            <TableCell align="left">Charge</TableCell>
            <TableCell align="left">Refund</TableCell>
            <TableCell align="left">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={total}
        page={page - 1}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </>
      )}
  </Box>
  </>
  );
}
