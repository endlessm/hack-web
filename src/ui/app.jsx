import { hot } from 'react-hot-loader';
import React from 'react';
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
import browserUpdate from 'browser-update';

import './app.css';
import theme from './theme';
import CardSetView from './card-set-view';
import Login, { RequireAuth } from './login';
import SignUp from './signup';
import ResetPassword from './reset';

import { P5Quest } from './test/p5-quest.test';
import { HtmlQuest } from './test/html-quest.test';
import { PdfQuest } from './test/pdf-quest.test';
import { SidetrackQuest } from './test/sidetrack-quest.test';

browserUpdate({
  required: {
    // From Material-UI, support Firefox >= 52
    f: 52,
    // From Material-UI, support Chrome >= 49
    c: 49,
    // From Material-UI, support IE/Edge >= 14
    // 79 rest parameters
    i: 79,
    // From Material-UI, support Safari >= 10
    s: 10,
    // No Opera specified in Material-UI, so we guess the last 4 releases:
    o: -4,
  },
});

ReactGA.initialize('UA-160877903-1');
const GAWrapper = ({ children }) => {
  const { location } = window;

  if (process.env.NODE_ENV === 'production') {
    ReactGA.pageview(location.pathname);
  }

  return children;
};

GAWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

const App = () => {
  const cardsets = useSelector((state) => state.cardsets);

  return (
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
  );
};

export default hot(module)(App);
