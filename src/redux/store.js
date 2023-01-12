import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer/rootReducer';

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware()));

export default store;
