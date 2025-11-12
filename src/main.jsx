import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './layouts/RootLayout.jsx';
import Home from './components/Home/Home.jsx';
import AddTransaction from './components/AddTransaction/AddTransaction.jsx';
import MyTransactions from './components/MyTransactions/MyTransactions.jsx';
import Reports from './components/Reports/Reports.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import MyProfile from './pages/MyProfile.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
 

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />, // ✅ এখানে error page যুক্ত করা হলো
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'addTransaction',
        Component: AddTransaction
      },
      {
        path: 'mytransactions',
        Component: MyTransactions
      },
      {
        path: 'reports',
        Component: Reports
      },
      {
        path: 'register',
        Component: Register
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'myprofile',
        Component: MyProfile
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> 
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
