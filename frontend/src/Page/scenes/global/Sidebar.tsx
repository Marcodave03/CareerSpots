import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import JobOutlineIcon from '@mui/icons-material/WorkOutline';
import GroupOutlinedIcon from "@mui/icons-material/WorkOutline";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ForumIcon from '@mui/icons-material/ForumOutlined';

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
  userName: string, 
  userImage: string |undefined, 
  userRole: string
}


const Sidebars: React.FC<SidebarProps> = (SidebarProps) => {
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
              {
                (SidebarProps.userImage == undefined)?
                (        <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`http://localhost:5000/images/donlot.png`} 
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />)
                :
                (
                  <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`http://localhost:5000/images/${SidebarProps.userImage}`} 
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
                )
              }
            </div>
            <div style={{ textAlign: "center" }}>
              <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                style={{ margin: "10px 0 0 0" }}
              >
                {SidebarProps.userName}
              </Typography>
              <Typography variant="h5" color={colors.greenAccent[500]}>
                {SidebarProps.userRole}
              </Typography>
            </div>
          </div>
        )}

        <div style={{ paddingLeft: isCollapsed ? undefined : "10%" }}>
          <Item
            title="Profile"
            to="/staffdashboard/profile"
            icon={<PersonOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Other staffs"
            to="/staffdashboard/staff"
            icon={<PeopleOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Created Jobs"
            to="/staffdashboard/createdjobs"
            icon={<ContactsOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Job Applications"
            to="/staffdashboard/applications"
            icon={<GroupOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />

<Item
            title="Messages"
            to="/staffdashboard/message/inbox"
            icon={<ForumIcon />}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </Menu>
    </Sidebar>
  );
};

export default Sidebars;