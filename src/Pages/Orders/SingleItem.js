import { Link } from 'react-router-dom';
import styles from './Orders.module.css'

export const SingleOrder = ({
    total,
    location,
    products,
    fulfilled
}) => {
    return (
        <tr>
            <td>{total}lv</td>
            <td>
                {products.map((p) => (
                    <Link key={p._id} to={`/shop/${p._id}`}>
                        <img className={styles['img']} src={p.img} alt='img'/>
                    </Link>
                ))}
            </td>
            <td>{location}</td>
            <td>{fulfilled ? "Delivered" : "Pending"}</td>
        </tr>
    );
};
