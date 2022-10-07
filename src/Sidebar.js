import { Avatar } from "@mui/material";

import React from "react";
import "./Sidebar.css";
import yunus from "../src/pp.jpg";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";

function Sidebar() {
  const user = useSelector(selectUser);

  console.log(user);

  const recentItem = (topic) => {
    
    return (
    <div className="sidebar-recentItem">
        <span>#</span>
        <p>{topic}</p>
    </div>
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <img
        className="sidebar-topImage"
          src="https://media.istockphoto.com/illustrations/watercolor-background-abstract-pastel-color-gradient-with-soft-illustration-id1269109174?k=20&m=1269109174&s=612x612&w=0&h=Cwv6JhDxAIQ5fGpxjT5ulPaZAoZluGY49MEYr5B2XNs="
          alt=""
        />
        <Avatar src={user?.photoURL} className="sidebar-avatar">{user?.displayName?.charAt(0)}</Avatar>
        <h2>{user?.displayName}</h2>
        <h4>{user?.email}</h4>

        <div className="sidebar-stats">
          <div className="sidebar-stat">
            <p>Who viewed you</p>
            <p className="sidebar-statNumber">2,543</p>
          </div>

          <div className="sidebar-stat">
            <p>Views on post</p>
            <p className="sidebar-statNumber">2,213</p>
          </div>
        </div>
        </div>

        <div className="sidebar-bottom">
          <p>Recent</p>
          {recentItem("reactJS")}
          {recentItem('programming')}
          {recentItem('software')}
          {recentItem('design')}
          {recentItem('developer')}

        </div>
    </div>
  );
}

export default Sidebar;
