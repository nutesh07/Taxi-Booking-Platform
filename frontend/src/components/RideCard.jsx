export default function RideCard({ ride, onSelect }) {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title mb-1">{ride.type} • {ride.eta} min</h5>
          <p className="mb-0 text-muted">{ride.fare} ₹ • {ride.driverName || "Driver TBD"}</p>
        </div>
        <button className="btn btn-primary" onClick={() => onSelect(ride)}>Select</button>
      </div>
    </div>
  );
}
