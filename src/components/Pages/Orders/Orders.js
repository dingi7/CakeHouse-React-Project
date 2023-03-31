import { useEffect } from 'react';

export const Orders = () => {
    const [orders, setOrders] = useEffect([]);

    useEffect(() => {
        fetch('local')
    }, []);
};
