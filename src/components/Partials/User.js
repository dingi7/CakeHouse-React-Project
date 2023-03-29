export const User = ({
    name,
    _id,
    autorization,
    email,
    onUserAuthorization,
}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{autorization}</td>
            <td>
                <button onClick={() => onUserAuthorization(_id)}>
                    {autorization === 'User' ? 'Make admin' : 'Make user'}
                </button>
            </td>
        </tr>
    );
};
