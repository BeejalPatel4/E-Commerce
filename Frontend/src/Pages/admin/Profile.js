import { Link } from "react-router-dom";
import ProfileManu from "../../Module/Componete/ProfileManu";
import { useEffect, useState } from "react";

const AdminProfile = () => {
  const adminName = "Beejal";


  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        padding: "60px 30px",
      }}
    >
      <div
        className="container bg-white rounded-4 shadow-lg p-5"
        style={{ maxWidth: "1200px", width: "100%" }}
      >
        <div className="text-center mb-5">
          <h1 style={{ fontWeight: "bold", color: "#333", fontSize: "2.5rem" }}>
            👤 Wellcome Admin {adminName}
          </h1>
          <p className="text-muted" style={{ fontSize: "1.2rem" }}>
            Manage your account and preferences
          </p>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 mb-4 mb-md-0">
            <ProfileManu />
          </div>
          <div className="col-md-9"></div>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <h5 className="card-title">🛒 Total Orders</h5>
               
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <h5 className="card-title">👤 Active Users</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <h5 className="card-title">💰 Revenue</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
    // </div>
  );
};
export default AdminProfile;
