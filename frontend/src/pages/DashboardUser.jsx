import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./DashboardUser.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function DashboardUser() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: user?.name || "User",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [editMode, setEditMode] = useState(false);
  const [activeRide, setActiveRide] = useState(null);
  const [history, setHistory] = useState([]);

  React.useEffect(() => {
    const fetchData = () => {
      import("../api/axios").then(module => {
        const api = module.default;
        api.get("/bookings/my-bookings")
          .then(res => {
            const all = res.data;
            // Find active ride (PENDING, ACCEPTED, ONGOING)
            const active = all.find(b => ["PENDING", "ACCEPTED", "ONGOING"].includes(b.status));
            setActiveRide(active);

            // History
            setHistory(all.filter(b => ["COMPLETED", "CANCELLED"].includes(b.status)));
          })
          .catch(err => console.error(err));
      });
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      <div className="container dashboard-container">

        {/* PROFILE CARD */}
        <div className="profile-card shadow">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            className="profile-img"
            alt="profile"
          />

          <div className="profile-right">
            {!editMode ? (
              <>
                <h3>{profile.name}</h3>
                <p className="text-muted">{profile.email}</p>
                <p className="text-muted">+91 {profile.phone}</p>

                <button className="btn btn-dark mt-2" onClick={() => setEditMode(true)}>
                  Edit Profile
                </button>
              </>
            ) : (
              <>
                <input
                  className="form-control mb-2"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
                <input
                  className="form-control mb-2"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />

                <button className="btn btn-success me-2" onClick={() => setEditMode(false)}>
                  Save
                </button>
                <button className="btn btn-outline-secondary" onClick={() => setEditMode(false)}>
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* ACTIVE RIDE */}
        <div className="section-title">Active Ride</div>
        <div className="active-ride-card shadow-sm">
          {activeRide ? (
            <div>
              <h6 className="fw-bold text-primary">{activeRide.status}</h6>
              <div className="fw-bold">{activeRide.pickupLocation} → {activeRide.dropLocation}</div>
              <p className="text-muted small">₹{activeRide.fare} • {activeRide.distance} km</p>
              {activeRide.driver && (
                <div className="mt-2 small border-top pt-2">
                  <strong>Driver:</strong> {activeRide.driver.user?.name} ({activeRide.driver.vehiclePlate})
                </div>
              )}
            </div>
          ) : (
            <div>
              <h6 className="fw-bold">No active rides</h6>
              <p className="text-muted small">Your active rides will appear here.</p>
            </div>
          )}
          {!activeRide && <Link to="/booking" className="btn btn-warning btn-sm">Book</Link>}
        </div>

        {/* RIDE HISTORY */}
        <div className="section-title mt-4">Ride History</div>
        {history.map((r) => (
          <div className="ride-item shadow-sm" key={r.id}>
            <div>
              <div className="fw-bold">{r.pickupLocation} → {r.dropLocation}</div>
              <div className="text-muted small">{new Date(r.createdAt).toLocaleDateString()}</div>
            </div>

            <div className="text-end">
              <div className="fw-bold">₹ {r.fare}</div>
              <span
                className={`ride-status ${r.status.toLowerCase()}`}
              >
                {r.status}
              </span>
            </div>
          </div>
        ))}

        {/* WALLET */}
        <div className="section-title mt-4">Wallet</div>
        <div className="wallet-card shadow-sm">
          <div>
            <h4>₹ 250</h4>
            <p className="text-muted small">Available Balance</p>
          </div>
          <button className="btn btn-dark btn-sm">Add Money</button>
        </div>

        {/* SETTINGS */}
        <div className="section-title mt-4">Settings</div>
        <div className="settings-list">
          <div className="settings-item">Emergency Contact</div>
          <div className="settings-item">Safety Settings</div>
          <div className="settings-item">Dark Mode (coming soon)</div>
        </div>
      </div>

      <Footer />
    </>
  );
}
