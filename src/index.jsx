import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

// Switch commented lines to hot-load tests instead of the main
// application:

import App from './ui/app';
// import App from './ui/test/flip-to-hack.test';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
