import { Product } from '../Partials/CartProduct';

export const ShoppingCartPage = () => {
    const getCartFromLocalStorage = () => {
        const cartData = localStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : [];
    };
    const cart = getCartFromLocalStorage();
    let totalPrice = 0;
    cart.map((c) => (totalPrice += c.item.price));
    return (
        <div className="containerCart">
            <h1>Shopping Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
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
                                <td colSpan={2}>Subtotal:</td>
                                <td>{totalPrice.toFixed(2)}лв</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>Shipping:</td>
                                <td>5.00лв</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>Total:</td>
                                <td>{(totalPrice + 5).toFixed(2)}лв</td>
                            </tr>
                        </tfoot>
                    </table>
                    <button className="btn">Checkout</button>
                </>
            )}
        </div>
    );
};
