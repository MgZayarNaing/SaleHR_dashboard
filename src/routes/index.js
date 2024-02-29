import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';


export default function ThemeRoutes() {
  return useRoutes([ LoginRoutes, MainRoutes]);
}
