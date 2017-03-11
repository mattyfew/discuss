import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

import PostsIndex from './components/posts/posts_index';
import PostsNew from './components/posts/posts_new';
import PostsShow from './components/posts/posts_show';

const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger())(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if (token) {
    store.dispatch({ type: AUTH_USER })
}

ReactDOM.render(
  <Provider store={store}>
      <Router history={browserHistory}>
          <Route path="/" component={App}>
              <IndexRoute component={PostsIndex} />
              <Route path="signin" component={Signin} />
              <Route path="signout" component={Signout} />
              <Route path="signup" component={Signup} />
              <Route path="/feature" component={RequireAuth(Feature)} />
              <Route path="/posts">
                <IndexRoute component={RequireAuth(PostsIndex)} />
                <Route path="/posts/new" component={RequireAuth(PostsNew)} />
                <Route path="/posts/:post_id" component={RequireAuth(PostsShow)} />
              </Route>

          </Route>
      </Router>
  </Provider>
  , document.querySelector('.container')
);
