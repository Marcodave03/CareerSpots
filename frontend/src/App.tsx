import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Page/Home";
import Login from "./Page/Login";
import Portal from "./Page/Portal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/Login" element={<Login />} /> 
        <Route path="/Portal" element={<Portal />} /> 
      </Routes>
    </Router>
  );
}

export default App;
