// frontend/src/App.js
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Pages
import AddCustomer from "./pages/AddCustomer";
import CreateOrder from "./pages/CreateOrder";
import OrderList from "./pages/OrderList";
import CustomerList from "./pages/CustomerList";

// Icons
import { FaUserPlus, FaPlusCircle, FaListAlt, FaUsers } from "react-icons/fa";

export default function App() {
  return (
    <BrowserRouter>
      <div className="d-flex" style={{ minHeight: "100vh" }}>

        {/* ------------------ SIDEBAR ------------------ */}
        <div
          style={{
            width: "240px",
            backgroundColor: "#1f1f1f",
            padding: "20px",
            borderRight: "1px solid #333",
          }}
        >
          <h3 className="text-white mb-4">Laundry System</h3>

          <div className="nav flex-column">

            {/* Add Customer */}
            <Link
              to="/"
              className="nav-link text-light mb-3 d-flex align-items-center"
            >
              <FaUserPlus className="me-2" /> Add Customer
            </Link>

            {/* Create Order */}
            <Link
              to="/create-order"
              className="nav-link text-light mb-3 d-flex align-items-center"
            >
              <FaPlusCircle className="me-2" /> Create Order
            </Link>

            {/* Orders */}
            <Link
              to="/orders"
              className="nav-link text-light mb-3 d-flex align-items-center"
            >
              <FaListAlt className="me-2" /> Orders
            </Link>

            {/* ⭐ NEW — Customers List Page */}
            <Link
              to="/customers"
              className="nav-link text-light mb-3 d-flex align-items-center"
            >
              <FaUsers className="me-2" /> Customers
            </Link>

          </div>
        </div>

        {/* ------------------ MAIN CONTENT AREA ------------------ */}
        <div className="container mt-4" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<AddCustomer />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/orders" element={<OrderList />} />

            {/*  Customer list route */}
            <Route path="/customers" element={<CustomerList />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}
