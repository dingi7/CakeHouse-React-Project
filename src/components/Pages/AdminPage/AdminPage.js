import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext';
import { Order } from '../../Partials/Orders';
import { User } from '../../Partials/User';
import styles from './admin-page.module.css';

export const AdminPage = () => {
    const { accessData } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
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
        const response = await fetch(`http://localhost:3030/data/catalog`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-authorization': accessData.accessToken,
            },
            body: JSON.stringify({
                name: productData.name,
                description: productData.description,
                price: productData.price,
                img: productData.img,
            }),
        });
        const data = await response.json();
        if (!response.ok) {
            toast.error(data.message, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        } else {
            toast.success('Product successfuly created!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            setProductData({
                name: '',
                description: '',
                price: '',
                img: '',
            });
        }
    };

    const onOrderFulfill = async (id) => {
        const response = await fetch(
            `http://localhost:3030/orders/${id}/fulfill`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-authorization': accessData.accessToken,
                },
            }
        );
        const data = await response.json();
        if (!response.ok) {
            toast.error(data.message, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }
        setOrders((state) => state.filter((s) => s._id !== id));
    };

    const onUserAuthorization = async (id) => {
        const response = await fetch(
            `http://localhost:3030/users/authorize/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-authorization': accessData.accessToken,
                },
            }
        );
        const data = await response.json();
        if (!response.ok) {
            toast.error(data.message, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }
        setUsers((state) =>
            state.map((user) =>
                user._id === id
                    ? {
                          ...user,
                          autorization:
                              user.autorization === 'User' ? 'Admin' : 'User',
                      }
                    : user
            )
        );
    };

    useEffect(() => {
        fetch('http://localhost:3030/orders', {
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
                    throw new Error('You are not authorized!');
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
        fetch('http://localhost:3030/users', {
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
                    throw new Error('You are not authorized!');
                }
            })
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error('There was a problem fetching the users:', error);
            });
    }, [accessData.accessToken]);
    return (
        <div className={styles['admin-page-container']}>
            <div className={styles['user-list']}>
                <h2>Registered Users</h2>
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
                        {users.map((u) => (
                            <User
                                onUserAuthorization={onUserAuthorization}
                                key={u._id}
                                {...u}
                            ></User>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles['order-list']}>
                <h2>Orders</h2>
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
                        {orders.map((o) => (
                            <Order
                                {...o}
                                key={o._id}
                                onOrderFulfill={onOrderFulfill}
                            ></Order>
                        ))}
                    </tbody>
                </table>
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
