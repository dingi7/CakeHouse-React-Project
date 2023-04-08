import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { SingleOrder } from './SingleItem';
import styles from './Orders.module.css';
import { useNavigate } from 'react-router-dom';
import { getUsersOrdersReq } from '../../utils/request';
import { errorNotification } from '../../utils/notificationHandler';
import { Spinner } from '../../components/Spinner/Spinner';

export const Orders = () => {
    const { accessData } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orders = await getUsersOrdersReq(accessData.accessToken);
                setOrders(orders);
            } catch (err) {
                errorNotification(err.message);
            }
            setLoading(false);
        };
        fetchOrders();
    }, [accessData.accessToken, setOrders]);
    return (
        <div style={{ textAlign: 'center' }}>
            <div className={styles['order-list']}>
                <h2>Orders</h2>
                {loading ? (
                    <Spinner />
                ) : (
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
                )}
                <button onClick={() => navigate(-1)}>Go back</button>
            </div>
        </div>
    );
};
