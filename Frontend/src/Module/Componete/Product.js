import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";


import { toast } from "react-toastify";

const Product = ({ item }) => {
const navigate = useNavigate();


  const actionCart = async (productId) => {
    try {
      const reqObj = {
        productId: productId,
        quantity: 1,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/api/cart`, reqObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
       if(response && response.data){
          const {msg} =response.data
          toast.success(msg)
       }
      console.log(response);
    } catch (error) {
      toast.error("Oops! Couldn't add item to cart. Please try again.");
    } finally {

    }
  };

  const imageUrl = item?.image
    ? `http://localhost:3000${item.image}`
    : "/images/fallback.png";

  return (
    <div className="card h-100 shadow-sm border-0">
      <img
        src={imageUrl}
        className="card-img-top"
        alt={item.name || "Product image"}
        style={{ objectFit: "cover", height: "200px" }}
         onClick={() => navigate(`/product/${item._id}`)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
/>
      
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title text-truncate">
            {item.name || "Unnamed Product"}
          </h5>
          <p className="card-text text-muted">
            {item.description || "No description available."}
          </p>
        </div>
        <div>
          <p className="card-text mb-2">
            <strong>₹{item.pricePerquantity || "N/A"}</strong>
          </p>
          {/* <button className="btn btn-dark w-100">ADD TO CART</button> */}
          <button
            className="btn w-100"
            
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#000";
              e.target.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#222";
              e.target.style.transform = "scale(1)";
            }}
            onClick={() => actionCart(item._id)}
            style={{
                background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                transition: "transform 0.2s ease",
                padding: "10px 20px",
                marginBottom: "5px",
              }}
          >
            🛒 ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
