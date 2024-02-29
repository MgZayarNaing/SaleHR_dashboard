import React, { useEffect } from 'react'
import { CircularProgress, Box } from '@mui/material';


function Logout() {


    useEffect(()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.replace('/login')
    },[])
  return (
    <Box
        display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
        <CircularProgress
            variant="determinate"
            sx={{
            color: (theme) =>
                theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
            }}
            size={40}
            thickness={4}
            value={100}
      />
    </Box>
  )
}

export default Logout