import React, { useState } from "react";
import ProfileManu from "../../Module/Componete/ProfileManu";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CategoriForm = () => {
  const [data, setData] = useState({
    name: "",
    image: null,
  });
  const [loading, setLoding] = useState(false);

  const navigation = useNavigate();

  const inputChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const fileChangHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.files[0],
    });
  };

 const actionSubmit = async () => {
  if (!data.name || !data.image) {
    toast.error("Please provide both name and image");
    return;
  }

  try {
    setLoding(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image);

    console.log("Submitting:", {
      name: data.name,
      image: data.image,
    });

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}/api/category`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Response:", response);

    if (response && response.data) {
      const { msg } = response.data;
      toast.success(msg);
      setData({ name: "", image: null });
      navigation("/admin/category/");
    }
  } catch (error) {
    console.error("Error submitting category:", error);
    toast.error("Please try again");
  } finally {
    setLoding(false);
  }
};

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
            Create New Category
          </h1>
          <p style={{ color: "#666", fontSize: "1rem" }}>
            Add a name and logo to define your category.
          </p>
          {loading && (
            <div className="d-flex justify-content-center mb-3">
              <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 mb-4 mb-md-0">
            <ProfileManu />
          </div>
          <div className="col-lg-9 col-md-8">
            <form className="bg-light p-4 rounded-3 shadow-sm">
              <div className="mb-4">
                <label className="form-label fw-semibold" htmlFor="name">
                  Category Name
                </label>
                <input
                  className="form-control"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter category name"
                  value={data.name}
                  onChange={(e) => inputChangeHandler(e)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold" htmlFor="logo">
                  Category Logo
                </label>
                <input
                  className="form-control"
                  id="image"
                  name="image"
                  type="file"
                  onChange={fileChangHandler}
                />
              </div>
              {data.image && (
                <div className="mb-3">
                  <img
                    src={URL.createObjectURL(data.image)}
                    alt="Preview"
                    style={{ maxWidth: "100px", borderRadius: "8px" }}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn w-100"
                onClick={() => actionSubmit()}
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
                {loading ? "Submitting..." : "Submit Category"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriForm;


