import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebars from "./scenes/global/Sidebar";
import UserSideBar from "./scenes/global/UserSideBar";
import Application from "./scenes/userDashboard/application"; 
import InterviewHistory from "./scenes/userDashboard/interviewhistory"; 
import EditUser from "./scenes/editprofile";
import Profile from "./scenes/userDashboard/profile"; 
import Message from "./scenes/userDashboard/message"; 
import Form from "./scenes/form";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Layout from "./Layout";
import { AppDispatch } from "../app/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

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
    if(user || isSuccess)
    {
      setUserRole(user.role); 
      setUserName(user.name); 
      setUserImage(user.image_url); 
      console.log(userImage); 
      // navigate("/"); 
    }
    if(isError)
    {
      navigate("/"); 
    }
  }, [isError, user, navigate]);


  return (
    <Layout>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <UserSideBar isSidebar={isSidebar} userName={userName} userRole={userRole} userImage={userImage}/>
            <main className="content">
                {/* <Topbar setIsSidebar={setIsSidebar} />  */}
                  <Routes>
                    <Route path="profile" element={<Profile />} />
                    <Route path="editprofile" element={<EditUser />} />
                    <Route path="jobsapplied" element={<Application />} />
                    <Route path="interviewhistory" element={<InterviewHistory/>} />
                    <Route path="message/*" element={<Message />}/>
                  </Routes>
              </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Layout>
  );
}

export default Admin;
