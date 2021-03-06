import { FETCH_POSTS, FETCH_POST, CREATE_POST, DELETE_POST, FETCH_COMMENTS } from '../actions/types';

const INITIAL_STATE = { all: [], post: null };

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
    case FETCH_POST:
        return { ...state, post: action.payload };
    case FETCH_POSTS:
        return { ...state, all: action.payload };
    case CREATE_POST:
        return { ...state, all: action.payload };
    case DELETE_POST:
        return { ...state, all: action.payload };
    default:
        return state;
    }
}
