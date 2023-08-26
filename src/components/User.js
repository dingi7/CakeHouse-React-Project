import { Spinner } from "./Spinner/Spinner";

export const User = ({
    name,
    _id,
    autorization,
    email,
    onUserAuthorization,
    isButtonLoading,
}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{autorization}</td>
            <td>
                <button onClick={() => onUserAuthorization(_id)}>
                    {isButtonLoading ? (
                        <Spinner></Spinner>
                    ) : autorization === 'User' ? (
                        'Направи admin'
                    ) : (
                        'Направи потребител'
                    )}
                </button>
            </td>
        </tr>
    );
};
