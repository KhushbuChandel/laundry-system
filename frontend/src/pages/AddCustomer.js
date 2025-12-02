// frontend/src/pages/AddCustomer.js
import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";

export default function AddCustomer() {
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [msg, setMsg] = useState("");

  // Add customer
  const submit = async () => {
    const res = await fetch(
      "https://laundry-system-backend-production.up.railway.app/customers/add",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();
    setMsg(data.message);

    // Reset form
    setForm({ name: "", phone: "", address: "" });
  };

  return (
    <div
      className="card p-4 shadow-lg border-0"
      style={{ backgroundColor: "#1e1e1e", color: "white" }}
    >
      <h3 className="mb-4">
        <FaUserPlus className="me-2" /> Add Customer
      </h3>

      {/* Customer Form */}
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          className="form-control"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          className="form-control"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Address</label>
        <input
          className="form-control"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
      </div>

      <button className="btn btn-primary w-100" onClick={submit}>
        Add Customer
      </button>

      {msg && <p className="mt-3 alert alert-success">{msg}</p>}
    </div>
  );
}
