import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './layouts/RootLayout.jsx';
import Home from './components/Home/Home.jsx';
import Reports from './components/Reports/Reports.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import MyProfile from './pages/MyProfile.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import MyTransactions from './components/MyTransactions/MyTransactions.jsx';
import AddTransaction from './components/AddTransaction/AddTransaction.jsx';
import TransactionDetails from './components/TransactionDetails/TransactionDetails.jsx';
import UpdateTransaction from './components/UpdateTransaction/UpdateTransaction.jsx';
 

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />, 
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'add-transaction',
        element: <AddTransaction> </AddTransaction>
      },
      {
        path: 'my-transactions',
        element: <MyTransactions> </MyTransactions>,
        loader: () => fetch ('https://b12-a10-future-box-client-neon.vercel.app/transactions')

      },
      {
        path: 'transaction/:id',
        element: <TransactionDetails> </TransactionDetails>
      },
      {
        path: 'transaction/update/:id',
        element: <UpdateTransaction> </UpdateTransaction>
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
      <ToastContainer></ToastContainer>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
