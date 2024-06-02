import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import JobOutlineIcon from '@mui/icons-material/WorkOutline';
import PostAddIcon from '@mui/icons-material/PostAdd';


interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Item: React.FC<ItemProps> = ({
  title,
  to,
  icon,
  selected,
  setSelected,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Typography>{title}</Typography>
      </Link>
    </MenuItem>
  );
};

interface SidebarProps {
  isSidebar: boolean;
}

const Sidebars: React.FC<SidebarProps> = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Sidebar
      collapsed={isCollapsed}
      style={{
        background: `${colors.primary[400]} !important`,
        height: "100vh",
      }}
    >
      <Menu>
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          style={{
            margin: "10px 0 20px 0",
            color: colors.grey[100],
          }}
        >
          {!isCollapsed && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: "15px",
              }}
            >
              <Typography variant="h3" color={colors.grey[100]}>
                ADMINIS
              </Typography>
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <MenuOutlinedIcon />
              </IconButton>
            </div>
          )}
        </MenuItem>

        {!isCollapsed && (
          <div style={{ marginBottom: "25px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                alt="profile-user"
                width="100px"
                height="100px"
                src={`../../../src/assets/Atkinson_Rowan.jpg`}
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                style={{ margin: "10px 0 0 0" }}
              >
                Mr Bean
              </Typography>
              <Typography variant="h5" color={colors.greenAccent[500]}>
                Hollywood Company Admin
              </Typography>
            </div>
          </div>
        )}

        <div style={{ paddingLeft: isCollapsed ? undefined : "10%" }}>
          <Item
            title="Dashboard"
            to="/Admin"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />

<Item
            title="Job List"
            to="/Admin/jobs"
            icon={<JobOutlineIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Applicant List"
            to="/Admin/applicants"
            icon={<PeopleOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Jobs Applied List"
            to="/Admin/jobsapplied"
            icon={<JobOutlineIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Job Form"
            to="/Admin/form"
            icon={<PostAddIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Calendar"
            to="/Admin/calendar"
            icon={<CalendarTodayOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="FAQ Page"
            to="/Admin/faq"
            icon={<HelpOutlineOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </Menu>
    </Sidebar>
  );
};

export default Sidebars;