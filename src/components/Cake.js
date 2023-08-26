import { useState } from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { Link } from 'react-router-dom';
import { Spinner } from './Spinner/Spinner';

export const Cake = ({ name, price, img, _id }) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };
    return (
        <figure className="product-style">
            <AnimationOnScroll animateIn="animate__fadeIn">
                {isLoading && <Spinner></Spinner>}
                <img
                    src={img}
                    alt="Sweet"
                    className="product-item"
                    onLoad={handleImageLoad}
                />
            </AnimationOnScroll>
            <Link to={'/shop/' + _id}>
                <button
                    type="button"
                    className="add-to-cart"
                    data-product-tile="add-to-cart"
                >
                    Добави в количка
                </button>
            </Link>
            <figcaption>
                <h3>{name}</h3>
                <p>Cake House</p>
                <div className="item-price">{price}лв</div>
            </figcaption>
        </figure>
    );
};
