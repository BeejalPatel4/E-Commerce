import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigator = useNavigate();

  const [CartProduct, setCartProduct] = useState([]);
  const [totalCart, setTotalCart] = useState(0);

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
        if (response.data.data.cart) {
          const { products, totalAmount } = response.data.data.cart;
          setCartProduct(products);
          setTotalCart(totalAmount);
        } else {
          navigator("/product");
        }
      }
    } catch (error) {
      toast.error(" Please try again.");
    }
  };

  const removeCart = async (productId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_API}/api/cart/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response && response.data) {
        const { msg } = response.data;

        toast.success(msg);
        getCarts();
      }
    } catch (error) {
      toast.error(" Please try again.");
    }
  };
  const updateCart = async (productId, change) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/api/cart/${productId}`,
        { change }, // Send quantity change
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response && response.data) {
        toast.success(response.data.msg);
        getCarts(); // Refresh cart state
      }
    } catch (error) {
      toast.error("Failed to update cart quantity");
    }
  };

  useEffect(() => {
    getCarts();
  }, []);

  return (
    <div className="my-5">
      <div className="container">
        <div className="text-center">
          <h1>Cart</h1>
        </div>

        <table className="table table-hover table-striped border shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Sr.No</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>price</th>
              <th>total Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {CartProduct &&
              CartProduct.length > 0 &&
              CartProduct.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    {/* First that show but now it not show  */}
                      <td> <img
                        src={`${process.env.REACT_APP_BACKEND_API}${item.product.image}`}
                        width={200}
                        alt={item.product.name}
                        style={{
                          objectFit: "cover",
                          borderRadius: "8px",
                          marginRight: "10px",
                        }}
                      /> 
                      </td>
                     

                      {/* In this image not show on cart,order,checout than using this it not show but error not show */}
                       {/* <td>
                      {CartProduct?.image ? (
                        <img
                          src={item.image}
                          alt={item.name || "Product"}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <span style={{ color: "#888", fontStyle: "italic" }}>
                          No image
                        </span>
                      )}
                    </td> */}

                    <td>
                      <button
                        className="btn btn-sm btn-secondary me-1"
                        onClick={() => updateCart(item.product._id, -1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-secondary ms-1"
                        onClick={() => updateCart(item.product._id, 1)}
                      >
                        +
                      </button>
                    </td>

                    <td>{item.product?.pricePerquantity}</td>
                    <td>{item.price}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeCart(item.product._id)}
                      >
                        Remove
                      </button>
                    </td>
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
        <button
          className="btn btn-primary"
          onClick={() => navigator("/checout")}
          disabled={CartProduct.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
