import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    errorNotification,
    successNotification,
} from '../../utils/notificationHandler';
import { getSingleProductReq } from '../../utils/request';
import styles from './Cake.module.css';
import { Spinner } from '../../components/Spinner/Spinner';

export const SingleProductPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [cake, setCake] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const product = await getSingleProductReq(id);
                setCake(product);
            } catch (err) {
                errorNotification(err.message);
                navigate('/404');
            }
            setLoading(false);
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
    if (loading) {
        return <Spinner></Spinner>;
    }
    return (
        <>
            <section className={`${styles.paddingLarge}`}>
                <div className={`${styles.container}`}>
                    <div className={`${styles.row}`}>
                        {loading && <Spinner></Spinner>}
                        <div className={`col-md-6 ${styles.col}`}>
                            <img
                                src={cake.img}
                                alt="banner"
                                className={styles.image}
                                onLoadStart={() => {
                                    setLoading(true);
                                }}
                                onLoad={() => {
                                    setLoading(false);
                                }}
                            />
                        </div>
                        <div className={`col-md-6 pl-5 ${styles.col}`}>
                            <div className={styles.productDetail}>
                                <h1>{cake.name}</h1>
                                <p style={{ marginBottom: '0.1em' }}>
                                    Description:{' '}
                                </p>
                                <span
                                    style={{
                                        marginTop: '0.1em',
                                        marginBottom: '2em',
                                    }}
                                >
                                    {cake.description}
                                </span>
                                <p
                                    style={{
                                        marginBottom: '0.1em',
                                        marginTop: '1em',
                                    }}
                                >
                                    Price:{' '}
                                </p>
                                <p
                                    style={{ marginTop: '0.1em' }}
                                    className={`${styles.price}`}
                                >
                                    {cake.price}лв
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
        </>
    );
};
