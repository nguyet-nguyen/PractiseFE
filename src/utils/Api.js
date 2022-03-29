import axios from 'axios';

// config hosting-api here
export const baseURL = 'http://127.0.0.1/api';
export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});
