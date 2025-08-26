import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ProfileManu from "../../Module/Componete/ProfileManu";
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";

const statusItem = ['initiated', 'pending', 'processing', 'completed', 'cancel'];

const OrderDetelis = () => {
    const [orderInfo, setOrderInfo] = useState(null);

    const { orderId } = useParams();

    const [status, setStatus] = useState('');

    const getOrderInfo = async (orderId) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_API}/api/order/${orderId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response && response.data) {
                const { orderInfo } = response.data.data;

                setOrderInfo(orderInfo);
                setStatus(orderInfo.status)
            }
        } catch (error) {
            toast.error("Order not found");
        }
    };

  const updatedOrder = async() =>{
    try{

        const reqObj ={
            status
        }
        const response = await axios.put(
                `${process.env.REACT_APP_BACKEND_API}/api/order/${orderId}`,reqObj,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
                if (response && response.data) {
                const { msg } = response.data;
                  toast.success(msg)
                    
            }
    }catch (error) {
            toast.error("Order not found ,try again");
        }
  }
    const inputChangeHandler = (e) => {
        setStatus(e.target.value)
    }


    useEffect(() => {
  if (orderId) {
    getOrderInfo(orderId);
  }
}, [orderId]);

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
                        Order Detelis
                    </h1>
                </div>

                <div className="row">
                    <div className="col-lg-3 col-md-4 mb-4 mb-md-0">
                        <ProfileManu />
                    </div>
                    {/* {JSON.stringify(orderInfo)} */}
                    <div className="col-md-8">



                        <h1>Address:</h1>
                        <div>

                            {orderInfo &&
                                <>
                                    <p>
                                        {orderInfo.firstName}
                                        {orderInfo.secondName}
                                    </p>
                                    <p>
                                        {orderInfo.address},{orderInfo.address2}
                                    </p>
                                    <p>
                                        {orderInfo.city},{orderInfo.state},{orderInfo.zip}
                                    </p>
                                </>
                            }

                        </div>
                        <hr />
                        <h1>Product:</h1>
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Sr.No</th>

                                    <th>Products Name</th>
                                    <th>image</th>
                                    <th>quantity</th>
                                    <th>price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderInfo &&
                                    orderInfo.products &&
                                    orderInfo.products.length > 0 &&
                                    orderInfo.products.map((item, key) => (
                                        <tr key={key}>
                                            <td>{key + 1}</td>
                                            <td>{item.product.name}</td>
                                            <td>
                                                <img
                                                    src={`${process.env.REACT_APP_BACKEND_API}${item.product.image}`}
                                                    width={60}
                                                    alt={item.product?.name}
                                                />
                                            </td>
                                            <td>{item.quantity}</td>
                                            <td>{item.price}</td>
                                        </tr>
                                    ))}
                                <tr>
                                    <td colSpan={4}>
                                        <strong>Total</strong>
                                    </td>
                                    <td>
                                        <strong>{orderInfo ? orderInfo.totalAmount : 0}</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <hr />
                        <h4>status</h4>
                        <div className="mb-4">
                            <label className="form-label fw-semibold" htmlFor="logo">
                                Select Status
                            </label>
                            <select
                                className="form-control"
                                id="starus"
                                name="status"
                                value={status}
                              onChange={(e) => inputChangeHandler(e)}
                            >
                                <option>Select status</option>

                                {statusItem.map((items, key) => (
                                    <option key={key} value={items}>
                                        {items}
                                    </option>
                                ))}
                            </select>

                            <button  type="button"  onClick={()=>updatedOrder()} style={{
                background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                transition: "transform 0.2s ease",
                padding: "10px 20px",
                marginBottom: "5px",
              }} className="btn btn float-end">UpDate</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 

export default OrderDetelis;
