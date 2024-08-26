import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllOrders = () => {
    const [orders, setOrders] = useState([]);

    // Function to fetch orders from the backend
    const fetchOrders = async () => {
        try {
            const result = await axios.get("/backend/admin/orders");
            setOrders(result.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    // UseEffect to fetch orders when the component mounts
    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <h2>All Orders</h2>
            {orders.length > 0 ? (
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Status</th>
                            <th>Transaction ID</th>
                            <th>Payment Method</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order._id}>
                                <td>{index + 1}</td> {/* Index to display row number */}
                                <td>{order.status}</td> {/* Status of the order */}
                                <td>{order.payment.transactionId}</td> {/* Transaction ID */}
                                <td>{order.payment.method}</td> {/* Payment method */}
                                <td>${order.payment.amount}</td> {/* Payment amount */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No orders available.</p> 
            )}
        </div>
    );
};

export default AllOrders;
