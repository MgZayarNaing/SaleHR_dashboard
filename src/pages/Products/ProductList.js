import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import { Paper, Box, Button ,Grid} from '@mui/material';
import {  delRequest, getRequest } from 'services/apiService';
import AlertDialog from 'components/AlertDialog';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import drink from '../../assets/images/drink.png'
import SearchComponents from 'components/SearchComponent';
import SkeletonComponent from 'components/SkeletonComponent';
import { useSelector } from 'react-redux';
import { selectRoles } from 'store/reducers/roleSlice';


export default function ProductList() {

  const [data, setData] = React.useState([])
  const [alertOpen, setAlertOpen] = React.useState(false)
  const [selectData, setSelectData] = React.useState(0)
  const [loading, setLoading] = React.useState(true)

  const navigate = useNavigate()
  let role = useSelector(selectRoles)

  const columns = [
    { field: 'id', headerName: 'ID', width: 60, editable: false },
    { field: 'image', headerName: 'Image', width: 100, editable: false, renderCell: (params) => (<img src={params.row.image ? params.row.image : drink} width="100%" alt="img" />)},
    { field: 'name', headerName: 'Name', width: 150, editable: false },
    ...(role.some(role => role === "SUPER_ADMIN") ? 
    [{ field: 'original_price', headerName: 'Original Price', width: 150, editable: false }] : []),
    { field: 'price', headerName: ' Price', width: 110, editable: false },
    { field: 'qty', headerName: ' Qty', width: 110, editable: false, renderCell: (params) => params.row.qty},
    { field: 'status', headerName: 'Status', width: 100, editable: false, type: 'singleSelect'},
    { field: 'created_at', headerName: 'Created Date', type: 'date', width: 160, editable: false, valueGetter: (params) => new Date(params.row.created_at)},
    { field: 'actions', type: 'actions', headerName: 'Actions', width: 100, cellClassName: 'actions',
      getActions: (params) => {
        const index = [1,2]
        return [
          ...(role.some(role => role === "SUPER_ADMIN") ? [
          <GridActionsCellItem
            key={index}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={()=>{navigate(`/products/product/update/${params.id}`)}}
            color="inherit"
          />,
          <GridActionsCellItem
            key={index}
            icon={<DeleteOutlined />}
            label="Delete"
            color="inherit"
            onClick={()=>{setSelectData(params.id),setAlertOpen(true)}}
          />,
        ] : []),
          <MapsUgcOutlinedIcon
            key={index}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={()=>{navigate(`/products/inventory/${params.id}`)}}
            color="inherit"
          />
        ];
      },
    },
  ];


  const fetchData = async () => {
    setLoading(true)
    const params = {columns: "category_id", search: 1}
    const response = await getRequest("product",params);
    if (response.data) {
        setData(response.data);
    }
    setLoading(false)
  }
  const fetchWithParams = async (data) => {
    setLoading(true)
    const paramsRequest = {id: "category_id", eq:1, columns: "name,price,qty,status", search: data }
    const response = await getRequest("product",paramsRequest);
    if (response.data) {
        setData(response.data);
    }
    setLoading(false)
  }
  const deleteData = async (id) => {
    setLoading(true)
    const response = await delRequest(`product/${id}`);
    if (response.data){
      fetchData()
    }
    setLoading(false)
  }

  const getRowClassName = (params) => {
      if (params.row.qty === 0) {
        return 'zeroQtyRow';
      } else if (params.row.qty > 0 && params.row.qty < 10) {
        return 'warnQtyRow';
      } else {
        return '';
      }
  };

  React.useEffect(()=>{
    fetchData()
    
  },[])

  return (
  <>
    <Grid container>
      <Grid item xs={6} >
        <Button onClick={()=>{navigate('/products/create');}}>
          <AddIcon/> product
        </Button>
      </Grid>
      <Grid item xs={6} sx={{ display:"flex",justifyContent:"flex-end" }}>
        <SearchComponents fetchFun={(data)=>{fetchWithParams(data)}}/>
      </Grid>
    </Grid>
    <Box
      component={Paper}
      sx={{
        height: 630,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .zeroQtyRow': {
          backgroundColor: 'red',
        },
        '& .warnQtyRow': {
          backgroundColor: 'orange',
        },
      }}
    >
      {loading ? (
        <SkeletonComponent />
      ):(
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 30, 50, 70]}
        getRowClassName={getRowClassName}
      />
      )}
    </Box>
    <AlertDialog 
      open={alertOpen} 
      onClose={()=>{setAlertOpen(false)}} 
      onAgree={()=>{deleteData(selectData),setAlertOpen(false)}} 
      title="Are you sure?"
      body="Are You Want to Delete this table ?"
    />
  </>
  );
}