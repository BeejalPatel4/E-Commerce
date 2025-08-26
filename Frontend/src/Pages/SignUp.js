import React, { useState,useEffect } from "react";
// import { Form } from "react-router-dom";
import axios from "axios";
import { Link ,useNavigate } from "react-router-dom";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [userInfo, setUserInfo] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const reqObj = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/api/user`,
        reqObj
      );
      if (response && response.data) {
        const user = response.data.data.user;
        setUserInfo(user);
        setShowSuccess(true);
        setData({ name: "", email: "", password: "" });
        setTimeout(() => setShowSuccess(false), 4000);
      }
    } catch (error) {
      alert("Error,Please try again.");
    } finally {
      setLoading(false);
    }
  };

    useEffect(()=>{
      const isLoggin = localStorage.getItem("token") ? true : false;

      if(isLoggin){
        navigation('/profile')
      }
  },[])
  return (
    <div
      className="my-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
<div
  className="p-4 bg-white rounded-4 shadow-lg"
  style={{ maxWidth: "500px", width: "100%" }}
>        <div className="text-center mb-4">
          <h1>SignUp</h1>
        </div>

        {showSuccess && (
          <div className="alert alert-success" role="alert">
            Account created successfully <Link to="/login">Click here</Link>
          </div>
        )}
        {loading && (
          <div className="d-flex justify-content-center mb-3">
            <div className="spinner-grow text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <form
          className="mx-auto"
          style={{ width: "100%" }}
          onSubmit={submitForm}
        >
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              name="name"
              type="text"
              value={data.name}
              onChange={handleInputChange}
            ></input>
          </div>
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
  className="btn px-4"
  style={{
    background: "linear-gradient(to right, #667eea, #764ba2)",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "10px",
    padding: "10px 30px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease, box-shadow 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.target.style.transform = "scale(1.05)";
    e.target.style.boxShadow = "0 6px 12px rgba(0,0,0,0.2)";
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
  }}
>
  Sign Up
</button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;


