import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "mapbox-gl/dist/mapbox-gl.css";

import About from "./pages/About";
import Contact from "./pages/Contact";

import DriverEarnings from "./pages/DriverEarnings";
import DriverShifts from "./pages/DriverShifts";


import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import MapPage from "./pages/Map";
import Payment from "./pages/Payment";
import DashboardUser from "./pages/DashboardUser";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardDriver from "./pages/DashboardDriver";
import RideHistory from "./pages/RideHistory";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterDriver from "./pages/RegisterDriver";
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/register-driver" element={<RegisterDriver />} />
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/payment" element={<Payment />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/driver/earnings" element={<DriverEarnings />} />
          <Route path="/driver/shifts" element={<DriverShifts />} />



          {/* Protected user routes */}
          <Route path="/dashboard" element={<DashboardUser />} />
          <Route path="/ride-history" element={<ProtectedRoute><RideHistory /></ProtectedRoute>} />

          
          <Route path="/admin" element={<DashboardAdmin />} />
          <Route path="/driver" element={<DashboardDriver />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
