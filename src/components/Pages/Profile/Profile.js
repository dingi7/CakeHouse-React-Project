import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import styles from './profile.module.css';

export const ProfilePage = () => {
    const { accessToken } = useContext(AuthContext);
    if (!accessToken) {
        return <div>Loading...</div>;
    }
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
                        defaultValue={accessToken.fullName}
                        readOnly
                    />
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        defaultValue={accessToken.phoneNumber}
                        readOnly
                    />
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        defaultValue={accessToken.email}
                        readOnly
                    />
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="accessRights">Access Rights:</label>
                    <input
                        type="text"
                        id="accessRights"
                        defaultValue={accessToken.autorization}
                        readOnly
                    />
                </div>
            </div>
        </>
    );
};
