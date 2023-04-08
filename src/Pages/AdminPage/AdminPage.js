import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Order } from '../../components/Orders';
import { User } from '../../components/User';
import styles from './admin-page.module.css';
import {
    authorizeUserPost,
    createProductPost,
    fulfillOrderPost,
    getAllOrdersReq,
    getAllUsersReq,
    getOrderStatistics,
} from '../../utils/request';
import {
    errorNotification,
    successNotification,
} from '../../utils/notificationHandler';
import { Spinner } from '../../components/Spinner/Spinner';

export const AdminPage = () => {
    const { accessData } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [isButtonLoading, setIsButtonLoading] = useState(false)
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        img: '',
    });

    const onFormChangeHandler = (e) => {
        setProductData((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };
    const onFormSubmitHandler = async (e) => {
        e.preventDefault();
        const body = {
            name: productData.name,
            description: productData.description,
            price: productData.price,
            img: productData.img,
        };
        try {
            await createProductPost(accessData.accessToken, body);
            successNotification('Product was successfuly created!');
            setProductData({
                name: '',
                description: '',
                price: '',
                img: '',
            });
        } catch (err) {
            errorNotification(err.message);
        }
    };

    const onOrderFulfill = async (id) => {
        setIsButtonLoading(true)
        try {
            await fulfillOrderPost(id, accessData.accessToken);
            setOrders((state) => state.filter((s) => s._id !== id));
            successNotification('Order was successfully fulfilled!');
        } catch (err) {
            errorNotification(err.message);
        }
        setIsButtonLoading(false)
    };

    const onUserAuthorization = async (id) => {
        setIsButtonLoading(true)
        try {
            await authorizeUserPost(id, accessData.accessToken);
            setUsers((state) =>
                state.map((user) =>
                    user._id === id
                        ? {
                              ...user,
                              autorization:
                                  user.autorization === 'User'
                                      ? 'Admin'
                                      : 'User',
                          }
                        : user
                )
            );
        } catch (err) {
            errorNotification(err.message);
        }
        setIsButtonLoading(false)
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orders = await getAllOrdersReq(accessData.accessToken);
                setOrders(orders);

                const users = await getAllUsersReq(accessData.accessToken);
                setUsers(users);

                const stats = await getOrderStatistics(accessData.accessToken);
                setStatistics(stats);
                setLoading(false);
            } catch (err) {
                errorNotification(err.message);
            }
        };
        fetchData();
    }, [accessData.accessToken]);
    return (
        <div className={styles['admin-page-container']}>
            <div className={styles['user-list']}>
                <h2>Registered Users</h2>
                {users.length === 0 && <Spinner></Spinner>}
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <Spinner></Spinner>}
                        {users.map((u) => (
                            <User
                                onUserAuthorization={onUserAuthorization}
                                key={u._id}
                                isButtonLoading={isButtonLoading}
                                {...u}
                            ></User>
                        ))}
                    </tbody>
                </table>
            </div>
            <div
                className={styles['order-list']}
                style={{ textAlign: 'center' }}
            >
                <h2
                    style={{
                        marginBottom: '0.1em',
                    }}
                >
                    Orders
                </h2>
                {statistics.totalSales ? (
                    <div style={{ textAlign: 'center' }}>
                            <p
                                style={{
                                    marginBottom: '0.3em',
                                    marginTop: '0.3em',
                                }}
                            >
                                Total Sales: {statistics.totalSales.toFixed(2)}
                                лв
                            </p>
                            <p
                                style={{
                                    marginBottom: '0.3em',
                                    marginTop: '0.3em',
                                }}
                            >
                                Sales For The Week:{' '}
                                {statistics.salesForTheWeek.toFixed(2)}лв
                            </p>
                            <p
                                style={{
                                    marginBottom: '0.3em',
                                    marginTop: '0.3em',
                                }}
                            >
                                Best Selling Cake: "
                                {statistics.bestSellingProduct.name}" Sold:{' '}
                                {statistics.bestSellingProduct.sales} Time/s
                            </p>
                    </div>
                ) : (
                    <Spinner></Spinner>
                )}

                {orders.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Buyer</th>
                                <th>Total</th>
                                <th>Ordered Products</th>
                                <th>Delivery</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && <Spinner></Spinner>}
                            {orders.map((o) => (
                                <Order
                                    {...o}
                                    owner={
                                        o.owner
                                            ? o.owner
                                            : {
                                                  name: o.name,
                                                  phoneNumber: o.phoneNumber,
                                              }
                                    }
                                    key={o._id}
                                    onOrderFulfill={onOrderFulfill}
                                    isButtonLoading={isButtonLoading}
                                ></Order>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h3>There are no orders yet.</h3>
                )}
            </div>
            <div className={styles['add-product-form']}>
                <h2>Add New Product</h2>
                <form>
                    <div>
                        <label htmlFor="product-name">Product Name:</label>
                        <input
                            type="text"
                            id="product-name"
                            name="name"
                            value={productData.name}
                            onChange={onFormChangeHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor="product-image">
                            Product Image URL:
                        </label>
                        <input
                            type="text"
                            id="product-image"
                            name="img"
                            value={productData.img}
                            onChange={onFormChangeHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor="product-price">Product Price:</label>
                        <input
                            type="text"
                            id="product-price"
                            name="price"
                            value={productData.price}
                            onChange={onFormChangeHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor="product-description">
                            Product Description:
                        </label>
                        <textarea
                            id="product-description"
                            name="description"
                            value={productData.description}
                            onChange={onFormChangeHandler}
                        ></textarea>
                    </div>
                    <button type="submit" onClick={onFormSubmitHandler}>
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};
