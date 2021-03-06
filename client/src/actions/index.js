import axios from 'axios';
import { browserHistory } from 'react-router';
import * as type from './types';
import cookie from 'react-cookie';

const ROOT_URL = 'http://localhost:3090';

// ****************** AUTH *****************************

export function signupUser(formProps, state) {
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

                cookie.save('user_id', response.data.user_id )
                cookie.save('username', response.data.username )

                browserHistory.push('/');
            })
            .catch(err => {
                console.log(err.response.data.error);
                dispatch(authError(err.response.data.error));
            })
    }
}

export function signinUser({ email, password }, state) {
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

                cookie.save('user_id', response.data.user_id )
                cookie.save('username', response.data.username )

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



// ****************** POSTS *****************************



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

export function createPost(props) {
    console.log("createPost props", props);
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

// ****************** USER *****************************

export function editProfile(props) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/profile/edit`, {
            headers: { authorization: localStorage.getItem('token') },
            props
        })
        .then(response => {
            console.log('editProfile action response', response);

            dispatch({
                type: type.EDIT_PROFILE,
                payload: response.data
            })
        })
        .catch(error => {
            console.log("there was an error in editProfile", error);
        })
    }
}


export function fetchUser(username) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/profile/${username}`, {
            headers: { authorization: localStorage.getItem('token') }
        })
        .then(response => {
            dispatch({
                type: type.FETCH_USER,
                payload: response.data
            })
        })
        .catch(error => {
            console.log("there was an error in fetchUser", error);
        })
    }
}

export function uploadMulterImgToS3(formData) {
    return function(dispatch) {
        const config = {
            headers: {
                'Content-Type': false,
                'Process-Data': false
            }
        };

        axios.post(`${ROOT_URL}/uploadMulterImg`, formData)
            .then((response) => {
                console.log("it worked????", response);

                dispatch({
                    type: type.UPLOAD_MULTER_TO_S3,
                    payload: response.data
                })

            })
            .catch((err) => {
                console.log("there was an error in React with /uploadMulterImg", err);
            })
    }
}

// ******************* COMMENTS **************************

export function fetchComments(postId) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/post/${postId}/comments`, {
            headers: { authorization: localStorage.getItem('token') }
        })
        .then(response => {
            dispatch({
                type: type.FETCH_COMMENTS,
                payload: response.data
            })
        })
        .catch(error => {
            console.log("there was an error in fetchComments", error);
        })
    }
}

export function createComment(props) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/post/${props.postId}/comments/new`, {
            headers: { authorization: localStorage.getItem('token') },
            props
        })
        .then(response => {
            console.log("createComment response", response.data);
            dispatch({
                type: type.FETCH_POST,
                payload: response.data
            })
        })
        .catch(error => {
            console.log("there was an error in createComment", error);
        })
    }
}
