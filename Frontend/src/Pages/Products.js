


import { useEffect, useState } from "react";
import React from "react";
import Product from "../Module/Componete/Product";
import axios from "axios";

const Products = () => {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  

  const getProducts = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/product`);
    console.log("Full Response:", response);

    const items = response?.data?.data?.product; // fixed key
    console.log("Extracted Products:", items);

    setProduct(items || []);
  } catch (error) {
    console.error("API Error:", error);
    setProduct([]);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="my-5">
      <div className="container">
        <div className="text-center">
          <h1>Product listing page</h1>
        </div>
        <div className="product-listing">
          <div className="row">
            {loading ? (
              <div className="col-12 text-center">
                <p>Loading products...</p>
              </div>
            ) : products && products.length > 0 ? (
              products.map((item, key) => (
                <div className="col-md-3 my-2" key={item.id || key}>
                  <Product item={item} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
