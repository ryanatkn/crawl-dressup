import 'normalize.css';
import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {applyMiddleware, createStore} from 'redux';
import {createPrimus, initPrimus} from './primus';

import App from '../views/App';
import {ClientCtx} from '../types';
import {Provider} from 'react-redux';
import {logMiddleware} from '../middlewares/log';
import {reducer} from '../reducers';
import registerServiceWorker from './registerServiceWorker';

export const main = async (): Promise<ClientCtx> => {
  const ctx: ClientCtx = {
    store: createStore(reducer, undefined, applyMiddleware(logMiddleware)),
    root: document.getElementById('root'),
    primus: createPrimus(),
  };
  initPrimus(ctx);

  ReactDOM.render(<Provider store={ctx.store}><App /></Provider>, ctx.root);

  registerServiceWorker();

  return ctx;
};
