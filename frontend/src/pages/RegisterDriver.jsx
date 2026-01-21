import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";

export default function RegisterDriver() {
  const navigate = useNavigate();

  // Inputs
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [password, setPassword] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  // car details
  const [carName, setCarName] = useState("");
  const [carType, setCarType] = useState("sedan");
  const [carNumber, setCarNumber] = useState("");
  const [seating, setSeating] = useState("");

  const [error, setError] = useState("");

  // REGEX VALIDATION
  const nameRegex = /^[A-Za-z ]{3,30}$/;
  const emailRegex = /^\S+@\S+\.\S+$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  const aadharRegex = /^[2-9]{1}\d{11}$/;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

  // OTP simulation
  const sendOtp = () => {
    if (!phoneRegex.test(phone)) {
      setError("Enter valid phone number before sending OTP");
      return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setOtpSent(true);
    alert("Your OTP is: " + otp + " (Demo only)");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!nameRegex.test(name)) return setError("Enter a valid name");
    if (!emailRegex.test(email)) return setError("Enter a valid email");
    if (!phoneRegex.test(phone)) return setError("Enter valid 10-digit phone");
    if (!aadharRegex.test(aadhar)) return setError("Invalid Aadhar number");
    if (!passRegex.test(password))
      return setError(
        "Password must include A-Z, a-z, number, special char, 8+ chars"
      );

    if (!otpSent) return setError("Send OTP first");
    if (otpInput !== generatedOtp) return setError("Incorrect OTP");

    if (!carName || !carNumber || !seating)
      return setError("Fill all car details");

    // Save driver mock record
    localStorage.setItem(
      "cabx_registered_driver_" + email,
      JSON.stringify({
        name,
        email,
        gender,
        phone,
        aadhar,
        password,
        role: "driver",
        car: { carName, carType, carNumber, seating },
      })
    );

    alert("Driver Registered Successfully");
    navigate("/login");
  };

  return (
    <div className="auth-layout">
      <div className="auth-hero">
        <h1 className="hero-title">Driver Registration</h1>
        <p className="hero-sub">Register to drive with CabX and start earning.</p>
      </div>

      <div className="glass-card">
        <h5 className="mb-3">Driver Details</h5>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <FormInput
            label="Full Name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="form-label small text-muted">Gender</label>
          <select
            className="form-select mb-3"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <FormInput
            label="Email"
            type="email"
            placeholder="you@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PHONE + OTP */}
          <label className="form-label small text-muted">Phone Number</label>
          <div className="d-flex mb-3">
            <input
              className="form-control custom me-2"
              placeholder="10-digit number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-dark"
              onClick={sendOtp}
            >
              Send OTP
            </button>
          </div>

          {otpSent && (
            <FormInput
              label="Enter OTP"
              placeholder="6-digit OTP"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
            />
          )}

          <FormInput
            label="Aadhar Number"
            placeholder="12-digit Aadhar number"
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
          />

          <FormInput
            type="password"
            label="Password"
            placeholder="Strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <h5 className="mt-4">Car Details</h5>

          <FormInput
            label="Car Name"
            placeholder="e.g., Swift, Dzire"
            value={carName}
            onChange={(e) => setCarName(e.target.value)}
          />

          <label className="form-label small text-muted">Car Type</label>
          <select
            className="form-select mb-3"
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
          >
            <option value="mini">Mini</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="luxury">Luxury</option>
          </select>

          <FormInput
            label="Car Number"
            placeholder="MH12AB1234"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
          />

          <FormInput
            label="Seating Capacity"
            placeholder="4 or 6"
            value={seating}
            onChange={(e) => setSeating(e.target.value)}
          />

          <button className="btn btn-primary-custom w-100 mt-3">
            Register Driver
          </button>
        </form>
      </div>
    </div>
  );
}
