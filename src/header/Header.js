import React from "react";
import "../css/Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.jpeg" alt="Logo" />
      </div>
      <div className="title">
        <h1>Learning Management System</h1>
      </div>
    </header>
  );
}

export default Header;
