import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { registerReq } from '../../utils/request';
import { errorNotification } from '../../utils/notificationHandler';
import { Spinner } from '../../components/Spinner/Spinner';

export const RegisterPage = () => {
    const { setAccessData } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        email: '',
        name: '',
        phoneNumber: '',
        password: '',
        rePassword: '',
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
            if(userData.password !== userData.rePassword){
                throw new Error('Passwords don\'t match!')
            }
            const data = await registerReq(
                userData.email,
                userData.name,
                userData.phoneNumber,
                userData.password
            );
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
                    <label htmlFor="rePassword">Repeat Password</label>
                    <input
                        type="password"
                        id="rePassword"
                        name="rePassword"
                        value={userData.rePassword}
                        onChange={onFormChangeHandler}
                    />
                    <button
                        type="submit"
                        className="btn"
                        onClick={onFormSubmit}
                    >
                        {loading ? <Spinner /> : 'Register'}
                    </button>
                </form>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </>
    );
};
