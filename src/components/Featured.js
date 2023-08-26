import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cake } from './Cake';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { errorNotification } from '../utils/notificationHandler';
import { getProductsReq } from '../utils/request';

export const Featured = () => {
    const [cakes, setCakes] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await getProductsReq();
                setCakes(products);
            } catch (err) {
                errorNotification(err.message);
            }
        };
        fetchData();
    }, []);
    return (
        <section id="featured-books">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-header align-center">
                            <div className="title">
                                <span>Сладки предложения</span>
                            </div>
                            <h2 className="section-title">Препоръчани</h2>
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
                            <Link to="/shop" className="btn-accent-arrow">
                                Вижте всички продукти{' '}
                                <i className="icon icon-ns-arrow-right" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
