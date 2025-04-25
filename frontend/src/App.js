import React from 'react';
import {Route, Routes } from 'react-router-dom';
import Header from "./pages/header/Header";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/homepage/Homepage";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path = "/login" element={<Login></Login>}></Route>
        <Route path = "/register" element={<Signup></Signup>}></Route>
        <Route path = "/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path = "/home" element={<Home></Home>}></Route>
      </Routes>
    </>
  ); 
}

export default App;
