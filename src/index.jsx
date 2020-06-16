/* Copyright © 2020 Endless OS LLC
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
