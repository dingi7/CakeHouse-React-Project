import { useEffect, useState } from 'react';
import { Cake } from '../../components/Cake';
import { getProductsReq } from '../../utils/request';
import { errorNotification } from '../../utils/notificationHandler';

export const ShopPage = () => {
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
        <>
            <h1 className="page-title">Магазин</h1>
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
