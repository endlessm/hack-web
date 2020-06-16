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

const proxyApp = (param, changeCallback) => {
  const app = document.querySelector('#app');
  const globalParameters = app.contentWindow[param];

  if (!globalParameters) {
    setTimeout(() => { proxyApp(param, changeCallback); }, 500);
    return;
  }

  let timeout = null;
  const handler = {
    set(obj, prop, val) {
      // Timeout update to just trigger one update if there are multiple changes
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => changeCallback(globalParameters), 300);

      return Reflect.set(obj, prop, val);
    },
  };

  const proxy = new Proxy(globalParameters, handler);
  app.contentWindow[param] = proxy;
  changeCallback(globalParameters, true);
};

const updateApp = (param, newParams, callback = () => {}) => {
  const app = document.querySelector('#app');
  if (!app.contentWindow || !app.contentWindow[param]) {
    return;
  }

  const params = app.contentWindow[param];

  Object.keys(newParams).forEach((property) => {
    if (!(property in params)) {
      return;
    }
    const value = newParams[property];
    if (value === params[property]) {
      return;
    }
    params[property] = value;
    callback(property, value);
  });
};

export { proxyApp, updateApp };
