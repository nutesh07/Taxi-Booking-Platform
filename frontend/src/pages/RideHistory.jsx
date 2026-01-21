import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/axios";

export default function RideHistory() {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    async function load() { try { const res = await api.get("/bookings/my-bookings"); setHistory(res.data); } catch { setHistory([]); } }
    load();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h3>Ride History</h3>
        {history.length === 0 && <p className="text-muted">No past rides</p>}
        {history.map(h => (
          <div key={h.id} className="card mb-2">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <div className="fw-bold">{h.date} • {h.rideType}</div>
                <div className="text-muted">{h.pickup} → {h.dest}</div>
              </div>
              <div className="text-end">
                <div className="fw-bold">{h.fare} ₹</div>
                <small className="text-muted">{h.rating ? `Rated ${h.rating}/5` : "Not rated"}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
