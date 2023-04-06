import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { errorNotification, successNotification } from '../utils/notificationHandler';
import { getSingleProductReq } from '../utils/request';

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
        successNotification('Item successfuly added to your shopping cart!')
    };
    return (
        <>
            <section className="bg-sand padding-large">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={cake.img} alt="banner" />
                        </div>
                        <div className="col-md-6 pl-5">
                            <div className="product-detail">
                                <h1>{cake.name}</h1>
                                <p>Cake House</p>
                                <span>{cake.description}</span>
                                <p className="price colored">
                                    {cake.price}.00лв
                                </p>
                                <button
                                    type="submit"
                                    name="add-to-cart"
                                    className="button"
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
