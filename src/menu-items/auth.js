import { LogoutOutlined } from '@ant-design/icons';

const auth = {
  id: 'logout',
  title: 'Logout',
  type: 'group',
  children: [
    {
      id: 'logout',
      title: 'Logout',
      type: 'item',
      url: '/logout',
      icon: LogoutOutlined
    }
  ]
};

export default auth;