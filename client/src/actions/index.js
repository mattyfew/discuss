import axios from 'axios';
import { browserHistory } from 'react-router';
import * as type from './types';

const ROOT_URL = 'http://localhost:3090';

// ****************** AUTH *****************************

export function signinUser({ email, password }, state) {
    var self = this;
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {

                dispatch({ type: type.AUTH_USER });
                localStorage.setItem('token', response.data.token);

                dispatch({
                    type: type.SET_USER_IN_STATE,
                    payload: {
                        'user_id': response.data.user_id,
                        'username': response.data.username
                    }
                })
                browserHistory.push('/');
            })
            .catch((err) => {
                dispatch(authError('Bad Login Info', err));
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

export function signupUser(formProps, state) {
    var self = this;
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, formProps)
            .then(response => {

                dispatch({ type: type.AUTH_USER });
                localStorage.setItem('token', response.data.token);

                dispatch({
                    type: type.SET_USER_IN_STATE,
                    payload: {
                        'user_id': response.data.user_id,
                        'username': response.data.username
                    }
                })
                browserHistory.push('/');
            })
            .catch(response => {
                console.error(response);
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
                console.log("there was an error in fetchPosts", error);
            })
    }
}

export function fetchPost(id) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/posts/${id}`, {
            headers: { authorization: localStorage.getItem('token') }
        })
        .then(response => {
            dispatch({
                type: type.FETCH_POST,
                payload: response.data
            })
        })
        .catch(error => {
            console.log("there was an error in fetchPost", error);
        })
    }
}

export function createPost(props, state) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/posts/new`, {
            headers: { authorization: localStorage.getItem('token') },
            props
        })
        .then(response => {
            dispatch({
                type: type.CREATE_POST,
                payload: response.data
            })
        })
        .catch(error => {
            console.log("there was an error in createPost", error);
        })
    }
}


export function deletePost(id) {
    console.log("deletePost ran", id);
    return function(dispatch) {
        axios.delete(`${ROOT_URL}/posts/${id}`)
        .then(response => {
            dispatch({
                type: type.DELETE_POST,
                payload: response.data
            })
        })
        .catch(error => {
            console.log("there was an error in deletePost", error);
        })
    }
}
