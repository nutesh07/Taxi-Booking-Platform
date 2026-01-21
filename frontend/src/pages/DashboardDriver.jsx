import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DashboardDriver() {

  // DRIVER PROFILE
  const [profile, setProfile] = useState({
    name: localStorage.getItem("drv_name") || "Driver",
    phone: localStorage.getItem("drv_phone") || "",
    password: localStorage.getItem("drv_pass") || "",
  });

  // VEHICLE DETAILS
  const [vehicle, setVehicle] = useState({
    carName: localStorage.getItem("drv_carName") || "",
    carType: localStorage.getItem("drv_carType") || "",
    seats: localStorage.getItem("drv_seats") || "",
    plate: localStorage.getItem("drv_plate") || "",
  });

  // ONLINE / OFFLINE STATUS
  const [isOnline, setIsOnline] = useState(
    localStorage.getItem("drv_status") === "online"
  );

  // RIDE REQUESTS (Real)
  const [requests, setRequests] = useState([]);
  const [activeRide, setActiveRide] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchBookings = () => {
    import("../api/axios").then(module => {
      const api = module.default;
      api.get("/bookings/driver-bookings")
        .then(res => {
          const all = res.data;
          setRequests(all.filter(b => b.status === "PENDING"));
          setActiveRide(all.find(b => b.status === "ACCEPTED" || b.status === "ONGOING"));
          setHistory(all.filter(b => b.status === "COMPLETED" || b.status === "CANCELLED"));
        })
        .catch(err => console.error(err));
    });
  };

  // SAVE PROFILE
  const saveProfile = () => {
    localStorage.setItem("drv_name", profile.name);
    localStorage.setItem("drv_phone", profile.phone);
    localStorage.setItem("drv_pass", profile.password);
    alert("Profile updated!");
  };

  // SAVE VEHICLE
  const saveVehicle = () => {
    localStorage.setItem("drv_carName", vehicle.carName);
    localStorage.setItem("drv_carType", vehicle.carType);
    localStorage.setItem("drv_seats", vehicle.seats);
    localStorage.setItem("drv_plate", vehicle.plate);
    alert("Vehicle details saved!");
  };

  // ONLINE / OFFLINE TOGGLE
  const toggleOnline = () => {
    const status = !isOnline;
    setIsOnline(status);
    localStorage.setItem("drv_status", status ? "online" : "offline");
  };

  // ACCEPT RIDE
  const acceptRide = (r) => {
    import("../api/axios").then(module => {
      const api = module.default;
      api.put(`/bookings/${r.id}/status`, { status: "ACCEPTED" })
        .then(() => {
          alert("Ride Accepted!");
          fetchBookings();
        })
        .catch(err => alert("Failed to accept"));
    });
  };

  // REJECT RIDE
  const rejectRide = (r) => {
    import("../api/axios").then(module => {
      const api = module.default;
      api.put(`/bookings/${r.id}/status`, { status: "CANCELLED" })
        .then(() => {
          alert("Ride Rejected");
          fetchBookings();
        })
        .catch(err => alert("Failed to reject"));
    });
  };

  const completeRide = (r) => {
    import("../api/axios").then(module => {
      const api = module.default;
      api.put(`/bookings/${r.id}/status`, { status: "COMPLETED" })
        .then(() => {
          alert("Ride Completed!");
          fetchBookings();
        })
        .catch(err => alert("Failed to complete"));
    });
  };

  return (
    <>
      <Navbar />

      <div className="container py-4">
        <h3 className="fw-bold">Driver Dashboard</h3>
        <p className="text-muted">Manage your profile, vehicle & rides</p>

        {/* ONLINE STATUS */}
        <div className="mb-3">
          <button
            className={`btn ${isOnline ? "btn-success" : "btn-secondary"}`}
            onClick={toggleOnline}
          >
            {isOnline ? "🟢 Online" : "⚪ Offline"}
          </button>
        </div>

        <div className="row">



          <div className="col-md-4">

            <div className="card p-3 mb-3 shadow-sm">
              <h5>My Profile</h5>
              <input
                className="form-control mt-2"
                placeholder="Full Name"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
              <input
                className="form-control mt-2"
                placeholder="Phone"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
              />
              <input
                type="password"
                className="form-control mt-2"
                placeholder="Password"
                value={profile.password}
                onChange={(e) =>
                  setProfile({ ...profile, password: e.target.value })
                }
              />
              <button className="btn btn-dark mt-3 w-100" onClick={saveProfile}>
                Save Profile
              </button>
            </div>

            {/* VEHICLE */}
            <div className="card p-3 mb-3 shadow-sm">
              <h5>Vehicle Details</h5>
              <input
                className="form-control mt-2"
                placeholder="Car Name"
                value={vehicle.carName}
                onChange={(e) =>
                  setVehicle({ ...vehicle, carName: e.target.value })
                }
              />
              <input
                className="form-control mt-2"
                placeholder="Car Type (Sedan, SUV)"
                value={vehicle.carType}
                onChange={(e) =>
                  setVehicle({ ...vehicle, carType: e.target.value })
                }
              />
              <input
                className="form-control mt-2"
                placeholder="Seating Capacity"
                value={vehicle.seats}
                onChange={(e) =>
                  setVehicle({ ...vehicle, seats: e.target.value })
                }
              />
              <input
                className="form-control mt-2"
                placeholder="Number Plate"
                value={vehicle.plate}
                onChange={(e) =>
                  setVehicle({ ...vehicle, plate: e.target.value })
                }
              />
              <button className="btn btn-warning mt-3 w-100" onClick={saveVehicle}>
                Save Vehicle
              </button>
            </div>
          </div>


          <div className="col-md-8">

            {/* ACTIVE RIDE */}
            {activeRide && (
              <div className="card p-3 mb-3 shadow-sm border-primary">
                <h5 className="text-primary fw-bold">🚖 Active Ride</h5>
                <div className="fw-bold fs-5">
                  {activeRide.pickupLocation} → {activeRide.dropLocation}
                </div>
                <div className="text-muted">
                  ₹{activeRide.fare} • {activeRide.distance} km
                </div>
                <div className="mt-3">
                  <button className="btn btn-primary w-100" onClick={() => completeRide(activeRide)}>
                    ✅ Complete Ride
                  </button>
                </div>
              </div>
            )}

            {/* RIDE REQUESTS */}
            <div className="card p-3 mb-3 shadow-sm">
              <h5>Ride Requests</h5>

              {requests.length === 0 && (
                <p className="text-muted mt-2">No new requests</p>
              )}

              {requests.map((r) => (
                <div key={r.id} className="card p-3 mt-2 border">
                  <div className="fw-bold">
                    {r.pickup} → {r.dest}
                  </div>
                  <div className="text-muted small">
                    {r.distance} km • ₹{r.fare}
                  </div>

                  <div className="mt-2 d-flex gap-2">
                    <button className="btn btn-success" onClick={() => acceptRide(r)}>
                      Accept
                    </button>
                    <button className="btn btn-danger" onClick={() => rejectRide(r)}>
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="card p-3 mb-3">
              <h5 className="fw-bold">Driver Tools</h5>
              <Link to="/driver/earnings" className="btn btn-dark w-100 mb-2">📊 Earnings</Link>
              <Link to="/driver/shifts" className="btn btn-outline-dark w-100">🗓 Shift Scheduler</Link>
            </div>


            {/* HISTORY */}
            <div className="card p-3 shadow-sm">
              <h5>Ride History</h5>

              {history.length === 0 && (
                <p className="text-muted">No rides completed</p>
              )}

              {history.map((h, i) => (
                <div key={i} className="card p-2 mt-2 border">
                  <div className="fw-bold">
                    {h.pickup} → {h.dest}
                  </div>
                  <div className="text-muted small">
                    ₹{h.fare} • {h.date}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
