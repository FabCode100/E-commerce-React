import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3002',
});

export const setApiToken = (token: string) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export default api;
