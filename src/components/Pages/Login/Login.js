import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { loginReq } from '../../utils/request';
import { errorNotification } from '../../utils/notificationHandler';

export const LoginPage = () => {
    const { setAccessData } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const onFormChangeHandler = (e) => {
        setUserData((state) => ({ ...state, [e.target.name]: e.target.value }));
    };
    const navigate = useNavigate();

    const onFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginReq(userData.email, userData.password);
            setAccessData(data);
            localStorage.setItem('access_info', JSON.stringify(data));
            navigate('/profile', { replace: true });
        } catch (err) {
            errorNotification(err.message);
        }
    };

    return (
        <>
            <div className="containerLogin">
                <h1>Login</h1>
                <form>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={onFormChangeHandler}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={userData.password}
                        onChange={onFormChangeHandler}
                    />
                    <button
                        data-testid="login-btn"
                        type="submit"
                        className="btn"
                        onClick={onFormSubmit}
                    >
                        Login
                    </button>
                </form>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </>
    );
};
