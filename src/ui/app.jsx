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
import Home from './home';
import Pathway from './pathway';
import Login, { RequireAuth } from './login';
import SignUp from './signup';
import ResetPassword from './reset';

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
  const pathways = useSelector((state) => state.pathways);

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
          {pathways.map((p) => (
            <Route key={p.slug} path={`/${p.slug}`}>
              <RequireAuth>
                <GAWrapper><Pathway slug={p.slug} /></GAWrapper>
              </RequireAuth>
            </Route>
          ))}
          <Route path="/">
            <RequireAuth>
              <GAWrapper><Home /></GAWrapper>
            </RequireAuth>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default hot(module)(App);
