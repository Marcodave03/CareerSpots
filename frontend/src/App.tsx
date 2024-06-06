import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./Page/Home";
import Login from "./Page/Login";
import Portal from "./Page/Portal";
import InterviewPage from "./Page/Interview";
import UserDashboard from "./Page/UserDashboard";
import StaffDashboard from "./Page/StaffDashboard"; 
import JobDetailPage from "./Page/JobDetailPage"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/signup" element={<Login />} /> 
        <Route path="/portal" element={<Portal />} /> 
        <Route path="/dashboard/*" element={<UserDashboard/>} />     
        <Route path="/staffdashboard/*" element={<StaffDashboard/>} />     
        <Route path="/interview" element={<InterviewPage/>}/>

        <Route path="/jobdetail/:id" element={<JobDetailPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;




