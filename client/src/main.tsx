import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Entry from './pages/Entry/index.tsx';
import Home from './pages/Home/index.tsx';
import Register from './pages/Register/index.tsx';
import RegistrationSuccess from './pages/RegistrationSuccess/index.tsx';
import { NavBarWrapper } from './components/NavBar.tsx';
import Profile from './pages/Profile/index.tsx';
import RegisterVisit from './pages/RegisterVisit/index.tsx';
import Visits from './pages/Visits/index.tsx';
import CompleteVisit from './pages/CompleteVisit/index.tsx';
import VisitConfirmed from './pages/VisitConfirmed/index.tsx';
import VisitDetails from './pages/VisitDetails/index.tsx';
import Login from './pages/Login/index.tsx';
import { ConfigProvider } from 'antd';
import CheckInVisit from './pages/CheckInVisit/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Entry />,
  },
  {
    path: "/",
    element: <NavBarWrapper isLoggedIn={true} />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/register-visit/",
        element: <RegisterVisit />,
      },
      {
        path: "/visits",
        element: <Visits />,
      },
      {
        path: "/visit-completed/:visitId",
        element: <CompleteVisit />,
      },
      {
        path: "/visit-details/:visitId",
        element: <VisitDetails />,
      },
      {
        path: "/visit-confirmed/:visitId",
        element: <VisitConfirmed />,
      },
      {
        path: "/check-in/:visitId",
        element: <CheckInVisit />,
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register-success",
    element: <RegistrationSuccess />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#8187f3',
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>

  </StrictMode>,
)
