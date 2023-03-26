import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { HomePage } from './components/Pages/Home';
import { Header } from './components/Partials/Header';
import { ShopPage } from './components/Pages/Shop';
import { SingleProductPage } from './components/Pages/SingleProduct';
import { LoginPage } from './components/Pages/Login';
import { RegisterPage } from './components/Pages/Register';
import { ShoppingCartPage } from './components/Pages/ShoppingCart';
import { useContext, useEffect } from 'react';
import { AuthContext } from './components/AuthContext';
import { ProfilePage } from './components/Pages/Profile/Profile';
import { CheckOutPage } from './components/Pages/CheckOut/CheckOut';

function App() {
    const { setAccessToken, accessToken  } = useContext(AuthContext);
    useEffect(() => {
        const storedAccessToken = localStorage.getItem('access_info');
        if (storedAccessToken) {
            try {
                const parsedAccessToken = JSON.parse(storedAccessToken);
                setAccessToken(parsedAccessToken);
            } catch (error) {
                console.error('Failed to parse access token:', error);
                localStorage.setItem('access_info', {}); 
                <Navigate to="/login"></Navigate>
            }
        }
    }, [setAccessToken]);
    return (
        <BrowserRouter>
            <div className="App">
                <Header></Header>
                <Routes>
                    <Route
                        path="*"
                        element={<h1 className="page-title">404</h1>}
                    />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/shop/:id" element={<SingleProductPage />} />
                    <Route path="/login" element={accessToken ? <Navigate to='/' replace={true} state={{ error: 'You are already loged in!' }}/> : <LoginPage />} />
                    <Route path="/register" element={accessToken ? <Navigate to='/' replace={true} state={{ error: 'You are already loged in!' }}/> : <RegisterPage />} />
                    <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
                    <Route path="/checkout" element={<CheckOutPage/>}></Route>
                    {/* <Route path="/cart" element={!accessToken ? <Navigate to='/' replace={true} state={{ error: 'You need to be loged in to view this page!' }}/> : <ShoppingCartPage />} /> */}
                    <Route path="/cart" element={<ShoppingCartPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
