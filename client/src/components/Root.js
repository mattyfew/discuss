import React from 'react';
import { Provider } from 'react-redux';
// import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Signin from './auth/signin';
import Signout from './auth/signout';
import Signup from './auth/signup';
import RequireAuth from './auth/require_auth';

import PostsIndex from './posts/posts_index';
import PostsNew from './posts/posts_new';
import PostsShow from './posts/posts_show';

import ProfileShow from './profile/profile_show';
import ProfileSelf from './profile/profile_self';

import Header from './header';
import Footer from './footer';

const Root = ({store}) => (
    <Provider store={store}>
        <Router>
            <div>
                <Header />
                <Route path="/" component={PostsIndex} />
                <Route path="/signin" component={Signin} />
                <Route path="/signout" component={Signout} />
                <Route path="/signup" component={Signup} />
                <Route path="/profile" component={RequireAuth(ProfileSelf)} />
                <Route path="/users/:username" component={RequireAuth(ProfileShow)} />
                <Switch>
                    <Route path="/posts" component={RequireAuth(PostsIndex)} />
                    <Route path="/posts/new" component={RequireAuth(PostsNew)} />
                    <Route path="/posts/:post_id" component={RequireAuth(PostsShow)} />
                </Switch>
                <Footer />
            </div>
        </Router>
    </Provider>
);

export default Root;
