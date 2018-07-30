import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../Reducers/index';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

const logger = createLogger({ collapsed: true });

const store = createStore(reducer, compose(
  applyMiddleware(thunk, logger)
));

export default store;
