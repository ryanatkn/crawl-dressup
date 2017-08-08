import 'normalize.css';
import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as t from '../types';

import {applyMiddleware, createStore} from 'redux';
import {createPrimus, initPrimus} from './primus';

import App from '../views/App';
import {Provider} from 'react-redux';
import {logMiddleware} from '../middlewares/log';
import {logger} from '../utils/log';
import {reducer} from '../reducers';
import registerServiceWorker from './registerServiceWorker';

const log = logger('main/index');

export const main = async (): Promise<t.ClientCtx> => {
  let primus: t.PrimusClient;
  try {
    primus = createPrimus();
  } catch (err) {
    log('failed to create primus', undefined, err); // TODO fix this api
    primus = {} as any; // TODO fix this - load primus lib statically?
  }
  const ctx: t.ClientCtx = {
    store: createStore<t.ClientState>(
      reducer,
      applyMiddleware(logMiddleware as any), // TODO casting because Redux types are .. not cooperating, consider sending a pull request with fixes
    ),
    root: document.getElementById('root'),
    primus,
  };
  try {
    await initPrimus(ctx);
  } catch (err) {
    log('failed to init primus', undefined, err); // TODO fix this api
  }

  ReactDOM.render(
    <Provider store={ctx.store}>
      <App />
    </Provider>,
    ctx.root,
  );

  registerServiceWorker();

  return ctx;
};
