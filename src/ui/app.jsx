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

const App = () => {
  const pathways = useSelector((state) => state.pathways);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          {pathways.map((p) => (
            <Route path={`/${p.slug}`}>
              <Pathway name={p.name} />
            </Route>
          ))}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default hot(module)(App);
