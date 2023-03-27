import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider(props) {
    const [accessData, setAccessData] = useState(null);
    let isAdmin = false
    let isAuth = false
    if(accessData){
    isAuth = true
    accessData.autorization === "Admin" ? isAdmin = true : isAdmin = false
    }
    return (
        <AuthContext.Provider value={{ accessData, setAccessData, isAuth, isAdmin }}>
            {props.children}
        </AuthContext.Provider>
    );
}
