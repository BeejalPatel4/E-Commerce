import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ProfileManu from "../../Module/Componete/ProfileManu";
import { Link } from "react-router-dom";
// import Order from "../../../../Backend/Model/Order";

const OrderList = () => {

    const [orders, setOrders] = useState([])

    const getOrder = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_API}/api/order`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,

                }
            }
            );
            if (response && response.data) {
                const { orders } = response.data.data; //orders is the backend that have datata on it

                setOrders(orders);
            }
        }
        catch (error) {
            toast.error("Order not found");
        }
    }
    useEffect(() => {
        getOrder();
    }, [])

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
                        Order List
                    </h1>
                </div>

                <div className="row">
                    <div className="col-lg-3 col-md-4 mb-4 mb-md-0">
                        <ProfileManu />
                    </div>
                    <div className="col-md-8">

                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>User</th>
                                    <th>Products</th>
                                    <th>Address</th>
                                    <th>status</th>
                                    <th>Payment</th>
                                    <th>Total</th>
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders && orders.length > 0 && orders.map((order, key) => (
                                        <tr key={key}>
                                            <td>{key + 1}</td>
                                            <td><p>{order.user.name}</p>
                                                <p>{order.user.email}</p>
                                            </td>
                                            {/* <td>{order.products.length > 0 && order.map((item, idx) => {
                                                return( <p key={idx}>{item.product.name}</p>)
                                               
                                            })}</td> */}

                                            <td>
                                                {order.products?.length > 0 ? (
                                                    order.products.map((item, idx) => (
                                                        <p key={idx}>{item?.product?.name} | {item.quantity} | Rs.{item.price}</p>
                                                    ))
                                                ) : (
                                                    <p>No Products</p>
                                                )}
                                            </td>

                                            <td>
                                                <p>{order.firstName}{order.secondName}</p>
                                                <p>{order.address},{order.address2}</p>
                                                <p>{order.city},{order.state},{order.zip}</p>
                                            </td>
                                            <td>{order.status}</td>
                                            <td>{order.paymentType}</td>
                                            <td>{order.totalAmount}</td>
                                            <td><Link to={`/admin/order/${order._id}`} className="btn btn-sm btn-dark">view</Link></td>
                                        </tr>
                                        
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderList


