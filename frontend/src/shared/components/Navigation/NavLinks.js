import React from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      <li>
        <NavLink to="/u1/stadiums">MY STADIUMS</NavLink>
      </li>
      <li>
        <NavLink to="/stadiums/new">ADD STADIUM</NavLink>
      </li>
      <li>
        <NavLink to="/auth">LOGIN</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
