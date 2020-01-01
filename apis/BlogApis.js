import axios from 'axios';
import cookie from "js-cookie";
const base = 'https://glacial-fortress-74052.herokuapp.com/api/api';

export const getList = () => {
    const token  = cookie.get('token');
    return axios.get(`${base}/posts?cookie=${token}`);
}

export const getBlog = (id) => {
    const token  = cookie.get('token');
    return axios.get(`${base}/posts?cookie=${token}&id=${id}`);
}

export const createPost = (body) => {
    const token  = cookie.get('token');
    return axios.post(`${base}/posts/create?cookie=${token}`, body );
}

export const updateBlog = (id, body) => {
    const token  = cookie.get('token');
    return axios.post(`${base}/posts/update/${id}?cookie=${token}`, body );
}


export const deleteBlog = (id) => {
    const token  = cookie.get('token');
    return axios.delete(`${base}/posts/delete/${id}?cookie=${token}`);
}

export const addComment = (body) => {
    const token  = cookie.get('token');
    return axios.post(`${base}/comments/create?cookie=${token}`, body);
}

export const deleteComment = (id) => {
    const token  = cookie.get('token');
    return axios.delete(`${base}/comments/delete/${id}?cookie=${token}`);
}

