import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthContext';

export const Logout = () => {
    const { setAccessData } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setAccessData(null);
        navigate('/');
        toast.success('Successfully logged out!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    }, [setAccessData, navigate]);

    return null;
};