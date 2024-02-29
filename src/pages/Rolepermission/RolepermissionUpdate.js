import React, { useEffect, useState } from 'react';
import { Grid, Button, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import SkeletonComponent from 'components/SkeletonComponent';
import { getRequest, putRequest } from 'services/apiService';
import { useNavigate } from 'react-router-dom';
import { Switch } from '../../../node_modules/@mui/material/index';
import { useParams } from '../../../node_modules/react-router-dom/dist/index';


function RolepermissionUpdate() {

  const [permission, setPermission] = useState([])
  const [role, setRole] = useState([])
  const [oldRole, setOldRole] = useState([])
  const [loading, setLoading] = useState(true)
  const [roleName, setRoleName] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const params = useParams()

  const navigate = useNavigate()

  const fetchPermission = async () => {
    setLoading(true);
    const response = await getRequest("auth/permission");
    if (response.data) {
        setPermission(response.data);
    }
    setLoading(false)
  }

  const fetchRole = async () => {
    setLoading(true);
    const response = await getRequest(`auth/role/${params.Id}`);
    if (response.data) {
        setName(response.data.name)
        setDescription(response.data.description)
        setRole(response.data.permissions?.map(item => item.id));
        setOldRole(response.data.permissions?.map(item => item.id));
        setRoleName(response.data?.name)
    }
    setLoading(false)
  }

  const permissionHandle = async (e, id) => {
    setRole(role =>
      e.target.checked
        ? [...role, id]
        : role.filter(roleId => roleId !== id)
    );
  }

  const changeUpdate = async () => {
    const response = await putRequest(`auth/role/${params.Id}`,{name:name,description:description,permissions:role});
    if (response.data) {
        navigate('/rolepermission/all')
    }
  }

  const Item = styled(Paper)(() => ({
    textAlign: 'center',
    height: 60,
    width: 260,
    lineHeight: '60px',
  }));

  useEffect(()=>{
    fetchPermission()
    fetchRole()
  },[])

  return (
    <>
    {loading ? ( 
      <SkeletonComponent />
      ) : (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <h3>{roleName}</h3>
        </Grid>
        <Grid item xs={4}>
          <Button 
            variant="contained" 
            onClick={()=>changeUpdate()}
            disabled={JSON.stringify(oldRole) === JSON.stringify(role) ? true : false}
          >
            Update
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'background.default',
              display: 'grid',
              gridTemplateColumns: { md: '1fr 1fr 1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' },
              gap: 2,
            }}
          >
            {permission.map((p) => (
              <Item key={p.id} 
                elevation={2}
                sx={{
                  paddingLeft: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                >
                {p.name}
                <Switch
                  onChange={e=>{permissionHandle(e, p.id)}}
                  checked={role.some(r => r === p.id)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Item>
            ))}
          </Box>
        </Grid>
      </Grid>
    </>
    )}
    </>
  )
}

export default RolepermissionUpdate