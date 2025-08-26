import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const Home = () => {
  const heroRef = useRef();

  useEffect(() => {
    gsap.from(heroRef.current, {
      opacity: 0,
      y: -60,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

 

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", color: "#333" }}>
 
      <section
        ref={heroRef}
        style={{
          height: "80vh",
          background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>Fashion Together</h1>
        <p style={{ fontSize: "1.4rem", marginBottom: "30px" }}>
          Where elegance meets emotion
        </p>
        <Link 
        to={'/product'}
          style={{
            padding: "12px 24px",
            background: "#ff416c",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}

        >
          Explore Collection
        </Link>
      </section>

     
      <section
        style={{
          padding: "60px 20px",
          backgroundColor: "#fff",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>Our Story</h2>
        <p style={{ fontSize: "1.1rem", maxWidth: "700px", margin: "0 auto", color: "#555" }}>
          At Fashion Together, we believe that clothing is more than just fabric; it's a form of self-expression and a way to connect with others. Our curated collections are designed to inspire confidence and celebrate individuality. Join us on a journey where style meets substance, and every outfit tells a story.
        </p>
      </section>
       
    
    </div>
  );
};

export default Home;
