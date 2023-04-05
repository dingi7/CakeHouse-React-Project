import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext';

export function LockedRoute({ path, component: Component, ...props }) {
    const { isAdmin } = useContext(AuthContext);

    if (isAdmin) {
        return <Component />;
    } else {
        toast('You are not authorized to do that!');
    }
}
