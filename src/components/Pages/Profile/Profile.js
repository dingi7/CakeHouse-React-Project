import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './profile.module.css';

export const ProfilePage = () => {
    const { accessData } = useContext(AuthContext);
    return (
        <>
            <h1>Profile</h1>
            <div className={styles.profileBox}>
                <h2>Personal Information</h2>
                <div className={styles.inputField}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        defaultValue={accessData.fullName}
                        readOnly
                    />
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        defaultValue={accessData.phoneNumber}
                        readOnly
                    />
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        defaultValue={accessData.email}
                        readOnly
                    />
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="accessRights">Access Rights:</label>
                    <input
                        type="text"
                        id="accessRights"
                        defaultValue={accessData.autorization}
                        readOnly
                    />
                </div>
            </div>
        </>
    );
};
