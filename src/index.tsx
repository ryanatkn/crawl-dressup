import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';

import 'normalize.css';
import './index.css';

import {logMiddleware} from './middlewares/log';
import {reducer} from './reducers';
import App from './views/App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer, undefined, applyMiddleware(logMiddleware));
ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root'),
);
registerServiceWorker();

// set some convenient globals
Object.assign(window, {store, st: store.getState});
