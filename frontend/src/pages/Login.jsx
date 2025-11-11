import React, { useState } from "react";
import { sendLoginLink } from "../services/authServices.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendLoginLink(email);
      setStatus("Link gesendet! Überürüfe dein E-mail-Postfach");
    } catch (error) {
      console.error(error);
      setStatus("Fehler beim Senden des Links.");
    }
  }
  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-3">Login per E-Mail</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-Mail-Adresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 w-full rounded mb-3"
        />
        <button className="bg-blue-600 text-white p-2 w-full rounded">
          Link senden
        </button>
      </form>
      {status && <p className="mt-3 text-sm">{status}</p>}
    </div>
  );
}