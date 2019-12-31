import axios from 'axios';
const base = 'http://localhost:9000/api';

export const login = (body) => {
    return axios.post(`${base}/login`, body);
}

export const signup = (body) => {
    return axios.post(`${base}/signup`, body);
}