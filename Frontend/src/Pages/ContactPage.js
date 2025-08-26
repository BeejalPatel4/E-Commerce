import React, { useState } from "react";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setFeedback("");

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/api/contect`, formData);
      setFeedback(res.data.msg);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setFeedback(
        err.response?.data?.msg || "Something went wrong. Please try again."
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        className="bg-white p-4 rounded-4 shadow-lg"
        style={{
          maxWidth: "600px",
          width: "100%",
          borderRadius: "12px",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#4baaaa" }}>
          Get in Touch
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ borderRadius: "6px" }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ borderRadius: "6px" }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="form-control"
              value={formData.message}
              onChange={handleChange}
              required
              style={{ borderRadius: "6px" }}
            ></textarea>
          </div>
          {feedback && (
            <p className="text-center" style={{ color: "#764ba2" }}>{feedback}</p>
          )}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSending}
              style={{
                background: "linear-gradient(to right, #667eea, #764ba2)",
                color: "#fff",
                padding: "10px 30px",
                border: "none",
                borderRadius: "10px",
                fontWeight: "bold",
                letterSpacing: "1px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
