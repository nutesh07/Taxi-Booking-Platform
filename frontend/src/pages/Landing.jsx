import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Landing(){
  return (
    <>
      <Navbar />
      <header className="bg-dark text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-5 fw-bold">Move your way — fast & safe</h1>
              <p className="lead my-4">Book a ride in seconds. Affordable fares, trusted drivers.</p>

              <div className="card p-3 w-100" style={{maxWidth: 560}}>
                <div className="mb-2">
                  <input className="form-control" placeholder="Pickup location" />
                </div>
                <div className="mb-3">
                  <input className="form-control" placeholder="Destination" />
                </div>
                <div className="d-grid">
                  <Link className="btn btn-warning fw-bold" to="/booking">Search Rides</Link>
                </div>
              </div>
            </div>

            <div className="col-md-6 text-center mt-4 mt-md-0">
              <img src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1344/height=896/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9hM2NmODU2NC1lMmE2LTQxOGMtYjliMC02NWRkMjg1YzEwMGIuanBn" alt="cab" className="img-fluid rounded" />
            </div>
          </div>
        </div>
      </header>

      <section className="container py-5">
        <div className="row">
          <div className="col-md-4">
            <h5>Trusted drivers</h5>
            <p className="text-muted">All drivers are verified for smoother rides.</p>
          </div>
          <div className="col-md-4">
            <h5>24/7 support</h5>
            <p className="text-muted">Contact us anytime for help.</p>
          </div>
          <div className="col-md-4">
            <h5>Secure payments</h5>
            <p className="text-muted">Pay via card, UPI or cash.</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
