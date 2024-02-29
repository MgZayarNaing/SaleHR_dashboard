import { Box, Typography } from '@mui/material';
import NavGroup from './NavGroup';
import menuItem,{ managerItems , waiterItems} from 'menu-items';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  addRole, selectRoles } from 'store/reducers/roleSlice';


const Navigation = () => {

  const dispatch = useDispatch()
  const [item,setItem] = useState(waiterItems)

  useEffect(()=>{
    let existingRole = JSON.parse(localStorage.getItem('role')) || [];
    if(existingRole.length > 0){
      dispatch(addRole(existingRole))
    }
  },[])

  let role = useSelector(selectRoles)

  useEffect(()=>{
    // localToReduxRole()
    if(role.some(role => role === "SUPER_ADMIN")){
      console.log("super admin")
      setItem(menuItem)
    }else if(role.some(role => role === "MANAGER")){
      console.log("manager")
      setItem(managerItems)
    }else{
      console.log("else")
      setItem(waiterItems)
    }
    console.log("useEffect call", item)
  },[role])

  const navGroups = item.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
