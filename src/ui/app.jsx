import { hot } from 'react-hot-loader';
import React, { Suspense, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'typeface-roboto';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';

import './app.css';
import theme from './theme';
import CardSetView from './card-set-view';
import Login, { RequireAuth } from './login';
import SignUp from './signup';
import ResetPassword from './reset';

import { P5Quest } from './quests/p5-quest';
import { HtmlQuest } from './quests/html-quest';
import { PdfQuest } from './quests/pdf-quest';
import { SidetrackQuest } from './quests/sidetrack-quest';

ReactGA.initialize('UA-160877903-1');
ReactGA.set({ anonymizeIp: true });
const GAWrapper = ({ children }) => {
  const { location } = window;

  // This should be done in a effect to get the children component rendered so
  // we've the final document.title setted
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(location.pathname);
    }
  }, [location.pathname]);

  return children;
};

GAWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

const App = () => {
  const cardsets = useSelector((state) => state.cardsets);

  return (
    <Suspense fallback="loading">
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
                <GAWrapper><SidetrackQuest /></GAWrapper>
              </RequireAuth>
            </Route>
            <Route path="/art">
              <RequireAuth>
                <GAWrapper><P5Quest /></GAWrapper>
              </RequireAuth>
            </Route>
            <Route path="/web">
              <RequireAuth>
                <GAWrapper><HtmlQuest /></GAWrapper>
              </RequireAuth>
            </Route>
            <Route path="/maker">
              <RequireAuth>
                <GAWrapper><PdfQuest /></GAWrapper>
              </RequireAuth>
            </Route>
            {cardsets.map((p) => (
              <Route key={p.slug} path={p.slug}>
                <RequireAuth>
                  <GAWrapper><CardSetView slug={p.slug} /></GAWrapper>
                </RequireAuth>
              </Route>
            ))}
            <Route path="/">
              <RequireAuth>
                <GAWrapper><CardSetView slug="/home" /></GAWrapper>
              </RequireAuth>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </Suspense>
  );
};

export default hot(module)(App);
