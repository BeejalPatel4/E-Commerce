import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ProfileManu from "../../Module/Componete/ProfileManu";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/product`
      );
      if (response && response.data) {
        const { product: products } = response.data.data;

        setProducts(products);
      }
    } catch (error) {
      toast.error("Products not found");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmDelete) return;

      await axios.delete(
        `${process.env.REACT_APP_BACKEND_API}/api/product/${productId}`
      );
      toast.success("Product deleted successfully");
      setProducts((prev) =>
        prev.filter((product) => product._id !== productId)
      );
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        padding: "60px 30px",
      }}
    >
      <div
        className="container bg-white rounded-4 shadow-lg p-5"
        style={{ maxWidth: "1200px", width: "100%" }}
      >
        <div className="text-center mb-5">
          <h1 style={{ fontWeight: "bold", color: "#333", fontSize: "2.5rem" }}>
            Products List
          </h1>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 mb-4 mb-md-0">
            <ProfileManu />
          </div>
          <div className="col-md-8">
            <Link
              to="/admin/product/form"
              type="button"
              className="btn w-10 float-start "
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
              Create
            </Link>
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Name</th>
                  <th>image</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.length > 0 &&
                  products.map((item, key) => {
                    return (
                      <tr key={item._id}>
                        <td>{key + 1}</td>
                        <td>{item.name}</td>
                        <td>
                          <img
                            src={`${process.env.REACT_APP_BACKEND_API}${item.image}`}
                            width={40}
                            alt={`${item.name} image`}
                          />
                        </td>
                        <td>{item.category?.name || "—"}</td>
                        <td>{item.pricePerquantity}</td>
                        <td>{item.quantity}</td>
                        {/* <td>{item.createdAt}</td> */}
                        <td>{new Date(item.createdAt).toLocaleString()}</td>

                        <td>
                          <div className="d-flex gap-2">
                            <Link className="btn w-10"
                            to={`/admin/product/form/${item._id}`}
                              style={{
                                background:
                                  "linear-gradient(135deg, #ff416c, #ff4b2b)",
                                color: "#fff",
                                fontWeight: "bold",
                                borderRadius: "8px",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                                transition: "transform 0.2s ease",
                                padding: "10px 20px",
                                marginBottom: "5px",
                              }}
                            >
                              Edit
                            </Link>
                            <button
                             className="btn w-10"
                              onClick={() => handleDelete(item._id)}
                              style={{
                                background:
                                  "linear-gradient(135deg, #ff416c, #ff4b2b)",
                                color: "#fff",
                                fontWeight: "bold",
                                borderRadius: "8px",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                                transition: "transform 0.2s ease",
                                padding: "10px 20px",
                                marginBottom: "5px",
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
