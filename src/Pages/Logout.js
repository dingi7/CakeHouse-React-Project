import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { successNotification } from '../utils/notificationHandler';

export const Logout = () => {
    const { setAccessData } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setAccessData(null);
        localStorage.removeItem('access_info');
        navigate('/login');
        successNotification('Successfully logged out!')
    }, [setAccessData, navigate]);

    return null;
};