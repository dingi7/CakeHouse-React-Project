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
            <h1>Ще се радваме да се свържете с нас!</h1>
            <div className={styles.info}>
                <p>
                    Независимо дали сте любопитни относно нашите продукти, интересувате се от персонализирани поръчки или имате въпроси относно работното ни време, ние сме готови да Ви отговорим.
                </p>

                <h2>Обадете ни се</h2>
                <p>
                    <strong>Телефон:</strong> +359 887933893
                    <br></br>
                    <strong>Адрес:</strong> Сава Доброплодни 11
                </p>

                {/* <h2>Или ни изпратете съобщение</h2> */}
            </div>
            {/* <form className={styles.form}>
                <label htmlFor="name">Име:</label>
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
                <label htmlFor="message">Съобщение:</label>
                <textarea
                    name="message"
                    value={userData.message}
                    onChange={onFormChangeHandler}
                    id="message"
                    required
                />
                <button type="submit" onClick={onFormSubmitHandler}>
                    {loading ? <Spinner /> : 'Изпрати'}
                </button>
            </form> */}
            {/* <h1>Намерете ни</h1>
            <div id="map" className={styles.map}>
                <GoogleMaps></GoogleMaps>
            </div> */}
        </div>
    );
};
