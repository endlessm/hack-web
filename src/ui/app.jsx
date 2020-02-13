import { hot } from 'react-hot-loader';
import React from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';

import 'typeface-roboto';

import theme from './theme';
import pathwaysType from './types';
import Home from './home';
import Pathway from './pathway';

const App = ({ pathways }) => (
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

// FIXME this is duplicated here and in Home.
App.propTypes = {
  pathways: pathwaysType.isRequired,
};

const mapStateToProps = (state) => (
  {
    pathways: state.pathways,
  }
);

export default hot(module)(connect(mapStateToProps)(App));
