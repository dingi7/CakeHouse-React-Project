import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HomePage } from './components/Pages/Home';
import { Header } from './components/Partials/Header';
import { ShopPage } from './components/Pages/Shop';
import { SingleProductPage } from './components/Pages/SingleProduct';
import { LoginPage } from './components/Pages/Login';
import { RegisterPage } from './components/Pages/Register';
import { ShoppingCartPage } from './components/Pages/ShoppingCart';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header></Header>
                <Routes>
                    <Route path="*" element={<h1 className="page-title">404</h1>} />
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/shop" element={<ShopPage/>} />
                    <Route path="/shop/:id" element={<SingleProductPage/>} />
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/register" element={<RegisterPage/>} />
                    <Route path="/cart" element={<ShoppingCartPage/>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
