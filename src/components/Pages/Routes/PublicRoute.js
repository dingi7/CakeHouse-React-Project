import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../contexts/AuthContext';

export function PublicRoute({ path, component: Component, ...props }) {
    const { isAuth } = useContext(AuthContext);

    // const navigate = useNavigate()
    if (!isAuth) {
        return <Component />;
    } else {
        // navigate('/')
        toast('You are already logged in!');
    }
}
