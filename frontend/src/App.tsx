import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Page/Home";
import Login from "./Page/Login";
import Portal from "./Page/Portal";
import UserList from "./BackendPage/UserList";
import AddUser from "./BackendPage/AddUser";
import EditUser from "./BackendPage/EditUser";
import LoginUser from "./BackendPage/LoginUser";
import Admin from "./Page/Admin";
import InterviewPage from "./Page/Interview";
import { ProtectedRoute } from "./components/protected-route";
import { AuthProvider } from "./auth/context";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/portal" element={<Portal />} />
          {/* if the requiredRoles={['admin', 'staff']} it means that the route can only be access by admin and staff */}
          <Route element={<ProtectedRoute requiredRoles={["admin"]} />}>
            <Route path="/dashboard" element={<Admin />} />
          </Route>

          <Route path="/users" element={<UserList />}></Route>
          <Route path="/add" element={<AddUser />}></Route>
          <Route path="edit/:id" element={<EditUser />}></Route>
          <Route path="/login" element={<LoginUser />}></Route>
          <Route path="/interview" element={<InterviewPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
