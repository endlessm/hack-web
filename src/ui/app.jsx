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

import './app.css';
import theme from './theme';
import Home from './home';
import Pathway from './pathway';
import Login, { RequireAuth } from './login';
import SignUp from './signup';
import ResetPassword from './reset';

import PathwayTopBar from './pathway-top-bar';

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
            <Route path={`/${p.slug}`}>
              <PathwayTopBar pathway={p}>
                <Pathway slug={p.slug} />
              </PathwayTopBar>
            </Route>
          ))}
          <Route path="/">
            <RequireAuth><Home /></RequireAuth>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default hot(module)(App);
