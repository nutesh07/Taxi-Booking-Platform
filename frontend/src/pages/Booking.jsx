import React, { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import mapboxgl from "mapbox-gl";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Booking.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";

/* Utility distance calc */
function toKm([lat1, lon1], [lat2, lon2]) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* Ride options */
const RIDE_TYPES = [
  { id: "mini", name: "Mini", multiplier: 1.0, ratePerKm: 12, icon: "mini" },
  { id: "sedan", name: "Sedan", multiplier: 1.4, ratePerKm: 14, icon: "sedan" },
  { id: "prime", name: "Prime SUV", multiplier: 1.8, ratePerKm: 18, icon: "suv" },
  { id: "economy", name: "Economy", multiplier: 0.9, ratePerKm: 10, icon: "economy" },
  { id: "luxury", name: "Luxury", multiplier: 3.5, ratePerKm: 35, icon: "lux" },
  { id: "rentals", name: "Rentals (1 hr)", multiplier: 5.0, ratePerKm: 50, icon: "rentals" },
];



export default function Booking() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  const [pickupText, setPickupText] = useState("");
  const [destText, setDestText] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);
  const [rideOptions, setRideOptions] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [chosenRide, setChosenRide] = useState(null);
  const [chosenDriver, setChosenDriver] = useState(null);
  const [availableDrivers, setAvailableDrivers] = useState([]);

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Fetch available drivers
    api.get("/drivers/available")
      .then(res => setAvailableDrivers(res.data))
      .catch(err => console.error("Failed to fetch drivers", err));
  }, []);

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [72.8777, 19.076],
      zoom: 12,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");
  }, []);

  /* Reverse geocode */
  async function reverseGeocode([lng, lat]) {
    const token = process.env.REACT_APP_MAPBOX_TOKEN;
    if (!token) return "Current location";
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}&limit=1`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.features?.length) return data.features[0].place_name;
    } catch { }
    return "Current location";
  }

  /* Use current location */
  const useCurrentLocationForPickup = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported.");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords = [pos.coords.longitude, pos.coords.latitude];
        setPickupCoords(coords);
        const address = await reverseGeocode(coords);
        setPickupText(address);
        mapRef.current.flyTo({ center: coords, zoom: 14 });
      },
      () => alert("Location permission denied")
    );
  };

  /* Forward geocode */
  async function forwardGeocode(text) {
    const token = process.env.REACT_APP_MAPBOX_TOKEN;
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(text)}.json?access_token=${token}&limit=1`;
      const res = await fetch(url);
      const data = await res.json();
      return data.features?.length ? data.features[0].center : null;
    } catch { }
    return null;
  }

  const onPickupBlur = async () => {
    if (!pickupText) return;
    const coords = await forwardGeocode(pickupText);
    if (!coords) return alert("Pickup not found");
    setPickupCoords(coords);
    mapRef.current.flyTo({ center: coords, zoom: 14 });
  };

  const onDestBlur = async () => {
    if (!destText) return;
    const coords = await forwardGeocode(destText);
    if (!coords) return alert("Destination not found");
    setDestCoords(coords);
  };


  const handleSearchRides = () => {
    if (!pickupCoords || !destCoords) return alert("Set pickup & destination");

    const distance = toKm([pickupCoords[1], pickupCoords[0]], [destCoords[1], destCoords[0]]);
    const dist = Math.max(1, distance.toFixed(1));

    const options = RIDE_TYPES.map((r) => ({
      ...r,
      dist,
      eta: Math.floor(Math.random() * 8) + 2,
      fare: Math.floor((30 + dist * 12) * r.multiplier),
    }));

    setRideOptions(options);

    const bounds = new mapboxgl.LngLatBounds();
    bounds.extend(pickupCoords);
    bounds.extend(destCoords);
    mapRef.current.fitBounds(bounds, { padding: 80 });
  };

  /* Create Booking */
  async function createBooking(paymentMethod) {
    if (!chosenRide || !chosenDriver) return;

    try {
      await api.post("/bookings/create", {
        pickupLocation: pickupText,
        dropLocation: destText,
        distance: chosenRide.dist,
        fare: chosenRide.fare,
        paymentMethod: paymentMethod,
        driverId: chosenDriver.id
      });

      setShowModal(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3500);
    } catch (err) {
      alert("Booking failed: " + (err.response?.data?.message || err.message));
    }
  }

  /* Razorpay */
  function payWithRazorpay(amount) {
    const options = {
      key: "rzp_test_RliP4yu4TsCM7I",
      amount: amount * 100,
      currency: "INR",
      name: "CabX Ride Payment",
      handler: () => createBooking("ONLINE"),
      theme: { color: "#000" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  /* same popup for cash + online */
  function showSuccessPopup() {
    createBooking("CASH");
  }

  const openRideModal = (r) => {
    if (availableDrivers.length === 0) {
      return alert("No drivers available nearby!");
    }
    // ALWAYS pick the first driver (Single Driver Mode)
    const driver = availableDrivers[0];
    setChosenRide(r);
    setChosenDriver(driver);
    setShowModal(true);
  };

  return (
    <>
      <Navbar />

      <div className="container py-4">
        <div className="row gx-0">

          {/* MAP */}
          <div className="col-md-7">
            <div className="map-holder">
              <div ref={mapContainer} className="mapbox-map"></div>
            </div>
          </div>


          <div className="col-md-5 p-4">
            <h4 className="mb-3">Where to?</h4>

            <div className="pickup-wrapper mb-3">
              <input
                className="form-control pickup-input"
                placeholder="Pickup location"
                value={pickupText}
                onChange={(e) => setPickupText(e.target.value)}
                onBlur={onPickupBlur}
              />
              <button className="pickup-loc-btn" onClick={useCurrentLocationForPickup}>
                <ion-icon name="locate-outline"></ion-icon>
              </button>
            </div>

            <input
              className="form-control mb-3"
              placeholder="Destination"
              value={destText}
              onChange={(e) => setDestText(e.target.value)}
              onBlur={onDestBlur}
            />

            <button className="btn btn-dark w-100 mb-3" onClick={handleSearchRides}>
              Search Rides
            </button>

            {rideOptions.map((r) => (
              <div key={r.id} className="ride-card" onClick={() => openRideModal(r)}>
                <RideIcon />
                <div className="mx-3 flex-grow-1">
                  <div className="fw-bold">{r.name}</div>
                  <div className="text-muted small">{r.eta} min • {r.dist} km</div>
                </div>
                <div className="fw-bold">₹ {r.fare}</div>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className={`bottom-sheet ${showModal ? "open" : ""}`}>
        {chosenRide && chosenDriver && (
          <div className="sheet-card">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>{chosenDriver.name}</h5>
                <div className="small text-muted">
                  {chosenDriver.vehicle} • {chosenDriver.plate}
                </div>
              </div>
              <h4>₹ {chosenRide.fare}</h4>
            </div>

            <div className="mt-3">
              <div><strong>ETA:</strong> {chosenRide.eta} min</div>
              <div><strong>Rating:</strong> {chosenDriver.rating} ★</div>
              <div><strong>Phone:</strong> {chosenDriver.phone}</div>
            </div>

            <button
              className="btn btn-dark w-100 mt-3"
              onClick={() => payWithRazorpay(chosenRide.fare)}
            >
              Pay Online
            </button>

            <button
              className="btn btn-outline-dark w-100 mt-2"
              onClick={showSuccessPopup}
            >
              Cash Payment
            </button>

            <button className="btn btn-link w-100" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>


      {showSuccess && (
        <div className="success-popup">
          <div className="success-card">
            <div className="car-animation">🚕</div>

            <h4 className="success-title">Ride Confirmed!</h4>
            <p className="success-msg">Your driver is on the way...</p>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}


function RideIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24">
      <rect x="3" y="7" width="18" height="8" rx="2" fill="#111" />
    </svg>
  );
}
