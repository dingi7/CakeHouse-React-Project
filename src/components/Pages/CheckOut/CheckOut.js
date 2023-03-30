import { useContext, useState } from 'react';
import styles from './checkOut.module.css';
import { Product } from '../../Partials/CartProduct';
import { Link } from 'react-router-dom';
import {
    clearShoppingCart,
    getCartFromLocalStorage,
} from '../../utils/shoppingCartUtils';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { Thanks } from '../../Partials/Thanks/Thanks';

export const CheckOutPage = () => {
    const { accessData } = useContext(AuthContext);
    const { cart, totalPrice } = getCartFromLocalStorage();
    const [isOrderPlaced, setIsOrderPlaced] = useState(false)
    const [orderId, setOrderId] = useState('')

    const [orderData, setOrderData] = useState({
        deliveryMethod: 'pickup',
        paymentMethod: 'card',
        address: '',
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
        const responce = await fetch('http://localhost:3030/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-authorization': accessData.accessToken,
            },
            body: JSON.stringify({
                location:
                    orderData.deliveryMethod === 'delivery'
                        ? orderData.address
                        : 'In store pick up',
                paymentMethod: orderData.paymentMethod,
                total: totalPrice,
                products: products,
            }),
        });
        const data = await responce.json();
        if (!responce.ok) {
            toast.error(data.message, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }
        clearShoppingCart();
        setIsOrderPlaced(true);
        setOrderId(data._id);
    };
    if (totalPrice > 0 && !isOrderPlaced) {
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
                        {cart.map((c) => (
                            <Product key={c.item._id} {...c.item}></Product>
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

                <div className={styles['checkout']}>
                    <div className={styles['checkout-box']}>
                        <h2 className={styles.checkoutHeader}>Delivery</h2>
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
                            id="card"
                            name="paymentMethod"
                            value="card"
                            checked={orderData.paymentMethod === 'card'}
                            onChange={onFormChangeHandler}
                        />
                        <label htmlFor="card">Card</label>
                        <input
                            type="radio"
                            id="cash"
                            name="paymentMethod"
                            value="cash"
                            checked={orderData.paymentMethod === 'cash'}
                            onChange={onFormChangeHandler}
                        />
                        <label htmlFor="cash">Cash</label>
                    </div>
                    <button
                        className={styles.placeOrderButton}
                        onClick={onCheckOut}
                    >
                        Place Order
                    </button>
                </div>
            </>
        );
    } else if(isOrderPlaced){
        return(
            <Thanks orderId={orderId}/>
        )
    }
    else {
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
