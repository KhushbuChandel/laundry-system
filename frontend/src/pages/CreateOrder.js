// frontend/src/pages/CreateOrder.js
import { useEffect, useState } from "react";
import { FaFolderPlus } from "react-icons/fa";

export default function CreateOrder() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    customer_id: "",
    service_name: "",
    quantity: 1,
  });
  const [msg, setMsg] = useState("");

  const API_BASE = "https://laundry-system-backend-production.up.railway.app";

  useEffect(() => {
    fetch(`${API_BASE}/customers/list`)
      .then((res) => res.json())
      .then((data) => setCustomers(data.data || []));
  }, []);

  const submit = async () => {
    if (!form.customer_id) { alert("Select customer"); return; }
    if (!form.service_name) { alert("Enter service name"); return; }
    if (!form.quantity || Number(form.quantity) < 1) { alert("Quantity must be >= 1"); return; }

    const res = await fetch(`${API_BASE}/orders/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMsg(data.message);
    setForm({ customer_id: "", service_name: "", quantity: 1 });
  };

  return (
    <div className="card p-4 shadow-lg border-0" style={{ backgroundColor: "#1e1e1e", color: "white" }}>
      <h3 className="mb-4"><FaFolderPlus className="me-2" /> Create Order</h3>

      <div className="mb-3">
        <label className="form-label">Select Customer</label>
        <select className="form-select" value={form.customer_id}
          onChange={(e) => setForm({ ...form, customer_id: e.target.value })}>
          <option value="">Select Customer</option>
          {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Service Name</label>
        <input className="form-control" placeholder="e.g. Wash & Fold"
          value={form.service_name} onChange={(e) => setForm({ ...form, service_name: e.target.value })} />
      </div>

      <div className="mb-3">
        <label className="form-label">Quantity</label>
        <input type="number" min="1" className="form-control"
          value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
      </div>

      <button className="btn btn-success" onClick={submit}>Create Order</button>
      {msg && <p className="mt-3 alert alert-success">{msg}</p>}
    </div>
  );
}
