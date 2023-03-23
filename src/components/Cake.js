export const Cake = () => {
    return (
        <div className="col-md-3">
            <figure className="product-style">
                <img
                    src={require('../product-item1.jpg')} 
                    alt="Books"
                    className="product-item"
                />
                <button
                    type="button"
                    className="add-to-cart"
                    data-product-tile="add-to-cart"
                >
                    Add to Cart
                </button>
                <figcaption>
                    <h3>Simple way of piece life</h3>
                    <p>Armor Ramsey</p>
                    <div className="item-price">$ 40.00</div>
                </figcaption>
            </figure>
        </div>
    );
};
