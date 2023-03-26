import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SingleProductPage = () => {
    const { accessToken } = useContext(AuthContext);
    const { id } = useParams();
    const [cake, setCake] = useState({});
    useEffect(() => {
        fetch('http://localhost:3030/data/catalog/' + id)
            .then((res) => res.json())
            .then((data) => setCake(data));
    }, [id]);
    const saveCartToLocalStorage = (cartData) => {
        localStorage.setItem('cart', JSON.stringify(cartData));
    };
    const getCartFromLocalStorage = () => {
        const cartData = localStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : [];
    };
    const [cart, setCart] = useState(getCartFromLocalStorage());
    const addToCart = () => {
        if (!accessToken) {
            toast.error(
                'Please log in to be able to add this item to your shopping cart!',
                {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                }
            );
            return;
        }
        const item = {
            name: cake.name,
            price: cake.price,
            img: cake.img,
            id: cake._id,
        };
        const updatedCart = [...cart, { item }];
        setCart(updatedCart);
        saveCartToLocalStorage(updatedCart);
        // [2].item.name
    };
    return (
        <>
            <section className="bg-sand padding-large">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            {/* <img src={cake.img} alt="banner" /> */}
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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
};
