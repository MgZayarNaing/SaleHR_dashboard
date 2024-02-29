import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import { Paper, Box, Button, Grid } from '@mui/material';
import {  delRequest, getRequest } from 'services/apiService';
import AlertDialog from 'components/AlertDialog';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import SearchComponents from 'components/SearchComponent';
import SkeletonComponent from 'components/SkeletonComponent';

export default function Customers() {

  const [data, setData] = React.useState([])
  const [alertOpen, setAlertOpen] = React.useState(false)
  const [selectData, setSelectData] = React.useState(0)
  const [loading, setLoading] = React.useState(true)

  const navigate = useNavigate()

  const columns = [
    { field: 'id', headerName: 'ID', width: 60, editable: false },
    { field: 'name', headerName: 'Name', width: 150, editable: false },
    { field: 'address', headerName: 'Address', width: 280, align: 'left', headerAlign: 'left', editable: false },
    { field: 'phone', headerName: 'Phone', width: 180, align: 'left', headerAlign: 'left', editable: false },
    { field: 'created_at', headerName: 'Created Date', type: 'date', width: 160, editable: false, valueGetter: (params) => new Date(params.row.created_at)},
    { field: 'actions', type: 'actions', headerName: 'Actions', width: 100, cellClassName: 'actions',
      getActions: (params) => {
        const index = [1,2]
        return [
          <GridActionsCellItem
            key={index}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={()=>{navigate(`/customers/update/${params.id}`)}}
            color="inherit"
          />,
          <GridActionsCellItem
            key={index}
            icon={<DeleteOutlined />}
            label="Delete"
            color="inherit"
            onClick={()=>{setSelectData(params.id),setAlertOpen(true)}}
          />,
        ];
      },
    },
  ];

  const fetchData = async () => {
    setLoading(true)
    const response = await getRequest("customer");
    if (response.data) {
        setData(response.data);
    }
    setLoading(false)
  }
  const fetchWithParams = async (data) => {
    setLoading(true)
    const paramsRequest = { columns: "name,phone,address", search: data }
    const response = await getRequest("customer",paramsRequest);
    if (response.data) {
        setData(response.data);
    }
    setLoading(false)
  }
  const deleteData = async (id) => {
    setLoading(true)
    const response = await delRequest(`customer/${id}`);
    if (response.data){
      fetchData()
    }
    setLoading(false)
  }

  React.useEffect(()=>{
    fetchData()
  },[])

  return (
  <>
    <Grid container>
      <Grid item xs={6} >
        <Button onClick={()=>{navigate('/customers/create');}}>
          <AddIcon/> Table
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
        '& .textPrimary': {
          color: 'text.primary',
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
      />
      )}
    </Box>
    <AlertDialog 
      open={alertOpen} 
      onClose={()=>{setAlertOpen(false)}} 
      onAgree={()=>{deleteData(selectData),setAlertOpen(false)}} 
      title="Are you sure?"
      body="Are You Want to Delete this customer ?"
    />
  </>
  );
}