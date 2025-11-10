export default function BookingList({ bookings }) {
  if (bookings.length === 0) return <p style={{ textAlign: "center" }}>Keine Buchungen vorhanden</p>;

  return (
    <ul>
      {bookings.map((booking) => {
        const date = new Date(booking.createdAt);
        const formatted = date.toLocaleString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        return (
          <div key={booking._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p><strong>{booking.firstName} {booking.lastName}</strong> – {booking.service}</p>
          <p>{booking.date} um {booking.time}</p>
          <p>{booking.name} - erstellt am: {formatted}</p>
        </div>
        );
      })}
    </ul>
  );
}