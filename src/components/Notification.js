import React, { useEffect } from 'react'
import { Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { removeNotification, selectNotifications } from 'store/reducers/notificationSlice';

function Notification() {

    const dispatch = useDispatch();
    const notifications = useSelector(selectNotifications);
  
    const handleRemoveNotification = (id) => {
      dispatch(removeNotification(id));
    };

    useEffect(()=>{
        const timeoutId = setTimeout(() => {
            notifications.map((noti)=>{
                dispatch(removeNotification(noti.id));
            })
            console.log(timeoutId)
        }, 5000);
    },[notifications])

  return (
    <>
    {notifications.map((noti,index) => (
        <Alert
          key={index}
          variant="filled"
          severity={noti.type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => handleRemoveNotification(noti.id)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {noti.message}
        </Alert>
        ))}
    </>
  )
}

export default Notification