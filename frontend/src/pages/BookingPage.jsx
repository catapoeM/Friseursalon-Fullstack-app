import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import BookingForm from "../components/BookingForm";
import BookingList from "../components/BookingList";

const socket = io("http://localhost:5000"); // Backend-URL

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Initiale Buchungen laden
    socket.on("loadBookings", (data) => setBookings(data));

    // Neue Buchungen in Echtzeit
    socket.on("bookingUpdated", (newBooking) =>
      setBookings((prev) => [...prev, newBooking])
    );

    // Cleanup
    return () => {
      socket.off("loadBookings");
      socket.off("bookingUpdated");
    };
  }, []);

  const handleNewBooking = (bookingData) => {
    socket.emit("newBooking", bookingData);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>💈 Online Booking</h1>
      <BookingForm onBooking={handleNewBooking} />
      <BookingList bookings={bookings} />
    </div>
  );
}

export default BookingPage;