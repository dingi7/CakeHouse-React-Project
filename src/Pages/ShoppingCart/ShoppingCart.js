import { Link } from 'react-router-dom';
import { Product } from '../../components/CartProduct';
import { getCartFromLocalStorage } from '../../utils/shoppingCartUtils';

export const ShoppingCartPage = () => {
    const { cart, totalPrice } = getCartFromLocalStorage();
    return (
        <div className="containerCart">
            <h1>Количка</h1>
            {cart.length === 0 ? (
                <p>Все още няма нищо тук.</p>
            ) : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Снимка</th>
                                <th>Име</th>
                                <th>Цена</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((c, index) => (
                                <Product
                                    key={`${c.item._id}-${index}`}
                                    {...c.item}
                                ></Product>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={2}>Общо:</td>
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
                    <Link to="/checkout">
                        <button className="btn">Checkout</button>
                    </Link>
                </>
            )}
        </div>
    );
};
