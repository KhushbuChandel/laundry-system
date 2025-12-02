import { useEffect, useState } from "react";
import { FaUsers, FaPhone, FaMapMarkerAlt, FaEdit, FaTrash } from "react-icons/fa";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const API_BASE = "https://laundry-system-backend-production.up.railway.app";

  // Load all customers
  const loadCustomers = () => {
    fetch(`${API_BASE}/customers/list`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCustomers(data.data);
      });
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  // Search Customer
  const handleSearch = async () => {
    if (!search.trim()) {
      loadCustomers();
      return;
    }

    const res = await fetch(
      `${API_BASE}/customers/search?q=${encodeURIComponent(search)}`
    );

    const data = await res.json();

    if (data.success) {
      setCustomers(data.data);
    } else {
      alert(data.message);
    }
  };

  // Delete customer
  const deleteCustomer = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
    if (!confirmDelete) return;

    const res = await fetch(`${API_BASE}/customers/delete/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!data.success) {
      setErrorMsg(data.message);
      return;
    }

    setErrorMsg("");
    loadCustomers();
  };

  // Edit customer
  const editCustomer = async (c) => {
    const name = prompt("Enter Name", c.name);
    const phone = prompt("Enter Phone", c.phone);
    const address = prompt("Enter Address", c.address);

    if (!name || !phone) {
      alert("Name & Phone are required");
      return;
    }

    await fetch(`${API_BASE}/customers/update/${c.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, address }),
    });

    loadCustomers();
  };

  return (
    <div className="card p-4 shadow-lg border-0" style={{ background: "#1e1e1e", color: "#fff" }}>
      <h3 className="mb-4">
        <FaUsers className="me-2" /> Customers
      </h3>

      {/* Search Bar */}
      <div className="d-flex mb-4 gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => {
            setSearch("");
            loadCustomers();
          }}
        >
          Reset
        </button>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="alert alert-danger text-dark fw-bold">{errorMsg}</div>
      )}

      {/* Customer List */}
      {customers.length === 0 && <p>No customers found.</p>}

      {customers.map((c) => (
        <div key={c.id} className="card p-3 mb-3" style={{ background: "#262626" }}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1">{c.name}</h5>

              <p className="mb-1">
                <FaPhone className="me-2 text-info" />
                {c.phone}
              </p>

              <p className="mb-1">
                <FaMapMarkerAlt className="me-2 text-warning" />
                {c.address}
              </p>
            </div>

            <div>
              <button
                className="btn btn-warning me-2"
                onClick={() => editCustomer(c)}
              >
                <FaEdit className="me-1" /> Edit
              </button>

              <button
                className="btn btn-danger"
                onClick={() => deleteCustomer(c.id)}
              >
                <FaTrash className="me-1" /> Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
