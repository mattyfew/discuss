import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import AuthReducer from './auth_reducer';
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
    form,
    auth: AuthReducer,
    posts: PostsReducer
});

export default rootReducer;
