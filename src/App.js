import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HomePage } from './Pages/Home/Home';
import { Header } from './Layouts/Header';
import { ShopPage } from './Pages/Shop/Shop';
import { SingleProductPage } from './Pages/SingleProduct/SingleProduct';
import { LoginPage } from './Pages//Login/Login';
import { RegisterPage } from './Pages/Register/Register';
import { ShoppingCartPage } from './Pages/ShoppingCart/ShoppingCart';
import { ProfilePage } from './Pages//Profile/Profile';
import { CheckOutPage } from './Pages//CheckOut/CheckOut';
import { ToastContainer } from 'react-toastify';
import { LockedRoute } from './Routes/LockedRoute';
import { PublicRoute } from './Routes/PublicRoute';
import { PrivateRoute } from './Routes/PrivateRoute';
import { AdminPage } from './Pages/AdminPage/AdminPage';
import { Logout } from './Pages/Logout/Logout';
import { About } from './Pages/About/About';
import { Orders } from './Pages/Orders/Orders';
import { ContactPage } from './Pages/Contact/ContactPage';
import { MobileHeader } from './Layouts/MobileHeader';
import { useEffect, useState } from 'react';

function App() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 768);
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <BrowserRouter>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            {isMobile ? <MobileHeader /> : <Header />}
            <Routes>
                <Route path="*" element={<h1 className="page-title">404</h1>} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/shop/:id" element={<SingleProductPage />} />
                <Route
                    path="/admin"
                    element={<LockedRoute component={AdminPage} />}
                ></Route>
                <Route
                    path="/login"
                    element={<PublicRoute component={LoginPage} />}
                ></Route>
                <Route
                    path="/register"
                    element={<PublicRoute component={RegisterPage} />}
                ></Route>
                <Route
                    path="/logout"
                    element={<PrivateRoute component={Logout} />}
                ></Route>
                <Route
                    path="/orders"
                    element={<PrivateRoute component={Orders} />}
                ></Route>
                <Route
                    path="/profile"
                    element={<PrivateRoute component={ProfilePage} />}
                ></Route>
                <Route path="/checkout" element={<CheckOutPage />}></Route>
                <Route path="/cart" element={<ShoppingCartPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
