import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import SideBar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Users from "./scenes/adminDashboardReal/user";
import Staff from "./scenes/adminDashboardReal/staff";
import Company from "./scenes/adminDashboardReal/company";
import Jobs from "./scenes/adminDashboardReal/job";
import JobApplication from "./scenes/adminDashboardReal/application";
import CreateUser from "./scenes/adminDashboardReal/createuser";;
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Layout from "./Layout";
import { AppDispatch } from "../app/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

import EditUser from "../Page/scenes/adminDashboardReal/edituser";
import EditJob from "../Page/scenes/adminDashboardReal/editjob";
import EditCompany from "../Page/scenes/adminDashboardReal/editcompany";
import EditApplication from "../Page/scenes/adminDashboardReal/editapplication";

function Admin() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [userRole, setUserRole] = useState<string>("");
  const [userName, setUserName] = useState<string>(""); 
  const [userImage, setUserImage] = useState<string | undefined>(""); 
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isError, isLoading, isSuccess, message, user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if(user || isSuccess)
    {
      setUserRole(user.role); 
      setUserName(user.name); 
      setUserImage(user.image_url); 
      console.log(userImage); 
      // navigate("/"); 
    }
  }, [isError, user, navigate]);



  return (
    <Layout>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
          <SideBar isSidebar={isSidebar} userName={userName} userRole={userRole} userImage={userImage}/>
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="user" element={<Users />} />
                <Route path="staff" element={<Staff/>} />
                <Route path="job" element={<Jobs />} />
                {/* <Route path="jobapplication" element={<JobApplication />} /> */}
                <Route path="company" element={<Company/>} />
                <Route path="createuser" element={<CreateUser />} />
  
                <Route path="edituser/:id" element={<EditUser />} />
                <Route path="editjob/:id" element={<EditJob />} />
                <Route path="editcompany/:id" element={<EditCompany />} />
                <Route path="editapplication/:id" element={<EditApplication />} />


              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Layout>
  );
}

export default Admin;
