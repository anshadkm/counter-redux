import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import reducer from '../api/reducers';

const defaultMiddlewares = [
    thunkMiddleware,
    promiseMiddleware()
];

const composedMiddlewares = middlewares => compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const initialize = (initialState = {}, middlewares = []) => {
    const store = createStore(reducer, initialState, composedMiddlewares(middlewares));
    return store;
};

export default initialize;