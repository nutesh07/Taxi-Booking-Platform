import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DriverShifts() {
  const [shift, setShift] = useState({ start: "", end: "", active: false });
  const [history, setHistory] = useState([]);

  // load previous shifts
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("driver_shifts")) || [];
    setHistory(saved);
  }, []);

  const saveShift = (e) => {
    e.preventDefault();

    const newShift = {
      ...shift,
      id: Date.now(),
      date: new Date().toLocaleDateString()
    };

    const updated = [...history, newShift];
    setHistory(updated);

    localStorage.setItem("driver_shifts", JSON.stringify(updated));

    alert("Shift Saved Successfully!");
    setShift({ start: "", end: "", active: false });
  };

  return (
    <>
      <Navbar />

      <div className="container py-4">
        <h3 className="fw-bold mb-3">Driver Shift Scheduler</h3>

        <div className="card p-4 shadow-sm mb-4">
          <h5 className="fw-bold mb-3">Schedule Your Shift</h5>

          <form onSubmit={saveShift}>
            <div className="mb-3">
              <label className="form-label">Shift Start Time</label>
              <input
                type="time"
                className="form-control"
                value={shift.start}
                onChange={(e) => setShift({ ...shift, start: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Shift End Time</label>
              <input
                type="time"
                className="form-control"
                value={shift.end}
                onChange={(e) => setShift({ ...shift, end: e.target.value })}
                required
              />
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                checked={shift.active}
                onChange={(e) => setShift({ ...shift, active: e.target.checked })}
              />
              <label className="form-check-label">Make this shift active</label>
            </div>

            <button className="btn btn-dark w-100">Save Shift</button>
          </form>
        </div>

        <div className="card p-4 shadow-sm">
          <h5 className="fw-bold">Shift History</h5>

          {history.length === 0 && (
            <p className="text-muted">No shifts scheduled yet.</p>
          )}

          {history.map((s) => (
            <div key={s.id} className="border rounded p-3 mt-2">
              <div className="fw-bold">
                {s.date} — {s.start} to {s.end}
              </div>
              <div className="text-muted small">
                Status: {s.active ? "Active" : "Inactive"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
