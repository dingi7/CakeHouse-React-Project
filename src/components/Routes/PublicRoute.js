import React, { useContext } from 'react';

import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext';

export function PublicRoute({ path, component: Component, ...props }) {
    const { isAuth } = useContext(AuthContext);

    if (!isAuth) {
        return <Component />;
    } else {
        toast('You are already logged in!');
    }
}
