import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider(props) {
    const [accessData, setAccessData] = useState(null);
    useEffect(() => {
        const storedAccessData = localStorage.getItem('access_info');
        if (storedAccessData) {
            try {
                const parsedAccessData = JSON.parse(storedAccessData);
                setAccessData(parsedAccessData);
            } catch (error) {
                console.error('Failed to parse access token:', error);
                localStorage.setItem('access_info', JSON.stringify({}));
            }
        }
    }, []);
    let isAdmin = false;
    let isAuth = false;
    if (accessData) {
        isAuth = true;
        accessData.autorization === 'Admin'
            ? (isAdmin = true)
            : (isAdmin = false);
    }
    return (
        <AuthContext.Provider
            value={{ accessData, setAccessData, isAuth, isAdmin }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
