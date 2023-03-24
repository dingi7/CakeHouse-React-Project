import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
    return (
        <div id="header-wrap">
            <header id="header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="main-logo">
                                <Link to="/">
                                <a href="index.html">
                                    <img
                                        src={require('../../CakeHouse.png')}
                                        alt="logo"
                                    />
                                </a>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-10">
                            <nav id="navbar">
                                <div className="main-menu stellarnav">
                                    <ul className="menu-list">
                                        <li className="menu-item ">
                                        <NavLink data-effect="Home" className={({isActive}) => isActive ? 'active' : 'menu-item nav-link' } to="/">Home</NavLink>
                                        </li>
                                        <li className="menu-item">
                                        <NavLink data-effect="About" className={({isActive}) => isActive ? 'active' : 'menu-item nav-link' } to="/about">About</NavLink>
                                        </li>
                                        <li className="menu-item">
                                        <NavLink data-effect="Shop" className={({isActive}) => isActive ? 'active' : 'menu-item nav-link' } to="/shop">Shop</NavLink>
                                        </li>
                                        <li className="menu-item">
                                        <NavLink data-effect="Contact" className={({isActive}) => isActive ? 'active' : 'menu-item nav-link' } to="/contact">Contact</NavLink>
                                        </li>
                                        {/* <li className="menu-item">
                                        <NavLink class="cart for-buy" to="/contact"><i class="icon icon-clipboard"></i><span>Cart:(0 лв)</span></NavLink>
                                        </li> */}
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
