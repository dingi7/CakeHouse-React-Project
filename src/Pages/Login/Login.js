import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { loginReq } from '../../utils/request';
import { errorNotification } from '../../utils/notificationHandler';
import { Spinner } from '../../components/Spinner/Spinner';

export const LoginPage = () => {
    const { setAccessData } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const onFormChangeHandler = (e) => {
        setUserData((state) => ({ ...state, [e.target.name]: e.target.value }));
    };
    const navigate = useNavigate();

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await loginReq(userData.email, userData.password);
            setAccessData(data);
            localStorage.setItem('access_info', JSON.stringify(data));
            navigate('/profile', { replace: true });
        } catch (err) {
            errorNotification(err.message);
        }
        setLoading(false);
    };

    return (
        <>
            <div className="containerLogin">
                <h1>Вход</h1>
                <form>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={onFormChangeHandler}
                        placeholder='Напр: ivan@abv.bg'
                    />
                    <label htmlFor="password">Парола</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={userData.password}
                        onChange={onFormChangeHandler}
                        placeholder='*****'
                    />
                    <button
                        data-testid="login-btn"
                        type="submit"
                        className="btn"
                        onClick={onFormSubmit}
                    >
                        {loading ? <Spinner/> : "Login"}
                    </button>
                </form>
                <p>
                    Нямате профил? <Link to="/register">Регистрирайте се</Link>
                </p>
            </div>
        </>
    );
};
