import axios from 'axios';
import cookie from "js-cookie";
const base = 'http://localhost:9000/api';
const token  = cookie.get('token')

export const getList = () => {
    return axios.get(`${base}/posts?cookie=${token}`);
}

export const getblog = (id) => {
    return axios.get(`${base}/posts?cookie=${token}&id=${id}`);
}

export const createPost = (body) => {
    return axios.post(`${base}/posts/create?cookie=${token}`, body );
}

export const addComment = (body) => {
    return axios.post(`${base}/comments/create?cookie=${token}`, body);
}

export const deleteComment = (id) => {
    return axios.delete(`${base}/comments/delete/${id}?cookie=${token}`);
}

