import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
};

const notification = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const { addNotification, removeNotification } = notification.actions;
export const selectNotifications = (state) => state.notification.notifications;
export default notification.reducer;
