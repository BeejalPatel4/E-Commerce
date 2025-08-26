import React from "react";

const AboutPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        // background: "linear-gradient(to right, #f4f9f9, #ddeef2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          width: "100%",
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#4baaaa", marginBottom: "20px" }}>
          About Beejal Web Solutions Pvt. Ltd.
        </h2>


<p style={{ fontSize: "0.95rem", color: "#555", marginBottom: "15px" }}>
  Beejal Web Solutions Pvt. Ltd. is more than a tech company — it’s a collective of thinkers, dreamers, and builders who believe that every pixel should have purpose. We specialize in crafting digital experiences that feel intuitive, scalable, and emotionally resonant. Whether you're launching a startup or refining an enterprise platform, we bring clarity to complexity and joy to functionality.
</p>





        <div style={{ marginTop: "30px", fontSize: "0.95rem", color: "#333" }}>
          <p><strong>📍</strong> SG Highway, Ahmedabad, Gujarat, India</p>
          <p><strong>📞</strong> +91-98765-43210</p>
          <p><strong>📧</strong> hello@beejalweb.dev</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
