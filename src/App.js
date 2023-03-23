import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HomePage } from './components/Pages/Home';
import { Header } from './components/Partials/Header';
import { ShopPage } from './components/Pages/Shop';
import { SingleProductPage } from './components/Pages/SingleProduct';

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
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
