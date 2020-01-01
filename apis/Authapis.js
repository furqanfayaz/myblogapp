import axios from 'axios';
const base = 'https://glacial-fortress-74052.herokuapp.com/api';

export const login = (body) => {
    return axios.post(`${base}/login`, body);
}

export const signup = (body) => {
    return axios.post(`${base}/signup`, body);
}

export const logout = (body) => {
    return axios.post(`${base}/logout`, body);
}