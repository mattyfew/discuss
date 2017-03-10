import axios from 'axios';
import { browserHistory } from 'react-router';
import * as type from './types';

const ROOT_URL = 'http://localhost:3090';

// ****************** AUTH *****************************

export function signinUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {

                dispatch({ type: type.AUTH_USER });
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/feature');

            })
            .catch(() => {
                dispatch(authError('Bad Login Info'));
            })
    }
}


export function authError(error){
    return {
        type: type.AUTH_ERROR,
        payload: error
    };
}


export function signoutUser() {
    localStorage.removeItem('token');
    return { type: type.UNAUTH_USER }
}


export function signupUser({email, password}) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                dispatch({ type: type.AUTH_USER });
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/feature');

            })
            .catch(response => {
                dispatch(authError(response.data.error));
            })
    }
}


export function fetchMessage() {
    return function(dispatch) {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: type.FETCH_MESSAGE,
                    payload: response.data.message
                })
            })
    }
}

// ****************** FORUM *****************************

export function fetchPosts() {
    console.log("fetchPosts ran");
    return function(dispatch) {
        axios.get(`${ROOT_URL}/posts`, {
            headers: { authorization: localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: type.FETCH_POSTS,
                    payload: response.data
                })
            })
            .catch(error => {
                console.log("there was an error yo", error);
            })
    }
}

export function createPost(props) {
    const request = axios.post(`${ROOT_URL}/posts`, props);

    return {
        type: type.CREATE_POST,
        payload: request
    }
}

export function fetchPost(id) {
    const request = axios.get(`${ROOT_URL}/posts/${id}`);

    return {
        type: type.FETCH_POST,
        payload: request
    }
}

export function deletePost(id) {
    const request = axios.delete(`${ROOT_URL}/posts/${id}`);

    return {
        type: type.DELETE_POST,
        payload: request
    }
}
