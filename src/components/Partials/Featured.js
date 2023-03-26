import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cake } from './Cake';
import { AnimationOnScroll } from 'react-animation-on-scroll';

export const Featured = () => {
    const [cakes, setCakes] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3030/data/catalog')
            .then((res) => res.json())
            .then((data) => setCakes(data));
    }, []);
    return (
        <section id="featured-books">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-header align-center">
                            <div className="title">
                                <span>Some quality items</span>
                            </div>
                            <h2 className="section-title">Featured Sweets</h2>
                        </div>
                        <div className="product-list" data-aos="">
                            <div className="row">
                                <AnimationOnScroll animateIn="animate__backInUp">
                                    {cakes.slice(0, 4).map((c) => (
                                        <div className="col-md-3" key={c._id}>
                                            {' '}
                                            <Cake {...c}></Cake>{' '}
                                        </div>
                                    ))}
                                </AnimationOnScroll>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="btn-wrap align-right">
                            <Link to="/shop">
                                <a href="/shop" className="btn-accent-arrow">
                                    View all products{' '}
                                    <i className="icon icon-ns-arrow-right" />
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
