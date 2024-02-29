import LiquorOutlinedIcon from '@mui/icons-material/LiquorOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import Face3OutlinedIcon from '@mui/icons-material/Face3Outlined';


const screens = {
  id: 'screens',
  title: 'Tables',
  type: 'group',
  children: [
    {
      id: 'screens-categories',
      title: 'Categories',
      type: 'item',
      url: '/categories/list',
      icon: InventoryOutlinedIcon,
      hide: false
    },
    {
      id: 'screens-product-products',
      title: 'product',
      type: 'item',
      url: '/products/list',
      icon: LiquorOutlinedIcon,
      hide: false
    },
    {
      id: 'screens-product-products',
      title: 'product / Create',
      type: 'item',
      url: '/products/create',
      icon: LiquorOutlinedIcon,
      hide: true
    },
    {
      id: 'screens-customers',
      title: 'Customers',
      type: 'item',
      url: '/customers/list',
      icon: Face3OutlinedIcon,
      hide: false
    }
  ]
};

export default screens;
