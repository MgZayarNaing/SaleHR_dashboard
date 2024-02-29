import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Box, Paper, Switch, Grid, Typography } from '../../../node_modules/@mui/material/index';

function PrinterStatus() {

    const [status, setStatus] = useState({'invoice':true,'kitchen':true,'bar':true})

    const Item = styled(Paper)(() => ({
        textAlign: 'center',
        height: 60,
        width: '100%',
        lineHeight: '60px',
    }));

    const printerHandle = async (e, name) => {   
        localStorage.setItem(name,JSON.stringify(e.target.checked))
        setStatus({ ...status, [name]: e.target.checked });
    }
    
    useEffect(()=>{
        setStatus({
            invoice: JSON.parse(localStorage.getItem('invoice')) || false,
            kitchen: JSON.parse(localStorage.getItem('kitchen')) || false,
            bar: JSON.parse(localStorage.getItem('bar')) || false
          });
        console.log(status)
    },[])
    

  return (
    <Box component={Paper}>
        <Typography sx={{margin:'12px' }} variant="h4" gutterBottom>
            Printer Status
        </Typography>
        <Grid container>
            <Grid item xs={4}>
                <Item
                    elevation={2}
                    sx={{
                        paddingLeft: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                    >
                    Invoice
                    <Switch
                        onChange={e=>{printerHandle(e, 'invoice')}}
                        checked={status.invoice}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Item>
            </Grid>
            <Grid item xs={4}>
                <Item
                    elevation={2}
                    sx={{
                        paddingLeft: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                    >
                    Kitchen
                    <Switch
                        onChange={e=>{printerHandle(e, 'kitchen')}}
                        checked={status.kitchen}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Item>
            </Grid>
            <Grid item xs={4}>
                <Item
                    elevation={2}
                    sx={{
                        paddingLeft: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                    >
                    Bar
                    <Switch
                        onChange={e=>{printerHandle(e, 'bar')}}
                        checked={status.bar}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Item>
            </Grid>
        </Grid>
    </Box>
  )
}

export default PrinterStatus