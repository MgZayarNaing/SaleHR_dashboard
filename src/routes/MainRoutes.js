import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - screens
const Categories = Loadable(lazy(() => import('pages/Categories/Categories')));
const CategoriesForm = Loadable(lazy(() => import('pages/Categories/CategoriesForm')));
const ProductList = Loadable(lazy(() => import('pages/Products/ProductList')));
const ProductForm = Loadable(lazy(() => import('pages/Products/ProductForm')));
const ProductInventory = Loadable(lazy(() => import('pages/Products/ProductInventory')));
const Users = Loadable(lazy(() => import('pages/Users/Users')));
const UsersForm = Loadable(lazy(() => import('pages/Users/UsersForm')));
const UserRole = Loadable(lazy(() => import('pages/Users/UserRole')));
const Rolepermission = Loadable(lazy(() => import('pages/Rolepermission/Rolepermission')));
const RolepermissionUpdate = Loadable(lazy(() => import('pages/Rolepermission/RolepermissionUpdate')));
const Customers = Loadable(lazy(() => import('pages/Customers/Customers')));
const CustomersForm = Loadable(lazy(() => import('pages/Customers/CustomersForm')));
const Settings = Loadable(lazy(() => import('pages/Settings/Settings')));
const ShopForm = Loadable(lazy(() => import('pages/Settings/ShopForm')));
const PrinterForm = Loadable(lazy(() => import('pages/Settings/PrinterForm')));
const Invoice = Loadable(lazy(() => import('pages/Invoice/Invoice')));
const InvoiceDetail = Loadable(lazy(() => import('pages/Invoice/InvoiceDetail')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'products',
      children: [
        {
          path: 'list',
          element: <ProductList />
        },
        {
          path: 'create',
          element: <ProductForm />
        },
        {
          path: 'update/:Id',
          element: <ProductForm />
        },
        {
          path: 'inventory/:Id',
          element: <ProductInventory />
        }
      ]
    },
    {
      path: 'categories',
      children: [
        {
          path: 'list',
          element: <Categories />
        },
        {
          path: 'create',
          element: <CategoriesForm />
        },
        {
          path: 'update/:Id',
          element: <CategoriesForm />
        },
      ]
    },
    {
      path: 'users',
      children: [
        {
          path: 'list',
          element: <Users />
        },
        {
          path: 'role',
          element: <UserRole />
        },
        {
          path: 'create',
          element: <UsersForm />
        },
        {
          path: 'update/:Id',
          element: <UsersForm />
        },
      ]
    },
    {
      path: 'rolepermission',
      children: [
        {
          path: 'all',
          element: <Rolepermission />
        },
        {
          path: 'create',
          element: <Rolepermission />
        },
        {
          path: 'update/:Id',
          element: <RolepermissionUpdate />
        },
      ]
    },
    {
      path: 'customers',
      children: [
        {
          path: 'list',
          element: <Customers />
        },
        {
          path: 'create',
          element: <CustomersForm />
        },
        {
          path: 'update/:Id',
          element: <CustomersForm />
        },
      ]
    },
    {
      path: 'settings',
      children: [
        {
          path: 'all',
          element: <Settings />
        },
        {
          path: 'shop/update/',
          element: <ShopForm />
        },
        {
          path: 'printer/update/',
          element: <PrinterForm />
        },
      ]
    },
    {
      path: 'invoices',
      children: [
        {
          path: 'all',
          element: <Invoice />
        },
        {
          path: 'detail/:Id',
          element: <InvoiceDetail />
        }
      ]
    }
  ]
};

export default MainRoutes;
