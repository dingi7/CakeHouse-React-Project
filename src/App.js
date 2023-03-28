import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HomePage } from './components/Pages/Home';
import { Header } from './components/Partials/Header';
import { ShopPage } from './components/Pages/Shop';
import { SingleProductPage } from './components/Pages/SingleProduct';
import { LoginPage } from './components/Pages/Login';
import { RegisterPage } from './components/Pages/Register';
import { ShoppingCartPage } from './components/Pages/ShoppingCart';
import { ProfilePage } from './components/Pages/Profile/Profile';
import { CheckOutPage } from './components/Pages/CheckOut/CheckOut';
import { ToastContainer } from 'react-toastify';
import { PrivateRoute } from './components/Pages/Routes/PrivateRoute';
import { PublicRoute } from './components/Pages/Routes/PublicRoute';
import { LockedRoute } from './components/Pages/Routes/LockedRoute';

function App() {
    // const [isReady, setIsReady] = useState(true);
    // const debouncedSetAccessToken = debounce(setAccessToken, 5000);
    // useEffect(() => {
    //     console.log('Ran');
    //     const storedAccessToken = localStorage.getItem('access_info');
    //     if (storedAccessToken) {
    //         try {
    //             const parsedAccessToken = JSON.parse(storedAccessToken);
    //             if (accessToken === parsedAccessToken) {
    //                 return;
    //             }
    //             debouncedSetAccessToken(parsedAccessToken);
    //         } catch (error) {
    //             console.error('Failed to parse access token:', error);
    //             localStorage.setItem('access_info', {});
    //             <Navigate to="/login"></Navigate>;
    //         }
    //     }
    //     setIsReady(true);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // setTimeout(() => {
    //     setIsReady(true);
    // }, 2000);
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
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/shop/:id" element={<SingleProductPage />} />
                <Route
                    path="/admin"
                    element={<LockedRoute component={HomePage} />}
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
