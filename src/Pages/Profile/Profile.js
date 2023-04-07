import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './profile.module.css';
import { useNavigate } from 'react-router-dom';
import {
    errorNotification,
    successNotification,
} from '../../utils/notificationHandler';
import { updateUser } from '../../utils/request';

export const ProfilePage = () => {
    const { accessData, setAccessData } = useContext(AuthContext);
    const [readOnly, setReadOnly] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('access_info', JSON.stringify(accessData));
    }, [accessData]);

    const [userData, setUserData] = useState({
        name: accessData.fullName,
        phoneNumber: accessData.phoneNumber,
        email: accessData.email,
        password: '',
    });

    const onFormChangeHandler = (e) => {
        setUserData((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const handleEditButtonClick = async () => {
        if (!readOnly) {
            try {
                await updateUser(
                    accessData._id,
                    {
                        email: userData.email,
                        name: userData.name,
                        phoneNumber: userData.phoneNumber,
                        password: userData.password,
                    },
                    accessData.accessToken
                );
                setAccessData((state) => ({
                    ...state,
                    email: userData.email,
                    name: userData.name,
                    phoneNumber: userData.phoneNumber,
                }));
                successNotification('Your Profile Was Successfully updated!');
            } catch (err) {
                errorNotification(err.message);
                setUserData({
                    name: accessData.fullName,
                    phoneNumber: accessData.phoneNumber,
                    email: accessData.email,
                    password: '',
                });
                setReadOnly(!readOnly);
            }
        }
        setReadOnly(!readOnly);
    };

    const handleViewOrdersButtonClick = (e) => {
        e.preventDefault();
        navigate('/orders');
    };
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
                {!readOnly && (
                    <div className={styles.inputField}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            defaultValue=""
                            onChange={onFormChangeHandler}
                            readOnly={readOnly}
                        />
                    </div>
                )}
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
                    <button
                        className={styles['button']}
                        onClick={handleViewOrdersButtonClick}
                    >
                        View orders
                    </button>
                </div>
            </div>
        </>
    );
};
