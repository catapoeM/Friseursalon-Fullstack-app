import { useState } from "react";
import {parsePhoneNumberFromString} from 'libphonenumber-js';
import BookingDatePicker from "./BookingDatePicker";

export default function BookingForm({ onBooking }) {
  const [formData, setFormData] = useState({ name: "", service: "", date: "", time: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneNumber = parsePhoneNumberFromString(formData.phone, "AT");

    if (!phoneNumber || !phoneNumber.isValid()) {
      alert("Bitte eine gültige Telefonnummer eingeben!");
      return;
    }

    onBooking(formData);
    setFormData({ name: "", phone:"", service: "", date: "", time: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input name="phone" placeholder="+43 123 45 67 89 09" value={formData.phone} onChange={handleChange} required="true"/>
      <input name="firstName" placeholder="Vorname" value={formData.firstName} onChange={handleChange} required="true"/>
      <input name="lastName" placeholder="Nachname" value={formData.lastName} onChange={handleChange} required="true"/>
      <input name="service" placeholder="Service" value={formData.service} onChange={handleChange} required="true"/>
      <BookingDatePicker
        onChange={(date) =>
          setFormData({ ...formData, date: date.toISOString().split("T")[0] })
        }
      required="true"/>
      <input name="time" type="time" value={formData.time} onChange={handleChange} required="true"/>
      <button type="submit">Buchen</button>
    </form>
  );
}
