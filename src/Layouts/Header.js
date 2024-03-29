import { Link, NavLink } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from '../contexts/AuthContext';
import './Header.css';
// import { AuthContext } from '../../contexts/AuthContext';

export const Header = () => {
    // const { isAuth, isAdmin } = useContext(AuthContext);

    return (
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
                                <div className="main-menu stellarnav">
                                    <ul className="menu-list">
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
                                                Асортимент
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
                                        {/* {isAuth ? (
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
                                        )} */}

                                        {/* <li className="menu-item">
                                            <NavLink to="/cart">
                                                <i
                                                    className="fa fa-shopping-cart fa-lg"
                                                    aria-hidden="true"
                                                ></i>
                                            </NavLink>
                                        </li> */}
                                    </ul>
                                </div>
                                
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};
