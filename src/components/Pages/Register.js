import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../AuthContext';
import 'react-toastify/dist/ReactToastify.css';

export const RegisterPage = () => {
    const { setAccessToken } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        email: '',
        name: '',
        phoneNumber: '',
        password: '',
    });

    const onFormChangeHandler = (e) => {
        setUserData((state) => ({ ...state, [e.target.name]: e.target.value }));
    };
    const navigate = useNavigate()
    const onFormSubmit = async (e) => {
        e.preventDefault();
        const resp = await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userData.email,
                name: userData.name,
                phoneNumber: userData.phoneNumber,
                password: userData.password,
            }),
        });
        const data = await resp.json();
        if (!resp.ok === 400) {
            toast.error(data.message, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
        const token = data.accessToken;
        localStorage.setItem('access_token', token);
        setAccessToken(token);
        navigate('/', { replace: true });
    };

    return (
        <>
            <div className="containerLogin">
                <h1>Register</h1>
                <form>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={onFormChangeHandler}
                    />
                    <label htmlFor="password">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={onFormChangeHandler}
                    />
                    <label htmlFor="password">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={userData.phoneNumber}
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
                        type="submit"
                        className="btn"
                        onClick={onFormSubmit}
                    >
                        Register
                    </button>
                </form>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
};
