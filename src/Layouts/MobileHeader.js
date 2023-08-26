import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export const MobileHeader = () => {
    const { isAuth, isAdmin } = useContext(AuthContext);
    const [isMenuActive, setIsMenuActive] = useState(false);
    const onMenuClick = (e) => {
        e.preventDefault();
        setIsMenuActive(!isMenuActive);
    };
    return (
        <>
            <div id="header-wrap">
                <header id="header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2">
                                <div className="main-logo">
                                    <Link to="/">
                                        <img
                                            src={require('../assets/logo.png')}
                                            alt="logo"
                                        />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-10">
                                <nav id="navbar">
                                    <div className="main-menu stellarnav mobile">
                                        <a
                                            href="/"
                                            className="menu-toggle full"
                                            onClick={onMenuClick}
                                        >
                                            <span className="bars">
                                                <span />
                                                <span />
                                                <span />
                                            </span>{' '}
                                            Меню
                                        </a>
                                        <ul
                                            className="menu-list"
                                            style={{
                                                display: isMenuActive
                                                    ? 'block'
                                                    : 'none',
                                            }}
                                        >
                                            <li className="menu-item ">
                                                <NavLink
                                                    data-effect="Home"
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? 'active'
                                                            : 'menu-item nav-link'
                                                    }
                                                    to="/"
                                                >
                                                    Начало
                                                </NavLink>
                                            </li>
                                            <li className="menu-item">
                                                <NavLink
                                                    data-effect="About"
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? 'active'
                                                            : 'menu-item nav-link'
                                                    }
                                                    to="/about"
                                                >
                                                    За Нас
                                                </NavLink>
                                            </li>
                                            <li className="menu-item">
                                                <NavLink
                                                    data-effect="Shop"
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? 'active'
                                                            : 'menu-item nav-link'
                                                    }
                                                    to="/shop"
                                                >
                                                    Магазин
                                                </NavLink>
                                            </li>
                                            <li className="menu-item">
                                                <NavLink
                                                    data-effect="Contact"
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? 'active'
                                                            : 'menu-item nav-link'
                                                    }
                                                    to="/contact"
                                                >
                                                    Връзки
                                                </NavLink>
                                            </li>
                                            <li className="menu-item">
                                                <NavLink
                                                    data-effect="Cart"
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? 'active'
                                                            : 'menu-item nav-link'
                                                    }
                                                    to="/cart"
                                                >Количка 
                                                </NavLink>
                                            </li>
                                            {isAuth ? (
                                                <>
                                                    <li className="menu-item">
                                                        <NavLink
                                                            data-effect="Profile"
                                                            className={({
                                                                isActive,
                                                            }) =>
                                                                isActive
                                                                    ? 'active'
                                                                    : 'menu-item nav-link'
                                                            }
                                                            to="/profile"
                                                        >
                                                            Профил
                                                        </NavLink>
                                                    </li>
                                                    {isAdmin && (
                                                        <li className="menu-item">
                                                            <NavLink
                                                                data-effect="Register"
                                                                className={({
                                                                    isActive,
                                                                }) =>
                                                                    isActive
                                                                        ? 'active'
                                                                        : 'menu-item nav-link'
                                                                }
                                                                to="/admin"
                                                            >
                                                                Admin
                                                            </NavLink>
                                                        </li>
                                                    )}
                                                    <li className="menu-item">
                                                        <NavLink
                                                            data-effect="Logout"
                                                            className={({
                                                                isActive,
                                                            }) =>
                                                                isActive
                                                                    ? 'active'
                                                                    : 'menu-item nav-link'
                                                            }
                                                            to="/logout"
                                                        >
                                                            Изход
                                                        </NavLink>
                                                    </li>
                                                </>
                                            ) : (
                                                <>
                                                    <li className="menu-item">
                                                        <NavLink
                                                            data-effect="Login"
                                                            className={({
                                                                isActive,
                                                            }) =>
                                                                isActive
                                                                    ? 'active'
                                                                    : 'menu-item nav-link'
                                                            }
                                                            to="/login"
                                                        >
                                                            Вход
                                                        </NavLink>
                                                    </li>
                                                    <li className="menu-item">
                                                        <NavLink
                                                            data-effect="Register"
                                                            className={({
                                                                isActive,
                                                            }) =>
                                                                isActive
                                                                    ? 'active'
                                                                    : 'menu-item nav-link'
                                                            }
                                                            to="/register"
                                                        >
                                                            Регистрация
                                                        </NavLink>
                                                    </li>
                                                </>
                                            )}
                                        </ul>
                                        <div className="hamburger">
                                            <span className="bar" />
                                            <span className="bar" />
                                            <span className="bar" />
                                        </div>
                                    </div>
                                    <div className="main-menu stellarnav"></div>
                                    
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </>
    );
};
