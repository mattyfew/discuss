import * as type from '../actions/types';

export default function(state = {}, action){
    switch (action.type) {
    case type.AUTH_USER:
        return { ...state, error: '', authenticated: true }
    case type.UNAUTH_USER:
        return { ...state, authenticated: false }
    case type.AUTH_ERROR:
        return { ...state, error: action.payload }
    case type.FETCH_MESSAGE:
        return { ...state, message: action.payload }
    case type.SET_USER_IN_STATE:
        return {
            ...state,
            user_id: action.payload.user_id,
            username: action.payload.username
        }
    case type.FETCH_USER:
        return { ...state, user: action.payload }
    case type.EDIT_PROFILE:
        return { ...state, user: action.payload }
    }

    return state;
}
