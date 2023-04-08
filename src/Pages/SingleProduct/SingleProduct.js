import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    errorNotification,
    successNotification,
} from '../../utils/notificationHandler';
import { getSingleProductReq } from '../../utils/request';
import styles from './Cake.module.css';

export const SingleProductPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [cake, setCake] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const product = await getSingleProductReq(id);
                setCake(product);
            } catch (err) {
                errorNotification(err.message);
                navigate('/404');
            }
        };
        fetchData();
    }, [id, navigate]);
    const saveCartToLocalStorage = (cartData) => {
        localStorage.setItem('cart', JSON.stringify(cartData));
    };
    const getCartFromLocalStorage = () => {
        const cartData = localStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : [];
    };
    const [cart, setCart] = useState(getCartFromLocalStorage());
    const addToCart = () => {
        const item = {
            name: cake.name,
            price: cake.price,
            img: cake.img,
            id: cake._id,
        };
        const updatedCart = [...cart, { item }];
        setCart(updatedCart);
        saveCartToLocalStorage(updatedCart);
        successNotification('Item successfuly added to your shopping cart!');
    };
    return (
        <section className={`${styles.paddingLarge}`}>
            <div className={`${styles.container}`}>
                <div className={`${styles.row}`}>
                    <div className={`col-md-6 ${styles.col}`}>
                        <img
                            src={cake.img}
                            alt="banner"
                            className={styles.image}
                        />
                    </div>
                    <div className={`col-md-6 pl-5 ${styles.col}`}>
                        <div className={styles.productDetail}>
                            <h1>{cake.name}</h1>
                            <p>Cake House</p>
                            <span>{cake.description}</span>
                            <p className={`${styles.price}`}>
                                {cake.price.toFixed(2)}лв
                            </p>
                            <button
                                type="submit"
                                name="add-to-cart"
                                onClick={addToCart}
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
