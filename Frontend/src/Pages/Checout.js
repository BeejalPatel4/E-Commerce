import React, { cache, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

const Checout = () => {
  const navigator =useNavigate()
  const [CartProduct, setCartProduct] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [orderId, setOrderId] = useState(null);
  const [data, setData] = useState({
    paymentType: "COD",
    firstName: " ",
    secondName: " ",
    address: " ",
    address2: " ",
    city: " ",
    state: " ",
    zip: " ",
  });

  const [error, setError] = useState({
    paymentType: " ",
    firstName: " ",
    secondName: " ",
    address: " ",
    address2: " ",
    city: " ",
    state: " ",
    zip: " ",
  });
  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const getCarts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/cart`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response && response.data) {
        if(response.data.data.cart){
        const { products, totalAmount } = response.data.data.cart;
        setCartProduct(products);
        setTotalCart(totalAmount);
        }
        else{
          navigator("/product")
        }
      }
    } catch (error) {
      toast.error(" Please try again.");
    }
  };

  const validate = (fromData) => {
    let isValid = true;
    const errors = {
      paymentType: " ",
      firstName: " ",
      secondName: " ",
      address: " ",
      address2: " ",
      city: " ",
      state: " ",
      zip: " ",
    };
    if (!fromData.firstName.trim()) {
      isValid = false;
      errors.firstName = "Enter first Name";
    }
    if (!fromData.secondName.trim()) {
      isValid = false;
      errors.secondName = "Enter secoud Name";
    }
    if (!fromData.address.trim()) {
      isValid = false;
      errors.address = "Enter Address";
    }

    if (!fromData.city.trim()) {
      isValid = false;
      errors.city = "Enter City";
    }
    if (!fromData.state.trim()) {
      isValid = false;
      errors.state = "Enter State";
    }
    if (!fromData.zip.trim()) {
      isValid = false;
      errors.zip = "Enter Zip";
    }

    setError(errors);
    return isValid;
  };

  const intiateCheckout = async (data) => {
    if (validate(data)) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_API}/api/checkout`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response && response.data) {
          const { msg } = response.data;
          const { orderId } = response.data.data;
          setOrderId(orderId);
          toast.success(msg);
        }
      } catch (error) {
        toast.error(" Please try again.");
      }
    }
  };
  const conformChecout = async(orderId) => {
       
     try{
           const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_API}/api/checkout/${orderId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response && response.data) {
          const { msg } = response.data;
          toast.success(msg);
          navigator("/profile")
        }
     }catch (error) {
        toast.error(" Please try again.");
      }
      
  };
  const actionChecout = () => {

    if(orderId){
      conformChecout(orderId)
    }else{
          intiateCheckout(data);
    }
    
  };

  useEffect(() => {
    getCarts();
  }, []);

  return (
    <div className="my-5">
      <div className="container">
        <div className="text-center">
          <h1>Checout</h1>
        </div>
      </div>
      {/* {JSON.stringify(data)} */}
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form className="row g-3">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input
                  className="form-control"
                  name="firstName"
                  type="text"
                  placeholder="Enter first name"
                  value={data.firstName}
                  onChange={(e) => handleInputChange(e)}
                />
                {error.firstName && (
                  <div className="text-danger">{error.firstName}</div>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">second Name </label>
                <input
                  className="form-control"
                  name="secondName"
                  type="text"
                  placeholder="Enter second name"
                  value={data.secondName}
                  onChange={(e) => handleInputChange(e)}
                />
                {error.secondName && (
                  <div className="text-danger">{error.secondName}</div>
                )}
              </div>
              <div className="col-12">
                <label className="form-label">Address Line 1</label>
                <input
                  className="form-control"
                  name="address"
                  type="text"
                  placeholder="Street address, P.O. box, etc."
                  value={data.address}
                  onChange={(e) => handleInputChange(e)}
                />
                {error.address && (
                  <div className="text-danger">{error.address}</div>
                )}
              </div>
              <div className="col-12">
                <label className="form-label">Address Line 2</label>
                <input
                  className="form-control"
                  name="address2"
                  type="text"
                  placeholder="Apartment, suite, unit, building, etc."
                  value={data.address2}
                  onChange={(e) => handleInputChange(e)}
                />
                {error.address2 && (
                  <div className="text-danger">{error.address2}</div>
                )}
              </div>
              <div className="col-md-4">
                <label className="form-label">City</label>
                <input
                  className="form-control"
                  name="city"
                  type="text"
                  placeholder="City name"
                  value={data.city}
                  onChange={(e) => handleInputChange(e)}
                />
                {error.city && <div className="text-danger">{error.city}</div>}
              </div>
              <div className="col-md-4">
                <label className="form-label">State</label>
                <input
                  className="form-control"
                  name="state"
                  type="text"
                  placeholder="State name"
                  value={data.state}
                  onChange={(e) => handleInputChange(e)}
                />
                {error.state && (
                  <div className="text-danger">{error.state}</div>
                )}
              </div>
              <div className="col-md-4">
                <label className="form-label">Zip Code</label>
                <input
                  className="form-control"
                  name="zip"
                  type="text"
                  placeholder="Postal code"
                  value={data.zip}
                  onChange={(e) => handleInputChange(e)}
                />
                {error.zip && <div className="text-danger">{error.zip}</div>}
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <div className="text-center">
              <h3>Products</h3>
            </div>
            <table className="table table-hover table-striped border shadow-sm">
              <thead className="table-dark">
                <tr>
                  <th>Sr.No</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>price</th>
                  <th>total Amount</th>
                </tr>
              </thead>
              <tbody>
                {CartProduct &&
                  CartProduct.length > 0 &&
                  CartProduct.map((item, key) => {
                    return (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>
                          <img
                            src={`${process.env.REACT_APP_BACKEND_API}${item.product.image}`}
                            width={100}
                            alt={item.product.name}
                            style={{
                              objectFit: "cover",
                              borderRadius: "8px",
                              marginRight: "10px",
                            }}
                          />
                        </td>

                        <td>
                          <span>{item.quantity}</span>
                        </td>

                        <td>{item.product.pricePerquantity}</td>
                        <td>{item.price}</td>
                        <td></td>
                      </tr>
                    );
                  })}
                <tr className="fw-bold bg-light text-dark border-top">
                  <td colSpan="4" className="text-end pe-3 fs-5">
                    Total Amount
                  </td>
                  <td className="fs-5 text-success">₹{totalCart}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>

            <div className="my-3">
              <strong>Payment Type</strong>
              <div className="form-check">
                <input
                  className="form-check-input"
                  name="paymentType"
                  type="radio"
                  value="COD"
                  checked={data.paymentType === "COD"}
                  onChange={handleInputChange}
                />

                <label className="form-check-lable">COD</label>
                {/* <label className="form-check-lable">Online</label> */}
              </div>
            </div>

            <div className="my-3">
              <button
                className="btn btn-dark d-block w-100"
                type="button"
                onClick={() => actionChecout()}
              >
              {
                orderId == null ? "checkout" : "conform"
              }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checout;
