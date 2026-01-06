import React, { useState } from "react";
import { QRCodeSVG } from 'qrcode.react';
import "../register.css";
import regImage from "../assets/registerPage.png";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    cnic: "",
    phone: ""
  });

  const [qrToken, setQrToken] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message);
      return;
    }

    setQrToken(data.qr_token);
    setMessage("Visitor registered successfully");
    setForm({ name: "", cnic: "", phone: "" });
  };

  return (
    <>
      <section className="page-section">
        <div className="form-image-container">
          <div className="left-image">
            <img src={regImage} alt="Visitor" />
          </div>

          <div className="right-form">
            <h2>Visitor Registration</h2>

            <form onSubmit={handleSubmit}>
              <label>Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <label>CNIC</label>
              <input
                name="cnic"
                value={form.cnic}
                onChange={handleChange}
                required
              />

              <label>Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <button type="submit">Submit & Generate QR</button>
            </form>

            {message && <p>{message}</p>}

            {qrToken && (
                <QRCodeSVG value={qrToken} size={200} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
