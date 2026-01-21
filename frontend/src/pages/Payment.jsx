import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/axios";

export default function Payment(){
  const [params] = useSearchParams();
  const bookingId = params.get("bookingId");
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(()=>{
    
    async function load() {
      try {
        const res = await api.get(`/bookings/${bookingId}`);
        setAmount(res.data.fare);
      } catch {
        setAmount(150); 
      }
    }
    if (bookingId) load();
  }, [bookingId]);

  async function pay(e) {
    e.preventDefault();
    try {
    
      await api.post(`/payments`, { bookingId, method: "card" });
      alert("Payment successful");
      navigate("/dashboard");
    } catch {
      alert("Payment failed (demo)");
      navigate("/dashboard");
    }
  }

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4">
              <h4 className="mb-3">Complete Payment</h4>
              <p>Booking: <strong>{bookingId}</strong></p>
              <h2 className="fw-bold">{amount} ₹</h2>
              <form onSubmit={pay}>
                <div className="mb-3">
                  <input className="form-control" placeholder="Card number" required />
                </div>
                <div className="row">
                  <div className="col"><input className="form-control" placeholder="MM/YY" required /></div>
                  <div className="col"><input className="form-control" placeholder="CVC" required /></div>
                </div>
                <div className="d-grid mt-3">
                  <button className="btn btn-success">Pay Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
