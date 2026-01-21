import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSearchParams } from "react-router-dom";

export default function MapPage(){
  const [params] = useSearchParams();
  const pickup = params.get("pickup") || "Mumbai";
  const dest = params.get("dest") || "Pune";

  
  const pickupPos = [19.0760,72.8777];
  const destPos = [18.5204,73.8567];

  useEffect(()=>{}, [pickup, dest]);

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <h4 className="mb-3">Map</h4>
        <div style={{height: "70vh"}}>
          <MapContainer center={pickupPos} zoom={6} style={{height:"100%", width:"100%"}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={pickupPos}><Popup>Pickup: {pickup}</Popup></Marker>
            <Marker position={destPos}><Popup>Dest: {dest}</Popup></Marker>
          </MapContainer>
        </div>
      </div>
      <Footer />
    </>
  );
}
