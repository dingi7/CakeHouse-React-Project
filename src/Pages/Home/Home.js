import './Home.css'
import { Featured } from '../../components/Featured';
import { InfoSection } from '../../components/InfoSection';
import 'react-toastify/dist/ReactToastify.css';

export const HomePage = () => {
    return (
        <>
            <InfoSection></InfoSection>
            <Featured></Featured>
        </>
    );
};
