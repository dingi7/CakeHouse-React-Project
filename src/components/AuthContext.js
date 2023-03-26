import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider(props) {
    const [accessToken, setAccessToken] = useState(null);

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            {props.children}
        </AuthContext.Provider>
    );
}
