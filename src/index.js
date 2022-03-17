import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger';

// import rootReducer from './reducers'; // ./reducers/index.js
import App from './container/App';
import CounterContainer from './container/CounterContainer';

const logger = createLogger();
const store = createStore(logger, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <CounterContainer />
  </Provider>,
  document.getElementbyId('root')
);