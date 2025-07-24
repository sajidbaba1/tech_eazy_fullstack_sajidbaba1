import { createBrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import ParcelList from './components/ParcelList';
import CustomerTracking from './components/CustomerTracking';
import SupervisorDashboard from './components/SupervisorDashboard';
import ParcelForm from './components/ParcelForm';
import PrivateRoute from './components/PrivateRoute';

const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/parcels',
      element: <PrivateRoute element={<ParcelList />} />,
    },
    {
      path: '/track',
      element: <CustomerTracking />,
    },
    {
      path: '/supervisor-dashboard',
      element: <PrivateRoute element={<SupervisorDashboard />} requiredRoles={['ADMIN', 'SUPERVISOR']} />,
    },
    {
      path: '/parcels/create',
      element: <PrivateRoute element={<ParcelForm />} requiredRoles={['ADMIN', 'VENDOR']} />,
    },
    {
      path: '/',
      element: <PrivateRoute element={<ParcelList />} />,
    }
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

export default router;
