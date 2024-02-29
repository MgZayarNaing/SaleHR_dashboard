// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import notification from './notificationSlice';
import role from './roleSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, notification, role});

export default reducers;