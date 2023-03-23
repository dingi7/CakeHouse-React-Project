import { useEffect, useState } from 'react';
import { Cake } from '../Partials/Cake';

export const ShopPage = () => {
    const [cakes, setCakes] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3030/data/catalog')
            .then((res) => res.json())
            .then((data) => setCakes(data));
    }, []);

    return (
        <>
            <h1 className="page-title">Shop</h1>
            <section className="padding-large">
                <div className="container">
                    <div className="row">
                        <div className="products-grid grid">
                            {cakes.map((c) => (
                                <Cake {...c} key={c._id}></Cake>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
