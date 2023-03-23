export const InfoSection = () => {
    return (
        <section id="billboard">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="main-slider pattern-overlay">
                            <div className="slider-item">
                                <div className="banner-content">
                                    <h2 className="banner-title">Cake House</h2>
                                    <p>
                                        Cake house is a family owned bakery
                                        based in Sliven, Bulgaria. It offers
                                        various cakes and sweets, avaliable in
                                        house and for delivery.
                                    </p>
                                    <div className="btn-wrap">
                                        <a
                                            href="/"
                                            className="btn btn-outline-accent btn-accent-arrow"
                                        >
                                            Read More
                                            <i className="icon icon-ns-arrow-right" />
                                        </a>
                                    </div>
                                </div>
                                {/*banner-content*/}
                                <img
                                    src={require('../main_banner.jpg')}
                                    alt="banner"
                                    className="banner-image"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
