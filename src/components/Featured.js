import { Cake } from './Cake';

export const Featured = () => {
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
                                <Cake></Cake>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="btn-wrap align-right">
                            <a href="/shop" className="btn-accent-arrow">
                                View all products{' '}
                                <i className="icon icon-ns-arrow-right" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
