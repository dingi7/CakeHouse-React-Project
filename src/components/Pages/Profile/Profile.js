import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './profile.module.css';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
    const { accessData } = useContext(AuthContext);
    const [readOnly, setReadOnly] = useState(true);
    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        name: accessData.fullName,
        phoneNumber: accessData.phoneNumber,
        email: accessData.email,
    });

    const onFormChangeHandler = (e) => {
        setUserData((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const handleEditButtonClick = () => {
        if (!readOnly) {
            // send the req
        }
        setReadOnly(!readOnly);
    };

    const handleViewOrdersButtonClick = (e) => {
        e.preventDefault()
        navigate('/orders')
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
                        name="name"
                        value={userData.name}
                        onChange={onFormChangeHandler}
                        readOnly={readOnly}
                    />
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={onFormChangeHandler}
                        readOnly={readOnly}
                    />
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={onFormChangeHandler}
                        readOnly={readOnly}
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
                <div className={styles['button-wrapper']}>
                    <button
                        className={styles['button']}
                        onClick={handleEditButtonClick}
                    >
                        {readOnly ? 'Edit Profile' : 'Save Changes'}
                    </button>
                    <button className={styles['button']} onClick={handleViewOrdersButtonClick}>View orders</button>
                </div>
            </div>
        </>
    );
};
