import { useState } from 'react';
import { Link, redirect } from 'react-router-dom';

export const LoginPage = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const onFormChangeHandler = (e) => {
        setUserData((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onFormSubmit = async (e) => {
        e.preventDefault()
        const resp = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userData.email,
                password: userData.password
            }),
        });
        if(resp.status === 400){
            // throw error
            return console.log('Error');
        }
        // const data = await resp.json();
        // const token = data.accessToken;
        return redirect('/')
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
                    <button type="submit" className="btn" onClick={onFormSubmit}>
                        Login
                    </button>
                </form>
                <p>Don't have an account? <Link to='/register'>Register</Link></p>
            </div>
        </>
    );
};
