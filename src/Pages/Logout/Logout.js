import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import {
    errorNotification,
    successNotification,
} from '../../utils/notificationHandler';
import { logout } from '../../utils/request';

export const Logout = () => {
    const { setAccessData, accessData } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const logoutReqs = async () => {
            try {
                await logout(accessData.accessToken);
                setAccessData(null);
                localStorage.removeItem('access_info');
                navigate('/login');
                successNotification('Successfully logged out!');
            } catch (err) {
                errorNotification(err.message);
            }
        };
        logoutReqs();
    }, [setAccessData, navigate, accessData.accessToken]);

    return null;
};
