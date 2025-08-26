

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetails = () => {
const { id } = useParams();  
const [productInfo, setProductInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/product/${id}`
      );
      if (response?.data?.data?.productInfo) {
        setProductInfo(response.data.data.productInfo);
      } else {
        toast.error("Product not found.");
      }
    } catch (error) {
      console.error("Product fetch error:", error);
      toast.error("Failed to load product details.");
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  if (!id || id === "undefined") {
    toast.error("Invalid product ID");
    return;
  }
  fetchProduct();
}, [id]);

  const imageUrl = productInfo?.image
    ? `${process.env.REACT_APP_BACKEND_API}${productInfo.image}`
    : "/images/fallback.png";

  return (
    <div className="container py-5 my-5" style={{
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        borderRadius: "12px",
        padding: "60px 40px",
      }}>
      {loading ? (
        <div className="text-center py-5">
          <h4>Loading product details...</h4>
        </div>
      ) : productInfo ? (
        <div className="row">
          <div className="col-md-6">
            <img
              src={imageUrl}
              alt={productInfo.name}
              className="img-fluid rounded shadow"
              style={{ maxHeight: "400px", objectFit: "cover" }}
                 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold">{productInfo.name}</h2>
            <p className="text-muted">{productInfo.description}</p>
            <h4 className="text-dark">₹{productInfo.pricePerquantity}</h4>
            <p>
              <strong>Category:</strong>{" "}
              {productInfo.category?.name || "Uncategorized"}
            </p>
           
          </div>
        </div>
      ) : (
        <div className="text-center py-5">
          <h4>Product not found.</h4>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

