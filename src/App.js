import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HomePage } from './Pages/Home/Home';
import { Header } from './Layouts/Header';
import { ShopPage } from './Pages/Shop';
import { SingleProductPage } from './Pages/SingleProduct';
import { LoginPage } from './Pages//Login/Login';
import { RegisterPage } from './Pages//Register';
import { ShoppingCartPage } from './Pages//ShoppingCart';
import { ProfilePage } from './Pages//Profile/Profile';
import { CheckOutPage } from './Pages//CheckOut/CheckOut';
import { ToastContainer } from 'react-toastify';
import { LockedRoute } from './Routes/LockedRoute';
import { PublicRoute } from './Routes/PublicRoute';
import { PrivateRoute } from './Routes/PrivateRoute';
import { AdminPage } from './Pages/AdminPage/AdminPage';
import { Logout } from './Pages/Logout';
import { About } from './Pages/About/About';
import { Orders } from './Pages/Orders/Orders';
import { ContactPage } from './Pages/Contact/ContactPage';

function App() {
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
            <Header></Header>
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
