import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";



export default function DashboardAdmin() {
  const [drivers, setDrivers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);

  const [tab, setTab] = useState("overview");

  
  const [modalData, setModalData] = useState({});

  React.useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 50000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = () => {
    import("../api/axios").then(module => {
      const api = module.default;

      
      api.get("/admin/drivers")
        .then(res => setDrivers(res.data))
        .catch(err => console.error(err));

      // Fetch Bookings
      api.get("/admin/bookings")
        .then(res => setBookings(res.data))
        .catch(err => console.error(err));
    });
  };



  const openModal = (type, data = {}) => {
    setModalData({ type, ...data });
    new window.bootstrap.Modal(document.getElementById("adminModal")).show();
  };

  const handleDriverSave = (e) => {
    e.preventDefault();
    if (modalData.id) {
      setDrivers(drivers.map(d => (d.id === modalData.id ? modalData : d)));
    } else {
      setDrivers([...drivers, { ...modalData, id: drivers.length + 1 }]);
    }
    window.bootstrap.Modal.getInstance(document.getElementById("adminModal")).hide();
  };

  const deleteDriver = (id) => {
    if (window.confirm("Delete driver?")) {
      setDrivers(drivers.filter(d => d.id !== id));
    }
  };

  const confirmBooking = (id) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: "CONFIRMED" } : b));
  };

  const cancelBooking = (id) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: "CANCELLED" } : b));
  };

  return (
    <>
      <Navbar />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <aside className="border-end p-3" style={{ width: 250, background: "#fff" }}>
          <h5 className="fw-bold mb-3">Admin Panel</h5>
          <button className={`btn w-100 mb-2 ${tab === "overview" ? "btn-dark" : "btn-light"}`} onClick={() => setTab("overview")}>Overview</button>
          <button className={`btn w-100 mb-2 ${tab === "drivers" ? "btn-dark" : "btn-light"}`} onClick={() => setTab("drivers")}>Drivers</button>
          <button className={`btn w-100 mb-2 ${tab === "taxis" ? "btn-dark" : "btn-light"}`} onClick={() => setTab("taxis")}>Taxis</button>
          <button className={`btn w-100 mb-2 ${tab === "bookings" ? "btn-dark" : "btn-light"}`} onClick={() => setTab("bookings")}>Bookings</button>
          <button className={`btn w-100 mb-2 ${tab === "payments" ? "btn-dark" : "btn-light"}`} onClick={() => setTab("payments")}>Payments</button>
        </aside>

        {/* Main Panel */}
        <main className="flex-grow-1 p-4">

          {/* Overview */}
          {tab === "overview" && (
            <>
              <h3>Dashboard Overview</h3>

              <div className="row mt-4">
                <div className="col-md-3 mb-3">
                  <div className="card p-3 shadow-sm">
                    <small>Total Drivers</small>
                    <h4>{drivers.length}</h4>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card p-3 shadow-sm">
                    <small>Total Bookings</small>
                    <h4>{bookings.length}</h4>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card p-3 shadow-sm">
                    <small>Active Rides</small>
                    <h4>{bookings.filter(b => b.status === "REQUESTED" || b.status === "CONFIRMED").length}</h4>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card p-3 shadow-sm">
                    <small>Payments</small>
                    <h4>{payments.length}</h4>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Drivers */}
          {tab === "drivers" && (
            <>
              <div className="d-flex justify-content-between">
                <h3>Drivers</h3>
                <button className="btn btn-dark" onClick={() => openModal("addDriver")}>Add Driver</button>
              </div>

              <table className="table mt-3 table-hover">
                <thead>
                  <tr>
                    <th>ID</th><th>Name</th><th>Phone</th><th>Rating</th><th>Status</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers.map(d => (
                    <tr key={d.id}>
                      <td>{d.id}</td>
                      <td>{d.name}</td>
                      <td>{d.phone}</td>
                      <td>{d.rating}</td>
                      <td>{d.status}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => openModal("editDriver", d)}>Edit</button>
                        <button className="btn btn-sm btn-danger" onClick={() => deleteDriver(d.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {/* Bookings */}
          {tab === "bookings" && (
            <>
              <h3>Bookings</h3>
              <table className="table mt-3 table-hover">
                <thead><tr><th>ID</th><th>User</th><th>Route</th><th>Fare</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b.id}>
                      <td>{b.id}</td>
                      <td>{b.userName}</td>
                      <td>{b.pickup} → {b.dest}</td>
                      <td>{b.fare}</td>
                      <td>{b.status}</td>
                      <td>
                        {b.status !== "CONFIRMED" && (
                          <button className="btn btn-sm btn-success me-2" onClick={() => confirmBooking(b.id)}>Confirm</button>
                        )}
                        {b.status !== "CANCELLED" && (
                          <button className="btn btn-sm btn-danger" onClick={() => cancelBooking(b.id)}>Cancel</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {/* Payments */}
          {tab === "payments" && (
            <>
              <h3>Payments</h3>
              <table className="table mt-3 table-hover">
                <thead><tr><th>ID</th><th>Booking</th><th>Amount</th><th>Method</th><th>Date</th></tr></thead>
                <tbody>
                  {payments.map(p => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.bookingId}</td>
                      <td>{p.amount} ₹</td>
                      <td>{p.method}</td>
                      <td>{p.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

        </main>
      </div>

      {/* CRUD Modal */}
      <div className="modal fade" id="adminModal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalData.type === "editDriver" ? "Edit Driver" : "Add Driver"}</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <form onSubmit={handleDriverSave}>
              <div className="modal-body">

                <label>Name</label>
                <input className="form-control mb-2"
                  value={modalData.name || ""}
                  onChange={e => setModalData({ ...modalData, name: e.target.value })} />

                <label>Phone</label>
                <input className="form-control mb-2"
                  value={modalData.phone || ""}
                  onChange={e => setModalData({ ...modalData, phone: e.target.value })} />

                <label>Rating</label>
                <input type="number" min="0" max="5" step="0.1" className="form-control mb-2"
                  value={modalData.rating || 0}
                  onChange={e => setModalData({ ...modalData, rating: e.target.value })} />

              </div>

              <div className="modal-footer">
                <button className="btn btn-dark" type="submit">Save</button>
              </div>
            </form>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
