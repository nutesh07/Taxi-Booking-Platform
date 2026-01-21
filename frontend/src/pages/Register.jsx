import React, { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    carName: "",
    carType: "",
    seats: "",
    aadhar: ""
  });

  const update = (key, val) => setForm({ ...form, [key]: val });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", { ...form, role });
      alert("Registered Successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="reg-container">
        <div className="reg-card shadow">

          {/* Role tabs */}
          <div className="role-switch">
            <div className={`role-btn ${role === "user" ? "active" : ""}`}
              onClick={() => setRole("user")}>👤 User</div>

            <div className={`role-btn ${role === "driver" ? "active" : ""}`}
              onClick={() => setRole("driver")}>🚖 Driver</div>

           
          </div>

          <div className="form-area fade-in">

            <h3 className="text-center fw-bold mb-3">
              Register as {role.charAt(0).toUpperCase() + role.slice(1)}
            </h3>

            <form onSubmit={handleSubmit}>

              {/* Common fields */}
              <input className="form-control mb-3" placeholder="Full Name"
                required value={form.name}
                onChange={(e) => update("name", e.target.value)} />

              <input className="form-control mb-3" type="email" placeholder="Email"
                required value={form.email}
                onChange={(e) => update("email", e.target.value)} />

              <input className="form-control mb-3" type="tel" placeholder="Phone Number"
                required value={form.phone}
                onChange={(e) => update("phone", e.target.value)} />

              <input className="form-control mb-3" type="password" placeholder="Password"
                required value={form.password}
                onChange={(e) => update("password", e.target.value)} />

              {/* DRIVER FIELDS */}
              {role === "driver" && (
                <div className="fade-in">

                  <select className="form-control mb-3" required value={form.gender}
                    onChange={(e) => update("gender", e.target.value)}>
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>

                  <input className="form-control mb-3" placeholder="Aadhar Number"
                    required value={form.aadhar}
                    onChange={(e) => update("aadhar", e.target.value)} />

                  <input className="form-control mb-3" placeholder="Car Name"
                    required value={form.carName}
                    onChange={(e) => update("carName", e.target.value)} />

                  <select className="form-control mb-3" required value={form.carType}
                    onChange={(e) => update("carType", e.target.value)}>
                    <option value="">Car Type</option>
                    <option>Mini</option>
                    <option>Sedan</option>
                    <option>SUV</option>
                  </select>

                  <input className="form-control mb-3" type="number" placeholder="Seating Capacity"
                    required value={form.seats}
                    onChange={(e) => update("seats", e.target.value)} />
                </div>
              )}

              <button className="btn btn-dark w-100 mt-2" type="submit">
                Register
              </button>

            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
