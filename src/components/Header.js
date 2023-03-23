export const Header = () => {
    return (
        <div id="header-wrap">
            <header id="header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="main-logo">
                                <a href="index.html">
                                    <img
                                        src={require('../CakeHouse.png')}
                                        alt="logo"
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="col-md-10">
                            <nav id="navbar">
                                <div className="main-menu stellarnav">
                                    <ul className="menu-list">
                                        <li className="menu-item active">
                                            <a href="#home" data-effect="Home">
                                                Home
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a
                                                href="#about"
                                                className="nav-link"
                                                data-effect="About"
                                            >
                                                About
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a
                                                href="#popular-books"
                                                className="nav-link"
                                                data-effect="Shop"
                                            >
                                                Shop
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a
                                                href="#contact"
                                                className="nav-link"
                                                data-effect="Contact"
                                            >
                                                Contact
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="hamburger">
                                        <span className="bar" />
                                        <span className="bar" />
                                        <span className="bar" />
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};
