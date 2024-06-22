import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import SideBar from "./scenes/global/Sidebar";
import EditUser from "./scenes/adminDashboard/editprofile";
import Jobs from "./scenes/adminDashboard/createdjobs";
import CreateJob from "./scenes/adminDashboard/createdjobs/createjob";
import JobApplication from "./scenes/adminDashboard/application";
import StaffList from "./scenes/adminDashboard/staff";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Layout from "./Layout";
import { AppDispatch } from "../app/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import EditJob from "./scenes/adminDashboard/editjob";
import Profile from "./scenes/adminDashboard/profile";
import Message from "./scenes/adminDashboard/message";

function Admin() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [userRole, setUserRole] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userImage, setUserImage] = useState<string | undefined>("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isError, isSuccess, user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user || isSuccess) {
      setUserRole(user.role);
      setUserName(user.name);
      setUserImage(user.image_url);
      console.log(userImage);
    }
  }, [isError, user, navigate]);


  return (
    <Layout>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <SideBar isSidebar={isSidebar} userName={userName} userRole={userRole} userImage={userImage} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="profile" element={<Profile />} />
                <Route path="editprofile" element={<EditUser />} />
                <Route path="staff" element={<StaffList />} />
                <Route path="createdjobs" element={<Jobs />} />
                <Route path="createjob" element={<CreateJob />} />
                <Route path="applications" element={<JobApplication />} />
                <Route path="editjob/:id" element={<EditJob />} />
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
