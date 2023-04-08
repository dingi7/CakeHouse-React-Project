const host = 'https://web-server-ten.vercel.app/'
// const host = 'http://localhost:3030/'

const request = async (method, url, data, accessToken) => {
    const options = {
        method,
        headers: {},
    };

    if (accessToken) {
        options.headers['x-authorization'] =accessToken;
    }

    if (data) {
        options.headers['content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        const res = await fetch(host + url, options);
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }
        if (res.status === 401) {
            localStorage.removeItem('userData');
            window.location.pathname = '/login';
        }
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const get = request.bind(null, 'GET');
const post = request.bind(null, 'POST');
const put = request.bind(null, 'PUT');
const patch = request.bind(null, 'PATCH');
const del = request.bind(null, 'DELETE');

export { get, post, put, patch, del };
