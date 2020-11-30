import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

//could have had one middleware const store = createStore(rootReducer, applyMiddleware(logger))
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;