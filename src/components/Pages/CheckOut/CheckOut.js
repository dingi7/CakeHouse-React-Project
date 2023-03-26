import { useContext, useState } from 'react';
import styles from './checkOut.module.css';
import { Product } from '../../Partials/CartProduct';
import { AuthContext } from '../../AuthContext';

export const CheckOutPage = () => {
    const { accessToken } = useContext(AuthContext);
    const getCartFromLocalStorage = () => {
        const cartData = localStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : [];
    };
    const cart = getCartFromLocalStorage();
    const [deliveryMethod, setDeliveryMethod] = useState('delivery');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [address, setAddress] = useState('');

    const handleDeliveryMethodChange = (event) => {
        setDeliveryMethod(event.target.value);
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    let totalPrice = 0;
    cart.map((c) => (totalPrice += c.item.price));
    const onCheckOut = async (e) => {
        e.preventDefault();
        let products = [];
        cart.map((c) => products.push(c.item.id));
        const responce = await fetch('http://localhost:3030/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-authorization': accessToken.accessToken,
            },
            body: JSON.stringify({
                location:
                    deliveryMethod === 'delivery'
                        ? address
                        : 'In store pick up',
                paymentMethod: paymentMethod,
                total: totalPrice,
                products: products,
            }),
        });
        // const data = await responce.json();
        if (!responce.ok === 400) {
            // handle error
        }
        // redirect
        // clear cart
    };

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

            {/* <div className={styles.checkout}> */}
            <div className={styles['checkout']}>
                <div className={styles['checkout-box']}>
                    <h2 className={styles.checkoutHeader}>Delivery</h2>
                    <input
                        type="radio"
                        id="delivery"
                        name="deliveryMethod"
                        value="delivery"
                        checked={deliveryMethod === 'delivery'}
                        onChange={handleDeliveryMethodChange}
                    />
                    <label htmlFor="delivery">Delivery</label>
                    <input
                        type="radio"
                        id="pickup"
                        name="deliveryMethod"
                        value="pickup"
                        checked={deliveryMethod === 'pickup'}
                        onChange={handleDeliveryMethodChange}
                    />
                    <label htmlFor="pickup">Pickup</label>
                    {deliveryMethod === 'delivery' && (
                        <>
                            <label htmlFor="address">Address:</label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                onChange={handleAddressChange}
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
                        checked={paymentMethod === 'card'}
                        onChange={handlePaymentMethodChange}
                    />
                    <label htmlFor="card">Card</label>
                    <input
                        type="radio"
                        id="cash"
                        name="paymentMethod"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={handlePaymentMethodChange}
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

            {/* </div> */}
        </>
    );
};
