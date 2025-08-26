import React from "react";
import ProfileManu from "../Module/Componete/ProfileManu";
import axios from "axios";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrder] = useState([]);

  const getOrder = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/order=user`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            
          },
        }
      );

      if (response && response.data) {
        const { orders, pagination } = response.data.data;

        setOrder(orders);
      }
    } catch (error) {
      toast.error("Please try again");
    }
  };
  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary">🛒 Your Orders</h2>
        <p className="text-muted">Track your purchases and payment status</p>
      </div>

      <div className="row">
        <div className="col-md-4 mb-4">
          <ProfileManu />
        </div>

        <div className="col-md-8">
          {orders.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Order ID</th>
                    <th>Products</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((item, key) => (
                    <tr key={key}>
                      <td className="text-break">{item._id}</td>
                      <td>
                        {item.products.map((prod, idx) => (
                          <div key={idx} className="d-flex align-items-center mb-2">
                            <img
                              src={`${process.env.REACT_APP_BACKEND_API}${prod.product.image}`}
                              alt={prod.product.name}
                              width={50}
                              height={50}
                              className="me-2 rounded shadow-sm"
                            />
                            <span>{prod.product.name}</span>
                          </div>
                        ))}
                      </td>
                      <td>
                        <span className="badge bg-info text-dark">
                          {item.paymentType}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            item.status === "Delivered"
                              ? "bg-success"
                              : item.status === "Pending"
                              ? "bg-warning text-dark"
                              : "bg-secondary"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>₹{item.totalAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-muted py-5">
              <h5>No orders found</h5>
              <p>Start shopping to see your orders here!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;


