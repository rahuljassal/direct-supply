// src/components/common/Navbar.js
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex gap-4">
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "text-blue-400" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "text-blue-400" : "")}
        >
          About
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "text-blue-400" : "")}
        >
          Dashboard
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
