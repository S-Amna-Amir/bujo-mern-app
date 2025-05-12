import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./pages/header/Header";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/homepage/Homepage";
import 'bootstrap/dist/css/bootstrap.min.css';
import PhysicalHealth from "./pages/physicalHealth";
import SearchFilter from "./pages/searchFilter";
import Profile from "./pages/profile";
import PendingRequests from "./pages/admin/PendingRequests";

function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path = "/login" element={<Login></Login>}></Route>
        <Route path = "/register" element={<Signup></Signup>}></Route>
        <Route path = "/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path = "/home" element={<Home></Home>}></Route>
        <Route path="/physical-health" element={<PhysicalHealth />} />
        <Route path="/search-filter" element={<SearchFilter />} />
        <Route path="/profile" element={<Profile ></Profile>}/>
        <Route path="/admin/pending" element={<PendingRequests />}/>
      </Routes>
    </Router>
  ); 
}

export default App;
