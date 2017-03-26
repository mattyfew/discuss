import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import AuthReducer from './auth_reducer';
import PostsReducer from './posts_reducer';
import CommentsReducer from './comments_reducer';

const rootReducer = combineReducers({
    form,
    auth: AuthReducer,
    posts: PostsReducer,
    comments: CommentsReducer
});

export default rootReducer;
