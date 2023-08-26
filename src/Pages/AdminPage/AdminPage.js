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
            if (!productData.name || !productData.description || !productData.price || !productData.img) {
                throw new Error('All fields are required!')
            }
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
                setOrders(orders || []);

                const users = await getAllUsersReq(accessData.accessToken);
                setUsers(users);

                const stats = await getOrderStatistics(accessData.accessToken);
                setStatistics(stats);
                
            } catch (err) {
                errorNotification(err.message);
            }
            setLoading(false);
        };
        fetchData();
    }, [accessData.accessToken]);
    return (
        <div className={styles['admin-page-container']}>
            <div className={styles['user-list']}>
                <h2>Регистрирани потребители:</h2>
                {users.length === 0 && <Spinner></Spinner>}
                <table>
                    <thead>
                        <tr>
                            <th>Име</th>
                            <th>Email</th>
                            <th>Роля</th>
                            <th>Действия</th>
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
                    Поръчки
                </h2>
                {statistics.totalSales ? (
                    <div style={{ textAlign: 'center' }}>
                        <p
                            style={{
                                marginBottom: '0.3em',
                                marginTop: '0.3em',
                            }}
                        >
                            Всички продажби: {statistics.totalSales.toFixed(2)}
                            лв
                        </p>
                        <p
                            style={{
                                marginBottom: '0.3em',
                                marginTop: '0.3em',
                            }}
                        >
                            Продажби за седмицата:{' '}
                            {statistics.salesForTheWeek.toFixed(2)}лв
                        </p>
                        <p
                            style={{
                                marginBottom: '0.3em',
                                marginTop: '0.3em',
                            }}
                        >
                            Най-продавана торта: "
                            {statistics.bestSellingProduct.name}" Продадена:{' '}
                            {statistics.bestSellingProduct.sales} Пъти
                        </p>
                    </div>
                ) : (
                    <Spinner></Spinner>
                )}

                {orders.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Купувач</th>
                                <th>Сума</th>
                                <th>Поръчка</th>
                                <th>Доставка</th>
                                <th>Статус</th>
                                <th>Действия</th>
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
                    <h3>Все още няма поръчки.</h3>
                )}
            </div>
            <div className={styles['add-product-form']}>
                <h2>Добави нов продукт</h2>
                <form>
                    <div>
                        <label htmlFor="product-name">Име:</label>
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
                            Снимка на продукта(link):
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
                        <label htmlFor="product-price">Цена:</label>
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
                            Описание:
                        </label>
                        <textarea
                            id="product-description"
                            name="description"
                            value={productData.description}
                            onChange={onFormChangeHandler}
                        ></textarea>
                    </div>
                    <button type="submit" onClick={onFormSubmitHandler}>
                        Добави
                    </button>
                </form>
            </div>
        </div>
    );
};
