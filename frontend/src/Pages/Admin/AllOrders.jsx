import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const result = await axios.get("/backend/admin/orders");
            setOrders(result.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

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
                                <td>{index + 1}</td> 
                                <td>{order.status}</td> 
                                <td>{order.payment.transactionId}</td>
                                <td>{order.payment.method}</td>
                                <td>${order.payment.amount}</td>
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
