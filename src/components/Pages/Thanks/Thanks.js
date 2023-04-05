import styles from './thanks.module.css'

export const Thanks = ({orderId}) => {
    return (
        <div className={styles["thank-you-page"]}>
            <h1>Thank You!</h1>
            <p>Your order has been placed.</p>
            <p>
                Your Order ID is:{' '}
                <span className={styles["order-id"]}>{orderId}</span>
            </p>
        </div>
    );
};
