import { FaSpinner } from 'react-icons/fa';
import styles from './spinner.module.css'

export const Spinner = () => {
    return (
        <div className={styles["spinner"]}>
            <FaSpinner className={styles["icon"]} />
        </div>
    );
};
