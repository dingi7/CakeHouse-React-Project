import { useState } from 'react';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
    const [userData, setUserData] = useState({
        email: '',
        name: '',
        phoneNumber: '',
        password: '',
    });

    const onFormChangeHandler = (e) => {
        setUserData((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

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
        if (resp.status === 400) {
            // throw error
            return console.log('Error');
        }
        const data = await resp.json();
        console.log(data);
        // const token = data.accessToken;
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
                <p>Already have an account? <Link to='/login'>Login</Link></p>
            </div>
        </>
    );
};
