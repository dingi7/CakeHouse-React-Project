import { Featured } from '../Partials/Featured';
import { InfoSection } from '../Partials/InfoSection';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const HomePage = () => {
    const location = useLocation();
    const errorMessage = location.state?.error;
    errorMessage &&
        toast.error(errorMessage, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    return (
        <>
            <InfoSection></InfoSection>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <Featured></Featured>
        </>
    );
};
