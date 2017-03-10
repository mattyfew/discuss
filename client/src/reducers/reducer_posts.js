import { FETCH_POSTS, FETCH_POST } from '../actions';

const INITIAL_STATE = { all: [], post: null };

export default function(state = INITIAL_STATE, action) {

    console.log("anything");
    switch(action.type) {
    case FETCH_POST:
        return { ...state, post: action.payload.data };
    case FETCH_POSTS:
        console.log('da action');
        return { ...state, all: action.payload.data };
    default:
        return state;
    }
}
