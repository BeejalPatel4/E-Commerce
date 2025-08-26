import React, { useState, useEffect } from "react";
import ProfileManu from "../../Module/Componete/ProfileManu";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const [loading, setLoding] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigation = useNavigate();

  const { productId } = useParams();
  console.log("productId", productId);

  const [data, setData] = useState({
    name: "",
    category: "",
    description: "",
    quantity: "",
    pricePerquantity: "",
    image: null,
  });

  //get the category form category

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

  const [error, setError] = useState({
    name: "",
    category: "",
    description: "",
    quantity: "",
    pricePerquantity: "",
    image: null,
  });
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

  const validate = (fromData) => {
    let isValid = true;
    const errors = {
      name: "",
      category: "",
      description: "",
      quantity: "",
      pricePerquantity: "",
      image: null,
    };
    if (!fromData.name) {
      isValid = false;
      errors.name = "Enter product name";
    }

    if (!fromData.category) {
      isValid = false;
      errors.category = "Select category Name";
    }
    if (!fromData.description) {
      isValid = false;
      errors.description = "Enter Discription";
    }

    if (!fromData.quantity) {
      isValid = false;
      errors.quantity = "Min quantity is 1";
    }
    if (!fromData.pricePerquantity) {
      isValid = false;
      errors.pricePerquantity = "Min Product price is 99";
    }
    if (!fromData.image) {
      isValid = false;
      errors.image = " Image is Require";
    }
    setError({ ...errors });
    return isValid;
  };

  const actionProductCreate = async () => {
    if (validate(data)) {
      try {
        setLoding(true);
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("category", data.category);
        formData.append("description", data.description);
        formData.append("quantity", data.quantity);
        formData.append("pricePerquantity", data.pricePerquantity);
        formData.append("image", data.image);
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_API}/api/product`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response && response.data) {
          const { msg } = response.data;
          toast.success(msg);
          navigation("/admin/product/");
        }
      } catch (error) {
        toast.error("try agian");
      } finally {
        setLoding(false);
      }
    }
  };
  const actionProductEdit = async (productId) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("quantity", data.quantity);
      formData.append("pricePerquantity", data.pricePerquantity);
      formData.append("image", data.image);
      
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/api/product/${productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response && response.data) {
        const { msg } = response.data;
        toast.success(msg);
        navigation("/admin/product/");
      }
    } catch (error) {
      toast.error("try agian");
    }
  };

  const actionSubmit = async () => {
    if (productId) {
      actionProductEdit(productId);
    } else {
      actionProductCreate();
    }
  };

  //get the  one product details
  const getProductDetails = async (productId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/product/${productId}`
      );
      if (response && response.data) {
        const { productInfo } = response.data.data
        setData({
          ...data,
          name: productInfo.name,
          category: productInfo.category._id,
          description: productInfo.description,
          quantity: productInfo.quantity,
          pricePerquantity: productInfo.pricePerquantity,
        });
        console.log("productInfo:", productInfo);
      }
    } catch (error) {
      toast.error("try agian");
    }
  };

  useEffect(() => {
    getCategories();
    if (productId) {
      getProductDetails(productId);
    }
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
            {productId ? "Edit" : "Create"} Product
          </h1>
          <p style={{ color: "#666", fontSize: "1rem" }}>
            {productId
              ? "Add in Product Detailed."
              : "Add new Product Detailed."}
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
                  Product Name
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
                {error.name && <div className="text-danger">{error.name}</div>}
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold" htmlFor="logo">
                  Select Category
                </label>
                <select
                  className="form-control"
                  id="category"
                  name="category"
                  value={String(data.category)}
                  onChange={(e) => inputChangeHandler(e)}
                >
                  <option>.....</option>
                  {categories &&
                    categories.length > 0 &&
                    categories.map((category, key) => (
                      <option value={category._id} key={key}>
                        {category.name}
                      </option>
                    ))}
                </select>
                {error.category && (
                  <div className="text-danger">{error.category}</div>
                )}
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold" htmlFor="name">
                  Discription
                </label>
                <input
                  className="form-control"
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Enter  Discription"
                  value={data.description}
                  onChange={(e) => inputChangeHandler(e)}
                />
                {error.description && (
                  <div className="text-danger">{error.description}</div>
                )}
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold" htmlFor="name">
                  Quantity
                </label>
                <input
                  className="form-control"
                  id="quantity"
                  name="quantity"
                  type="text"
                  placeholder="Enter category name"
                  value={data.quantity}
                  onChange={(e) => inputChangeHandler(e)}
                />
                {error.quantity && (
                  <div className="text-danger">{error.quantity}</div>
                )}
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold" htmlFor="name">
                  Price Perquantity
                </label>
                <input
                  className="form-control"
                  id="pricePerquantity"
                  name="pricePerquantity"
                  type="text"
                  placeholder="Enter category name"
                  value={data.pricePerquantity}
                  onChange={(e) => inputChangeHandler(e)}
                />
                {error.pricePerquantity && (
                  <div className="text-danger">{error.pricePerquantity}</div>
                )}
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold" htmlFor="logo">
                  Product Image
                </label>
                <input
                  className="form-control"
                  id="logo"
                  name="image"
                  type="file"
                  
                  onChange={fileChangHandler}
                />
                {data.image && (
                <div className="mb-3">
                  <img
                    src={URL.createObjectURL(data.image)}
                    alt="Preview"
                    style={{ maxWidth: "100px", borderRadius: "8px" }}
                  />
                </div>
              )}
                {error.image && (
                  <div className="text-danger">{error.image}</div>
                )}
              </div>
           
             
              <button
                type="button"
                className="btn "
                onClick={()=>actionSubmit()}
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
              >{productId ? "Update" :"submit"} 
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
