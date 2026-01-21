import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DriverEarnings() {
  const [stats, setStats] = useState({
    today: 0,
    week: 0,
    month: 0,
    trips: 0
  });

  // Load from local storage
  useEffect(() => {
    const earn = JSON.parse(localStorage.getItem("driver_earnings")) || {
      today: 0,
      week: 0,
      month: 0,
      trips: 0
    };
    setStats(earn);
  }, []);

  return (
    <>
      <Navbar />

      <div className="container py-4">
        <h3 className="fw-bold mb-4">Driver Earnings</h3>

        <div className="row g-3">
          <div className="col-md-3">
            <div className="card p-3 shadow-sm">
              <h6>Today's Earnings</h6>
              <h3 className="fw-bold text-success">₹ {stats.today}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card p-3 shadow-sm">
              <h6>This Week</h6>
              <h3 className="fw-bold">₹ {stats.week}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card p-3 shadow-sm">
              <h6>This Month</h6>
              <h3 className="fw-bold">₹ {stats.month}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card p-3 shadow-sm">
              <h6>Total Trips</h6>
              <h3 className="fw-bold">{stats.trips}</h3>
            </div>
          </div>
        </div>

        <div className="card p-4 mt-4 shadow-sm">
          <h5 className="fw-bold">Earnings Insight</h5>
          <p className="text-muted">More analytics coming soon...</p>
        </div>
      </div>

      <Footer />
    </>
  );
}
