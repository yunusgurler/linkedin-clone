import React, { useState } from "react";
import "./Header.css";
import HeaderOption from "./HeaderOption";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { logout, selectUser } from "./features/userSlice";
import { Avatar } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [logoutButtonVisible, setLogoutButtonVisible] = useState(false);
  const options = ["Profile", "Logout"]
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    auth.signOut();
    navigate('/login');
  };

  
  const navigateHome = () => {
    navigate('/home');
  }
  
  const onProfileTap = () => {
    setLogoutButtonVisible(!logoutButtonVisible)
  }


  return (
    <div className="header">
      <div className="header-left">
        <img
          style={{ cursor: "pointer" }}
          onClick={navigateHome}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png"
          alt=""
        ></img>
        <div className="header-search">
          <SearchIcon />
          <input placeholder="Search" type="text" />
        </div>
      </div>

      <div className="header-right">
        <HeaderOption
          Icon={HomeIcon}
          title="Home"
          onClick={() => navigate("/home")}
        />
        <HeaderOption Icon={SupervisorAccountIcon} title="My Network" />
        <HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
        <HeaderOption Icon={ChatIcon} title="Messaging" />
        <HeaderOption Icon={NotificationsIcon} title="Notifications" />
        <div className="profile-button-container">
          {user && (
            <Avatar
              // onClick={() => navigate("/profile")}
              onClick={onProfileTap}
              className="header-avatar"
              src={user?.photoURL}
            >
              {user?.displayName?.charAt(0)}
            </Avatar>
          )}
          {logoutButtonVisible ? (
            <div className="avatar-button-container">
              <button
                className="logout-button"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/profile")}
              >
                Profile
              </button>
              <button
                className="logout-button"
                style={{ cursor: "pointer" }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="avatar-button-container">
              <button
                className="logout-button"
                style={{ visibility: "hidden" }}
                onClick={handleLogout}
              >
                Profile
              </button>
              <button
                className="logout-button"
                style={{ visibility: "hidden" }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
