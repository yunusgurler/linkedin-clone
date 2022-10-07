import React from "react";
import "./HeaderOption.css";

function HeaderOption({ avatar, Icon, title }) {
  return (
    <div className="headerOption">
      {Icon && <Icon className="headerOption-icon" />}
      <p className="headerOption-title">{title}</p>
      
    </div>
  );
}

export default HeaderOption;
