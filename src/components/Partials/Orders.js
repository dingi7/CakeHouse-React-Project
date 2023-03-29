import { Link } from 'react-router-dom';

export const Order = ({
    _id,
    total,
    location,
    products,
    owner,
    onOrderFulfill,
}) => {
    return (
        <tr>
            <td>{owner.name}</td>
            <td>{total}lv</td>
            <td>
                {products.map((p) => (
                    <Link key={p._id} to={`/shop/${p._id}`}>
                        <p>{p.name}</p>
                    </Link>
                ))}
            </td>
            <td>{location}</td>
            <td>Pending</td>
            <td>
                <button onClick={() => onOrderFulfill(_id)}>Fulfill</button>
            </td>
        </tr>
    );
};
