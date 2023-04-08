import { useState } from 'react';
import styles from './Contact.module.css';
import GoogleMaps from '../../components/GoogleMap';
import {
    errorNotification,
    successNotification,
} from '../../utils/notificationHandler';
import { sendMessage } from '../../utils/request';
import { Spinner } from '../../components/Spinner/Spinner';

export const ContactPage = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);

    const onFormChangeHandler = (e) => {
        setUserData((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onFormSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await sendMessage({
                name: userData.name,
                email: userData.email,
                message: userData.message,
            });
            successNotification('Message was successfully sent!');
            setUserData({
                name: '',
                email: '',
                message: '',
            });
        } catch (err) {
            errorNotification(err.message);
        }
        setLoading(false);
    };
    return (
        <div className={styles.container}>
            <h1>We'd love to hear from you</h1>
            <div className={styles.info}>
                <p>
                    Whether you're curious about our products, custom orders or
                    even business hours, we're ready to answer.
                </p>

                <h2>Call us</h2>
                <p>
                    <strong>Phone:</strong> +359 999888777
                    <br></br>
                    <strong>Address:</strong> 123 Main St, Sliven, Bulgaria
                </p>

                <h2>Or leave us a message</h2>
            </div>
            <form className={styles.form}>
                <label htmlFor="name">Name:</label>
                <input
                    name="name"
                    value={userData.name}
                    onChange={onFormChangeHandler}
                    type="text"
                    id="name"
                    required
                />
                <label htmlFor="email">Email:</label>
                <input
                    name="email"
                    value={userData.email}
                    onChange={onFormChangeHandler}
                    type="email"
                    id="email"
                    required
                />
                <label htmlFor="message">Message:</label>
                <textarea
                    name="message"
                    value={userData.message}
                    onChange={onFormChangeHandler}
                    id="message"
                    required
                />
                <button type="submit" onClick={onFormSubmitHandler}>
                    {loading ? <Spinner /> : 'Submit'}
                </button>
            </form>
            <h1>Find us</h1>
            <div id="map" className={styles.map}>
                <GoogleMaps></GoogleMaps>
            </div>
        </div>
    );
};
