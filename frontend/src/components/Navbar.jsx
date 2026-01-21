import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">CabX</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">

          <ul className="navbar-nav ms-auto align-items-center">

            {/* HOME */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {/* ABOUT US */}
            <li className="nav-item">
              <Link className="nav-link" to="/about">About Us</Link>
            </li>

            {/* CONTACT */}
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>

            {/* BOOK */}
            <li className="nav-item">
              <Link className="nav-link" to="/booking">Book</Link>
            </li>


            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={user.role === "ADMIN" ? "/admin" : user.role === "DRIVER" ? "/driver" : "/dashboard"}>
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <button className="btn btn-outline-dark ms-2" onClick={logout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>

                <li className="nav-item">
                  <Link className="btn btn-dark ms-2" to="/register">Sign Up</Link>
                </li>
              </>
            )}

          </ul>

        </div>
      </div>
    </nav>
  );
}


