import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../contexts/AuthContext';

export function PrivateRoute({ path, component: Component, ...props }) {
    const { isAuth } = useContext(AuthContext);

    // const navigate = useNavigate()
    if (isAuth) {
        return <Component />;
    } else {
        // navigate('/')
        toast('You must be a logged in user to do this!');
    }
}
