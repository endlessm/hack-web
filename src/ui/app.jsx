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

import theme from './theme';
import Home from './home';
import Pathway from './pathway';
import Login, { RequireAuth } from './login';

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
          {pathways.map((p) => (
            <Route path={`/${p.slug}`}>
              <RequireAuth><Pathway name={p.name} /></RequireAuth>
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
