import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const reqObj = {
        email: data.email,
        password: data.password,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/api/user/login`,
        reqObj
      );

      if (response && response.data) {
        const { userInfo, token } = response.data.data;

        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        localStorage.setItem("token", token.token);
        navigation("/profile");
      }
    } catch (error) {
      alert("Error,Please try again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isLoggin = localStorage.getItem("token") ? true : false;

    if (isLoggin) {
      navigation("/profile");
    }
  }, []);

  return (
    <div
      className="my-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div
        className="p-4 bg-white rounded-4 shadow-lg"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <h1>Login</h1>
        </div>

        {loading && (
          <div className="d-flex justify-content-center mb-3">
            <div className="spinner-grow text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <form className="mx-auto" style={{ width: "100%" }}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              name="email"
              type="email"
              value={data.email}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              name="password"
              type="password"
              value={data.password}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="btn px-4"
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              onClick={submitForm}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
