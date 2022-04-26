import axios from 'axios';
// config hosting-api here
export const baseURL = process.env.REACT_APP_DOMAIN + '/api';
console.log(baseURL);
export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiadmin = axios.create({
    baseURL,
    headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        "Content-Type": "multipart/form-data"
    },
});

export const apiadminnoFormdata = axios.create({
    baseURL,
    headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    },
});

export const callApiAdmin = (token) => { 
        return axios.create({
        baseURL,
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        },
    })
};