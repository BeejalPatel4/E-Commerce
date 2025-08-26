import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ProfileManu from "../../Module/Componete/ProfileManu";
import { Link } from "react-router-dom";

const CategoriList = () => {
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/category`
      );
      if (response && response.data) {
        const { categories } = response.data.data;
        setCategories(categories);
      }
    } catch (error) {
      toast.error("Please try later");
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete?");
      if (!confirmDelete) return;

      const token = localStorage.getItem("token"); 

      await axios.delete(
        `${process.env.REACT_APP_BACKEND_API}/api/category/${id}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Deleted successfully");
      setCategories((prev) => prev.filter((cat) => cat._id !== id)); 
    } catch (error) {
      toast.error(
        error.response?.data?.msg || "Unauthorized or failed to delete"
      );
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    getCategories();
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
            Categories List
          </h1>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 mb-4 mb-md-0">
            <ProfileManu />
          </div>
          <div className="col-md-8">
            <Link
              to="/admin/category/form"
              type="button"
              className="btn w-10 float-end"
              style={{
                background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                transition: "transform 0.2s ease",
                padding: "10px 20px",
              }}
            >
              Create
            </Link>
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories &&
                  categories.length > 0 &&
                  categories.map((item, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{item.name}</td>
                      <td>
                        <img
                          src={item.logo}
                          width={40}
                          alt={`${item.name} logo`}
                        />
                      </td>

                      <td>
                        <div className="d-flex gap-5">
                          <button
                            className="btn w-5"
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
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriList;
