import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebars from "./scenes/global/Sidebar";
import UserSideBar from "./scenes/global/UserSideBar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Layout from "./Layout";
import { AppDispatch } from "../app/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe,reset } from "../features/authSlice";

function Admin() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [us, setUs] = useState<any>(""); 
  const { isError, isLoading, isSuccess, message, user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  useEffect(() => {
    console.log(isLoading);
    if (isError) {
      navigate("/");
    }
    if(isSuccess)
    {
      console.log(user); 
      setUs(user);
    }
  }, [isError, isSuccess, navigate]);

  // console.log(isSuccess); 
  // const getUserRole = async () => 
  //   {
  //     console.log(user); 
  //     setUserRole(user.role); 
  //   }
  // useEffect(() => {
  //   getUserRole();
  // }, []);


  return (
    <Layout>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
          <div>
            {us != null && us.role === "role" ? (
              <UserSideBar isSidebar={isSidebar}/>
              ) : (
              <Sidebars isSidebar={isSidebar} />
            )}
          </div>
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Layout>
  );
}

export default Admin;
