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
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'typeface-roboto';

import './app.css';
import MinSize from './size-disclaimer';
import theme from './theme';
import CardSetView from './card-set-view';
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
        <MinSize min="md">
          <CookieBanner />
          <Router>
            <Switch>
              <Route path="/games">
                <GoogleAnalyticsWrapper><SidetrackQuest /></GoogleAnalyticsWrapper>
              </Route>
              <Route path="/art">
                <GoogleAnalyticsWrapper><P5Quest /></GoogleAnalyticsWrapper>
              </Route>
              <Route path="/web">
                <GoogleAnalyticsWrapper><HtmlQuest /></GoogleAnalyticsWrapper>
              </Route>
              <Route path="/maker">
                <GoogleAnalyticsWrapper><PdfQuest /></GoogleAnalyticsWrapper>
              </Route>
              {cardsets.map((p) => (
                <Route key={p.slug} path={p.slug}>
                  <GoogleAnalyticsWrapper><CardSetView slug={p.slug} /></GoogleAnalyticsWrapper>
                </Route>
              ))}
              <Route path="/">
                <GoogleAnalyticsWrapper><CardSetView slug="/home" /></GoogleAnalyticsWrapper>
              </Route>
            </Switch>
          </Router>
        </MinSize>
      </ThemeProvider>
    </Suspense>
  );
};

export default hot(module)(App);
