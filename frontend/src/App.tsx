import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./Page/Home";
import Login from "./Page/Login";
import Portal from "./Page/Portal";
import UserList from "./BackendPage/UserList";
import AddUser from "./BackendPage/AddUser";
import EditUser from "./BackendPage/EditUser";
import LoginUser from "./BackendPage/LoginUser";
import Dashboard from "./Page/Dashboard/dashboardmain";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/signup" element={<Login />} /> 
        <Route path="/Portal" element={<Portal />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 

        <Route path="/users" element={<UserList/>}></Route> 
        <Route path="/add" element={<AddUser/>}></Route>
        <Route path="edit/:id" element={<EditUser/>}></Route>
        <Route path="/login" element={<LoginUser/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;




