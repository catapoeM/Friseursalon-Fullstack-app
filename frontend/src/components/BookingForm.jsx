import { useState } from "react";

export default function BookingForm({ onBooking }) {
  const [formData, setFormData] = useState({ name: "", service: "", date: "", time: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onBooking(formData);
    setFormData({ name: "", service: "", date: "", time: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
      <input name="service" placeholder="Service" value={formData.service} onChange={handleChange} />
      <input name="date" type="date" value={formData.date} onChange={handleChange} />
      <input name="time" type="time" value={formData.time} onChange={handleChange} />
      <button type="submit">Buchen</button>
    </form>
  );
}
