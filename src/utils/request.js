import * as api from '../api/api';
const endpoints = {
    login: 'users/login',
    register: 'users/register',
    logout: 'users/logout',
    products: 'data/catalog',
    users: 'users',
    userOrders: 'orders/user',
    orders: 'orders',
    contact: 'contact',
    fulfill: (id) => `orders/${id}/fulfill`,
    authorize: (id) => `users/authorize/${id}`,
    singleProduct: (id) => `data/catalog/${id}`,
    
};

export const loginReq = async (email, password) => {
    return api.post(endpoints.login, { email, password });
};
export const registerReq = async (email, name, phoneNumber, password) => {
    return await api.post(endpoints.register, {
        email,
        name,
        phoneNumber,
        password,
    });
};
export const getProductsReq = async () => {
    return api.get(endpoints.products);
};
export const getSingleProductReq = async (id) => {
    return api.get(endpoints.singleProduct(id));
};
export const getUsersOrdersReq = async (accessToken) => {
    return api.get(endpoints.userOrders, null, accessToken);
};
export const orderPost = async (accessToken, body) => {
    return api.post(endpoints.orders, body, accessToken ? accessToken : '');
};
export const createProductPost = async (accessToken, body) => {
    return api.post(endpoints.products, body, accessToken);
};
export const fulfillOrderPost = async (id, accessToken) => {
    return api.post(endpoints.fulfill(id), null, accessToken);
};
export const authorizeUserPost = async (id, accessToken) => {
    return api.post(endpoints.authorize(id), null, accessToken);
};
export const getAllOrdersReq = async (accessToken) => {
    return api.get(endpoints.orders, null, accessToken);
};
export const getAllUsersReq = async (accessToken) => {
    return api.get(endpoints.users, null, accessToken);
};

export const sendMessage = async (body) =>{
    return api.post(endpoints.contact, body)
}