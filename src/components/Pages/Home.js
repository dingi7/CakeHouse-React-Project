import { Featured } from '../Partials/Featured';
import { InfoSection } from '../Partials/InfoSection';
import 'react-toastify/dist/ReactToastify.css';

export const HomePage = () => {
    return (
        <>
            <InfoSection></InfoSection>
            <Featured></Featured>
        </>
    );
};
