import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { SingleOrder } from './SingleItem';
import styles from './Orders.module.css';
import { useNavigate } from 'react-router-dom';

export const Orders = () => {
    const { accessData } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3030/orders/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-authorization': accessData.accessToken,
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('You are not authenticated!');
                }
            })
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.error(
                    'There was a problem fetching the orders:',
                    error
                );
            });
    }, [accessData.accessToken, setOrders]);
    console.log(orders);
    return (
        <div style={{ textAlign: 'center' }}>
            <div className={styles['order-list']}>
                <h2>Orders</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Total</th>
                            <th>Ordered Products</th>
                            <th>Delivery</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((o) => (
                            <SingleOrder key={o._id} {...o}></SingleOrder>
                        ))}
                    </tbody>
                </table>
                <button onClick={() => navigate(-1)}>Go back</button>
            </div>
        </div>
    );
};
