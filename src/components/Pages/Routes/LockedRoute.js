import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../contexts/AuthContext';

export function LockedRoute({ path, component: Component, ...props }) {
    const { isAdmin } = useContext(AuthContext);

    // const navigate = useNavigate()
    if (isAdmin) {
        return <Component />;
    } else {
        // navigate('/')
        toast('You are not authorized to do that!');
    }
}
