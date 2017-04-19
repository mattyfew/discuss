import { FETCH_COMMENTS, CREATE_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from '../actions/types';

const INITIAL_STATE = { all: [] };

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {

    case FETCH_COMMENTS:
        return { ...state, all: action.payload }
    case CREATE_COMMENT:
        return { ...state, post: action.payload }
    case EDIT_COMMENT:
        return { ...state, comment: action.payload }
    case DELETE_COMMENT:
        return { ...state, message: action.payload }
    default:
        return state;
    }
}
