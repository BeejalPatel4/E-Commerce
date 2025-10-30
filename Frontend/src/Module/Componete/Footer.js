

import React from "react";

const Footer = () => {
  return (
    <footer
      className="container-fluid text-center py-5"
      style={{
        background: "linear-gradient(to right, #4b6cb7, #182848)",
        color: "#fff",
        boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="row">
        <div className="col-md-4 mb-3">
          <h5
            style={{
              color: "#fff",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            Contact
          </h5>
          <p>Email: bijal@example.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
<div className="col-md-4 mb-3">
  <h5 style={{ color: "#fff", fontWeight: "600", textTransform: "uppercase" }}>
    Follow Us
  </h5>
  <div className="d-flex justify-content-center gap-3 mt-3">
    <a
      href="https://www.google.com/search?q=yourprofile"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#fff", fontSize: "1.5rem" }}
    >
     <h6>Google</h6>
    </a>
    
    <a
      href="https://twitter.com/yourprofile"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#fff", fontSize: "1.5rem" }}
    >
<h6>Twitter</h6>    </a>
    <a
      href="https://www.linkedin.com/in/yourprofile"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#fff", fontSize: "1.5rem" }}
    >
      <h6>Linkdin</h6>
    </a>
    <a
      href="https://www.youtube.com/@yourchannel"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#fff", fontSize: "1.5rem" }}
    >
      <h6>Youtube</h6>
    </a>
    <a
      href="https://www.facebook.com/yourpage"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#fff", fontSize: "1.5rem" }}
    >
      <h6>Facebook</h6>
    </a>
  </div>
</div>


        <div className="col-md-4 mb-3">
          <h5
            style={{
              color: "#fff",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            About
          </h5>
          <p style={{ fontStyle: "italic", fontWeight: "500" }}>
            Made<span style={{ color: "#ff5e5e" }}>company</span> by Bijal
            Patel
          </p>
          <p>Bringing joy to frontend and backend.</p>
        </div>
      </div>

      <hr style={{ borderColor: "#fff", margin: "30px auto", width: "80%" }} />
      <p style={{ fontSize: "0.9rem", color: "#eee", marginBottom: "0" }}>
        &copy; {new Date().getFullYear()} All Rights Reserved to Bijal Patel
      </p>
    </footer>
  );
};

export default Footer;

