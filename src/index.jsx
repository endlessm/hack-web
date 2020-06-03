import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import './i18n';

// Switch commented lines to hot-load tests instead of the main
// application:

import App from './ui/app';
// import App from './ui/quests/p5-quest';
// import App from './ui/quests/html-quest';
// import App from './ui/quests/pdf-quest';
// import App from './ui/quests/sidetrack-quest';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
