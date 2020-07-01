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

import { hot } from 'react-hot-loader';
import React, { Suspense } from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'typeface-roboto';

import './app.css';
import theme from './theme';
import CardSetView from './card-set-view';
import Login, { RequireAuth } from './login';
import SignUp from './signup';
import ResetPassword from './reset';
import GoogleAnalyticsWrapper from '../google-analytics';

import CookieBanner from './cookie-banner';

import { P5Quest } from './quests/p5-quest';
import { HtmlQuest } from './quests/html-quest';
import { PdfQuest } from './quests/pdf-quest';
import { SidetrackQuest } from './quests/sidetrack-quest';

const App = () => {
  const cardsets = useSelector((state) => state.cardsets);

  return (
    <Suspense fallback="loading">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CookieBanner />
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/reset-password">
              <ResetPassword />
            </Route>
            <Route path="/games">
              <RequireAuth>
                <GoogleAnalyticsWrapper><SidetrackQuest /></GoogleAnalyticsWrapper>
              </RequireAuth>
            </Route>
            <Route path="/art">
              <RequireAuth>
                <GoogleAnalyticsWrapper><P5Quest /></GoogleAnalyticsWrapper>
              </RequireAuth>
            </Route>
            <Route path="/web">
              <RequireAuth>
                <GoogleAnalyticsWrapper><HtmlQuest /></GoogleAnalyticsWrapper>
              </RequireAuth>
            </Route>
            <Route path="/maker">
              <RequireAuth>
                <GoogleAnalyticsWrapper><PdfQuest /></GoogleAnalyticsWrapper>
              </RequireAuth>
            </Route>
            {cardsets.map((p) => (
              <Route key={p.slug} path={p.slug}>
                <RequireAuth>
                  <GoogleAnalyticsWrapper><CardSetView slug={p.slug} /></GoogleAnalyticsWrapper>
                </RequireAuth>
              </Route>
            ))}
            <Route path="/">
              <RequireAuth>
                <GoogleAnalyticsWrapper><CardSetView slug="/home" /></GoogleAnalyticsWrapper>
              </RequireAuth>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </Suspense>
  );
};

export default hot(module)(App);
