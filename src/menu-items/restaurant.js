import { ShopOutlined } from '@ant-design/icons';

const restaurant = {
  id: 'restaurant',
  title: 'Restaurant',
  type: 'group',
  children: [
    {
      id: 'screens-restaurants',
      title: 'Restaurants',
      type: 'item',
      url: '/restaurants/all',
      icon: ShopOutlined,
      hide: false
    }
  ]
};

export default restaurant;
