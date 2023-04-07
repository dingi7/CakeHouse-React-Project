import { useContext, useState } from 'react';
import styles from './checkOut.module.css';
import { Product } from '../../components/CartProduct';
import { Link } from 'react-router-dom';
import {
    clearShoppingCart,
    getCartFromLocalStorage,
} from '../../utils/shoppingCartUtils';
import { AuthContext } from '../../contexts/AuthContext';
import { orderPost } from '../../utils/request';
import { errorNotification } from '../../utils/notificationHandler';
import { Thanks } from '../Thanks/Thanks';

export const CheckOutPage = () => {
    const { accessData } = useContext(AuthContext);
    const { cart, totalPrice } = getCartFromLocalStorage();
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState('');

    const [orderData, setOrderData] = useState({
        deliveryMethod: 'pickup',
        paymentMethod: 'cash',
        address: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
    });

    const onFormChangeHandler = (e) => {
        setOrderData((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const onCheckOut = async (e) => {
        e.preventDefault();
        let products = [];
        cart.map((c) => products.push(c.item.id));
        const body = {
            location:
                orderData.deliveryMethod === 'delivery'
                    ? orderData.address
                    : 'In store pick up',
            paymentMethod: orderData.paymentMethod,
            total: totalPrice,
            products: products,
            firstName: orderData.firstName,
            lastName: orderData.lastName,
            phoneNumber: orderData.phoneNumber,
        };
        try {
            const data = await orderPost(accessData ? accessData.accessToken : null , body);
            clearShoppingCart();
            setIsOrderPlaced(true);
            setOrderId(data._id);
        } catch (err) {
            errorNotification(err.message);
        }
    };
    if (totalPrice > 5 && !isOrderPlaced) {
        return (
            <>
                <h1>Checkout</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((c, index) => (
                            <Product key={`${c.item._id}-${index}`} {...c.item}></Product>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td>Total:</td>
                            <td>{totalPrice.toFixed(2)}лв</td>
                        </tr>
                    </tfoot>
                </table>
                {!accessData && (
                    <div className={styles['checkout']}>
                        <p>
                            <Link to="/login">Login</Link> or continue as guest
                        </p>
                    </div>
                )}
                <div className={styles['checkout']}>
                    <div className={styles['checkout-box']}>
                        <h2 className={styles.checkoutHeader}>Delivery</h2>
                        <br></br>
                        <input
                            type="radio"
                            id="pickup"
                            name="deliveryMethod"
                            value="pickup"
                            checked={orderData.deliveryMethod === 'pickup'}
                            onChange={onFormChangeHandler}
                        />
                        <label htmlFor="pickup">Pickup</label>
                        <input
                            type="radio"
                            id="delivery"
                            name="deliveryMethod"
                            value="delivery"
                            checked={orderData.deliveryMethod === 'delivery'}
                            onChange={onFormChangeHandler}
                        />
                        <label htmlFor="delivery">Delivery</label>
                        {orderData.deliveryMethod === 'delivery' && (
                            <>
                                <label htmlFor="address">Address:</label>
                                <input
                                    type="text"
                                    id="address"
                                    value={orderData.address}
                                    onChange={onFormChangeHandler}
                                />
                            </>
                        )}
                    </div>
                </div>
                <div className={styles['checkout']}>
                    <div className={styles['checkout-box']}>
                        <h2 className={styles.checkoutHeader}>Payment</h2>
                        <input
                            type="radio"
                            id="cash"
                            name="paymentMethod"
                            value="cash"
                            checked={orderData.paymentMethod === 'cash'}
                            onChange={onFormChangeHandler}
                        />
                        <label htmlFor="cash">Cash</label>
                        <input
                            type="radio"
                            id="card"
                            name="paymentMethod"
                            value="card"
                            checked={orderData.paymentMethod === 'card'}
                            onChange={onFormChangeHandler}
                        />
                        <label htmlFor="card">Card</label>
                    </div>
                </div>
                {accessData ? (
                    ''
                ) : (
                    <div className={styles['checkout']}>
                        <div className={styles['checkout-box']}>
                            <h2 className={styles.checkoutHeader}>
                                Personal information
                            </h2>
                            <br></br>
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={orderData.firstName}
                                onChange={onFormChangeHandler}
                            />
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={orderData.lastName}
                                onChange={onFormChangeHandler}
                            />
                            <label htmlFor="phoneNumber">Phone number:</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={orderData.phoneNumber}
                                onChange={onFormChangeHandler}
                            />
                        </div>
                    </div>
                )}

                <div className={styles['checkout']}>
                    <button
                        className={styles.placeOrderButton}
                        onClick={onCheckOut}
                    >
                        Place Order
                    </button>
                </div>
            </>
        );
    } else if (isOrderPlaced) {
        return <Thanks orderId={orderId} />;
    } else {
        return (
            <>
                <h1>Checkout</h1>
                <div className={styles['checkout']}>
                    <p>
                        Your cart is empty, continue{' '}
                        <Link to="/shop">shopping</Link>
                    </p>
                </div>
            </>
        );
    }
};
