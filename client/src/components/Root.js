import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './app';
import Signin from './auth/signin';
import Signout from './auth/signout';
import Signup from './auth/signup';
import RequireAuth from './auth/require_auth';

import PostsIndex from './posts/posts_index';
import PostsNew from './posts/posts_new';
import PostsShow from './posts/posts_show';

import ProfileShow from './profile/profile_show';
import ProfileSelf from './profile/profile_self';

const Root = ({store}) => (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={PostsIndex} />
                <Route path="signin" component={Signin} />
                <Route path="signout" component={Signout} />
                <Route path="signup" component={Signup} />
                <Route path="profile" component={RequireAuth(ProfileSelf)} />
                <Route path="users/:username" component={RequireAuth(ProfileShow)} />
                <Route path="posts">
                  <IndexRoute component={RequireAuth(PostsIndex)} />
                  <Route path=":post_id" component={RequireAuth(PostsShow)} />
                  <Route path="new" component={RequireAuth(PostsNew)} />
                </Route>

            </Route>
        </Router>
    </Provider>
);

export default Root;
