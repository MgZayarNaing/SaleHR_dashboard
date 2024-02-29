// project import
import pages from './pages';
import dashboard from './dashboard';
import screens from './screens';
import auth from './auth';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, screens, pages, auth]
};

export const managerItems = {
  items: [screens, auth]
}

export const waiterItems = {
  items: [auth]
}

export default menuItems
