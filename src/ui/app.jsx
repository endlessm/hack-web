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
          <Route path="/games/fixme-name-the-sidetrack-quest">
            <RequireAuth>
              <GAWrapper><SidetrackQuest /></GAWrapper>
            </RequireAuth>
          </Route>
          <Route path="/art/fixme-name-the-p5-quest">
            <RequireAuth>
              <GAWrapper><P5Quest /></GAWrapper>
            </RequireAuth>
          </Route>
          <Route path="/web/fixme-name-the-html-quest">
            <RequireAuth>
              <GAWrapper><HtmlQuest /></GAWrapper>
            </RequireAuth>
          </Route>
          <Route path="/maker/make-change">
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
