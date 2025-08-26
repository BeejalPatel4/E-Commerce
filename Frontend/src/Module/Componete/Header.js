import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const isLoggin = localStorage.getItem("token") ? true : false;
   const userInfo=JSON.parse(localStorage.getItem("userInfo"))
  const role=userInfo ? userInfo.role:0


  return (
    <nav className=" custom-navbar navbar navbar-expand-lg  shadow-sm sticky-top" style={{
      background: "linear-gradient(to right, #4b6cb7, #182848)",
      color: "#fff",

    }}>
      <div className="container-fluid">
        <Link
          className="navbar-brand fw-bold text-uppercase"
          to="/"
          style={{
            letterSpacing: "1px",
            fontFamily: "Pacifico, cursive",
            color: "#fff",
            textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
            fontSize: "1.5rem"
          }}
        >
          Bijal Shop 🛍️
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link"
                style={{
                  color: "#fff",
                  fontWeight: "500",
                  position: "relative",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#07ffeeff")}
                onMouseLeave={(e) => (e.target.style.color = "#fff")}
                to="/"
              >
                Home
              </Link>

            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={{
                  color: "#fff",
                  fontWeight: "500",
                  position: "relative",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#07daffff")}
                onMouseLeave={(e) => (e.target.style.color = "#fff")}
                to="/product"
              >
                Product
              </Link>

            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={{
                  color: "#fff",
                  fontWeight: "500",
                  position: "relative",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#07eeffff")}
                onMouseLeave={(e) => (e.target.style.color = "#fff")}
                to="/about"
              >
                About
              </Link>

            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={{
                  color: "#fff",
                  fontWeight: "500",
                  position: "relative",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#07e6ffff")}
                onMouseLeave={(e) => (e.target.style.color = "#fff")}
                to="/contect"
              >
                Contect
              </Link>

            </li>
            {isLoggin ? (
              <>
              {role==1 ?

              <>
              <li className="nav-item">
                  <button style={{
                      color: "#000",
                      padding: "8px 20px",
                      border: "none",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      cursor: "pointer",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      transition: "background-color 0.3s ease",
                    }}>
                    <Link to="admin/Profile">Profile</Link>
                  </button>
                </li>
              </>:
              
              
              <>
                 <li className="nav-item">
                  <button style={{
                      color: "#000",
                      padding: "8px 20px",
                      border: "none",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      cursor: "pointer",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      transition: "background-color 0.3s ease",
                    }}>
                    <Link to="/cart">Cart</Link>
                  </button>
                </li>
                <li className="nav-item">
                  <button style={{
                      color: "#000",
                      padding: "8px 20px",
                      border: "none",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      cursor: "pointer",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      transition: "background-color 0.3s ease",
                    }}>
                    <Link to="/Profile">Profile</Link>
                  </button>
                </li>
              </>
              }
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button
                    style={{
                      color: "#000",
                      padding: "8px 20px",
                      border: "none",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      cursor: "pointer",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    {" "}
                    <Link to="/login">Login</Link>
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    style={{

                      color: "#0000",
                      padding: "8px 20px",
                      border: "none",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      cursor: "pointer",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      transition: "background-color 0.3s ease",
                    }}

                  >
                    {" "}
                    <Link to="/signup">SignUp</Link>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
