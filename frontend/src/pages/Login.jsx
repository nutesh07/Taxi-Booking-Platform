import React, { useContext, useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  // REGEX VALIDATION
  const emailRegex = /^\S+@\S+\.\S+$/;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!emailRegex.test(email))
      return setErr("Please enter a valid email");

    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      login(user); // Update context

      if (user.role === "ADMIN") return navigate("/admin");
      if (user.role === "DRIVER") return navigate("/driver");
      return navigate("/dashboard");

    } catch (error) {
      setErr(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card shadow p-4">
              <h3 className="fw-bold mb-3 text-center">Login</h3>

              {err && <div className="alert alert-danger">{err}</div>}

              <form onSubmit={submit}>
                <input
                  className="form-control mb-3"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn btn-dark w-100">
                  Login
                </button>
              </form>

              <p className="mt-3 text-center">
                Don’t have an account?{" "}
                <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
