export default function BookingList({ bookings }) {
  if (bookings.length === 0) return <p style={{ textAlign: "center" }}>Keine Buchungen vorhanden</p>;

  return (
    <div>
      {bookings.map((b) => (
        <div key={b._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p><strong>{b.name}</strong> – {b.service}</p>
          <p>{b.date} um {b.time}</p>
        </div>
      ))}
    </div>
  );
}
