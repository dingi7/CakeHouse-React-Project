import { AnimationOnScroll } from 'react-animation-on-scroll';
import { Link } from 'react-router-dom';

export const Cake = ({ name, price, img, _id }) => {
    return (
        <figure className="product-style">
            <AnimationOnScroll animateIn="animate__fadeIn">
            <img src={img} alt="Sweet" className="product-item" />
                </AnimationOnScroll>
            <Link to={"/shop/" + _id}>
            <button
                type="button"
                className="add-to-cart"
                data-product-tile="add-to-cart"
            >
                Add to Cart
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
