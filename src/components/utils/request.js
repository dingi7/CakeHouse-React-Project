const baseUrl = 'http://localhost:3030/';

export const loginReq = async (email, password) => {
    const response = await fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }
    return data;
};

export const registerReq = async (email, name, phoneNumber, password) => {
    const response = await fetch(baseUrl + 'users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            name: name,
            phoneNumber: phoneNumber,
            password: password,
        }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }
    return data;
};
