import React, { useContext } from 'react';

import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthContext';

export function PrivateRoute({ path, component: Component, ...props }) {
    const { isAuth } = useContext(AuthContext);

    if (isAuth) {
        return <Component />;
    } else {
        toast('You must be a logged in user to do this!');
    }
}
