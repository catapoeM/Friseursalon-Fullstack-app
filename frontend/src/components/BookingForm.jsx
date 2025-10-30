import { useState } from "react";
import {parsePhoneNumberFromString} from 'libphonenumber-js';

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
      <input name="phone" placeholder="+43 123 45 67 89 09" value={formData.phone} onChange={handleChange}/>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
      <input name="service" placeholder="Service" value={formData.service} onChange={handleChange} />
      <input name="date" type="date" value={formData.date} onChange={handleChange} />
      <input name="time" type="time" value={formData.time} onChange={handleChange} />
      <button type="submit">Buchen</button>
    </form>
  );
}
