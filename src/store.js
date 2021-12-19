import {applyMiddleware, createStore} from 'redux';
import Thunk from 'redux-thunk';

import Reducers from './reducers';

const usedMiddleware = [Thunk];

/* eslint-enable no-undef */

export default createStore(
    Reducers,
    applyMiddleware(...usedMiddleware)
);
