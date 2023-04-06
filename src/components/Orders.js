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
            <td>
                {owner.name}
                <br></br>
                <br></br>
                {owner.phoneNumber}
            </td>
            <td>{total}lv</td>
            <td>
                {products.map((p) => (
                    <Link key={p._id} to={`/shop/${p._id}`}>
                        <img style={{ maxWidth: '500px', maxHeight: '90px' }} src={p.img} alt='img'/>
                    </Link>
                ))}``
            </td>
            <td>{location}</td>
            <td>Pending</td>
            <td>
                <button onClick={() => onOrderFulfill(_id)}>Fulfill</button>
            </td>
        </tr>
    );
};
