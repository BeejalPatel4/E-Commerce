

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ProfileManu = () => {
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const role = userInfo ? userInfo.role : 0;

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className="bg-white rounded-4 shadow-sm p-4"
      style={{
        minHeight: "250px",
        border: "1px solid #eee",
      }}
    >
      <h5 className="mb-3 text-center fw-bold text-primary">⚙️ Account Menu</h5>
      {role == 1 ? (
        <ul className="list-group mb-4">
          <li className="list-group-item">
            <Link
              to="/admin/profile"
              className="text-decoration-none text-dark fw-semibold"
            >
              👤 Profile
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/admin/category"
              className="text-decoration-none text-dark fw-semibold"
            >
             🗂️  categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/admin/product"
              className="text-decoration-none text-dark fw-semibold"
            >
             🧾  Products List
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/admin/order"
              className="text-decoration-none text-dark fw-semibold"
            >
              📦 Orders
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="list-group mb-4">
          <li className="list-group-item">
            <Link
              to="/profile"
              className="text-decoration-none text-dark fw-semibold"
            >
              👤 Profile
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/order"
              className="text-decoration-none text-dark fw-semibold"
            >
              📦 Orders
            </Link>
          </li>
        </ul>
      )}
      <button
        className="btn w-100"
        style={{
          background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
          transition: "transform 0.2s ease",
          padding: "10px 20px",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        onClick={handleLogout}
      >
        🔓 Logout
      </button>
    </div>
  );
};

export default ProfileManu;
