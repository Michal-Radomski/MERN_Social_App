import React from "react";
import {Link} from "react-router-dom";

const Navbar = (): JSX.Element => {
  return (
    <React.Fragment>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-code"></i> DevConnector
          </Link>
        </h1>
        <ul>
          <li>
            <Link to="/profiles">Developers</Link>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
