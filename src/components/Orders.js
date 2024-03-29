import { Link } from 'react-router-dom';
import { Spinner } from './Spinner/Spinner';

export const Order = ({
    _id,
    total,
    location,
    products,
    owner,
    onOrderFulfill,
    isButtonLoading,
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
                        <img
                            style={{ maxWidth: '500px', maxHeight: '90px' }}
                            src={p.img}
                            alt="img"
                        />
                    </Link>
                ))}
            </td>
            <td>{location}</td>
            <td>Чакаща</td>
            <td>
                <button onClick={() => onOrderFulfill(_id)}>
                    {' '}
                    {isButtonLoading ? <Spinner></Spinner> : 'Маркирай като изпълнена'}
                </button>
            </td>
        </tr>
    );
};
