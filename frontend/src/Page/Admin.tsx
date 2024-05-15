import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebars from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Jobs from "./scenes/jobs";
import JobApplied from "./scenes/jobsapplied";
import Invoices from "./scenes/invoices";
import Applicants from "./scenes/applicants";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";

function Admin() {
  
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebars isSidebar={isSidebar} />  
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} /> 
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="jobs" element={<Jobs />} />
                    <Route path="jobsapplied" element={<JobApplied />} />
                    <Route path="applicants" element={<Applicants />} />
                    <Route path="invoices" element={<Invoices />} />
                    <Route path="form" element={<Form />} />
                    <Route path="bar" element={<Bar />} />
                    <Route path="/pie" element={<Pie />} />
                    <Route path="line" element={<Line />} />
                    <Route path="faq" element={<FAQ />} />
                    <Route path="calendar" element={<Calendar />} />
                  </Routes>
              </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Admin;
