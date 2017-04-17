import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const configureStore = () => {
    const enhancers = compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )

    // const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger())(createStore);
    const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
    const store = createStoreWithMiddleware(reducers, enhancers);

    const token = localStorage.getItem('token');
    if (token) {
        store.dispatch({ type: AUTH_USER })
    }

    return store;
}

export default configureStore;
