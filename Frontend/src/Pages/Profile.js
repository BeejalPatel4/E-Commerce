
import React, { useEffect, useState } from "react";
import ProfileManu from "../Module/Componete/ProfileManu";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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

        {user ? (
          <>
            <div className="text-center mb-5">
              <h1 style={{ fontWeight: "bold", color: "#333", fontSize: "2.5rem" }}>
                👤 Wellcome {user.name}
              </h1>
              <p className="text-muted" style={{ fontSize: "1.2rem" }}>
                Manage your account and preferences
              </p>
            </div>
          </>
        ) :
          (
            <p style={{ fontSize: "1.1rem" }}>Loading user details...</p>

          )}


        <div className="row">
          <div className="col-lg-3 col-md-4 mb-4 mb-md-0">
            <ProfileManu />
          </div>

          <div className="col-lg-9 col-md-8">
            <div
              className="p-5 rounded-4"
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              {user ? (
                <>
                  <h3 className="mb-4" style={{ fontSize: "1.8rem" }}>
                    Hello, <span className="text-warning">{user.name}</span> 👋
                  </h3>
                  <p style={{ fontSize: "1.1rem" }}>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p style={{ fontSize: "1.1rem" }}>
                    <strong>Member Since:</strong>{" "}
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </>
              ) : (
                <p style={{ fontSize: "1.1rem" }}>Loading user details...</p>
              )}

              <button
                className="btn mt-4"
                style={{
                  background: "#fff",
                  color: "#764ba2",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s ease",
                  padding: "12px 24px",
                  fontSize: "1rem",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                ✏️ Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
