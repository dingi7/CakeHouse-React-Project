import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const SingleProductPage = () => {
    const { id } = useParams();
    const [cake, setCake] = useState({});
    useEffect(() => {
        fetch('http://localhost:3030/data/catalog/' + id)
            .then((res) => res.json())
            .then((data) => setCake(data));
    }, [id]);
    return (
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
                            <p>Fiction</p>
                            <span className="price colored">
                                {cake.price}.00лв
                            </span>
                            <p>{cake.description}</p>
                            <p></p>
                            <button
                                type="submit"
                                name="add-to-cart"
                                className="button"
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
