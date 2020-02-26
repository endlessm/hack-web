import { hot } from 'react-hot-loader';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TestWrapper from './test-wrapper';
import QuestFTHView from '../quest-fth-view';

import Toolbox from './fizzics-toolbox';
import { actions } from '../../store';

const useStyles = makeStyles({
  root: {
  },
  frame: {
    width: '100%',
    height: '100vh',
    border: 'none',
  },
});

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // Dispatch the action to update the gameState in the store and also updates
  // the iframe globalParameters to reflect toolbox changes in the game
  const updateApp = (newParams) => {
    const app = document.querySelector('#app');
    if (app.contentWindow && app.contentWindow.globalParameters) {
      const { globalParameters } = app.contentWindow;

      Object.keys(newParams).forEach((property) => {
        if (!(property in globalParameters)) {
          return;
        }
        const value = newParams[property];
        if (value === globalParameters[property]) {
          return;
        }
        globalParameters[property] = value;
        dispatch(actions.gameSetParam(property, value));
      });
    }
  };

  // Creates a proxy to track iframe globalParameters
  useEffect(() => {
    const app = document.querySelector('#app');
    let proxy = null;
    let globalParameters = null;

    const proxyApp = () => {
      if (!app.contentWindow.globalParameters) {
        setTimeout(proxyApp, 500);
        return;
      }

      if (proxy) {
        return;
      }

      let timeout = null;
      const updateToolbox = () => {
        dispatch(actions.gameSet(globalParameters));
      };

      const handler = {
        set(obj, prop, val) {
          // Timeout update to just trigger one update if there are multiple changes
          if (timeout) {
            clearTimeout(timeout);
          }
          timeout = setTimeout(updateToolbox, 300);

          return Reflect.set(obj, prop, val);
        },
      };

      globalParameters = app.contentWindow.globalParameters;
      proxy = new Proxy(globalParameters, handler);
      app.contentWindow.globalParameters = proxy;

      dispatch(actions.gameSet(globalParameters));
    };

    proxyApp();

    const cleanup = () => {
      if (globalParameters) {
        app.contentWindow.globalParameters = globalParameters;
      }
    };

    return cleanup;
  });

  const toolbox = (
    <Toolbox updateApp={updateApp} />
  );

  const canvas = (
    <iframe
      id="app"
      title="Fizzics App"
      className={classes.frame}
      src="/apps/com.hack_computer.Fizzics/index.html"
    />
  );

  const sidebar = (
    <List>
      <ListItem>
        <ListItemText
          primary="This is a line of dialogue."
          secondary="Ada"
          primaryTypographyProps={{
            variant: 'body2',
          }}
        />
      </ListItem>
    </List>
  );

  return (
    <TestWrapper>
      <QuestFTHView
        toolbox={toolbox}
        canvas={canvas}
        sidebar={sidebar}
      />
    </TestWrapper>
  );
};

export default hot(module)(App);
