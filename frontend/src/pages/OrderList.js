// frontend/src/pages/OrderList.js
import { useEffect, useState } from "react";
import { FaClipboardList, FaCheckCircle, FaClock, FaBox } from "react-icons/fa";

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  const API_BASE = "https://laundry-system-backend-production.up.railway.app";

  const loadOrders = () => {
    fetch(`${API_BASE}/orders/list`)
      .then((res) => res.json())
      .then((data) => setOrders(data.data || []));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, newStatus) => {
    await fetch(`${API_BASE}/orders/status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    loadOrders();
  };

  // Delete order
  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    const res = await fetch(`${API_BASE}/orders/delete/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    console.log("Delete response:", data);

    loadOrders(); // refresh list
  };

  // Edit order (prompt interface)
  const updateOrder = async (id) => {
    const service = prompt("Enter new service name:");
    if (!service) return alert("Service name required");

    const qty = prompt("Enter new quantity:");
    if (!qty || Number(qty) < 1) return alert("Quantity must be >= 1");

    await fetch(`${API_BASE}/orders/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service_name: service, quantity: Number(qty) }),
    });

    loadOrders();
  };

  return (
    <div>
      <h3 className="mb-4 text-white">
        <FaClipboardList className="me-2" /> Orders
      </h3>

      {orders.length === 0 && <p>No orders found.</p>}

      {orders.map((o) => (
        <div
          key={o.id}
          className="card p-4 shadow-lg mb-3 border-0"
          style={{ backgroundColor: "#1e1e1e", color: "white" }}
        >
          <div className="d-flex justify-content-between">
            <div>
              <h5 className="mb-1">{o.customer_name}</h5>
              <p className="mb-1">
                <b>Service:</b> {o.service_name}
              </p>
              <p className="mb-1">
                <b>Quantity:</b> {o.quantity}
              </p>

              <p className="mb-2">
                <b>Status:</b>
                {o.status === "Received" && (
                  <span className="badge bg-secondary ms-2">
                    <FaBox className="me-1" /> Received
                  </span>
                )}
                {o.status === "Processing" && (
                  <span className="badge bg-warning text-dark ms-2">
                    <FaClock className="me-1" /> Processing
                  </span>
                )}
                {o.status === "Completed" && (
                  <span className="badge bg-success ms-2">
                    <FaCheckCircle className="me-1" /> Completed
                  </span>
                )}
              </p>
            </div>

            <div className="text-end">
              <div className="mb-2">
                <select
                  className="form-select"
                  value={o.status}
                  onChange={(e) => updateStatus(o.id, e.target.value)}
                >
                  <option value={o.status}>{o.status}</option>
                  <option value="Received">Received</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => updateOrder(o.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteOrder(o.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
