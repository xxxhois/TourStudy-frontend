import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import About from './components/About/About';
import BgVideo from './components/index/BgVideo';
import Dashboard from './components/Dashboard/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BgVideo /> //主页面板
  },
  {
    path: '/login',
    element:<div> <Login /></div>
  },
 {
    path: '/register',
     element: <Register />
  },
 {
   path: '/about',
   element: <About />
 },
 {
    path: '/dashboard',
    element: <Dashboard />
  
 }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

export default router;
