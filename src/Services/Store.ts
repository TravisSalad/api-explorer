import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../Reducers/index';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

// TODO: add type
const logger = createLogger({ collapsed: true });

// TODO: add type
const store = createStore(reducer, compose(
  applyMiddleware(thunk, logger)
));

export default store;
