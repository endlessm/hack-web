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

import store, { actions } from '../../store';
import { proxyApp, updateApp } from '../toolbox/tools';
import Toolbox from '../toolbox/fizzics';

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

  useEffect(() => {
    const changeCallback = (params) => {
      dispatch(actions.gameSet(params));
    };

    // Creates a proxy to track iframe globalParameters
    proxyApp('globalParameters', changeCallback);

    const handleChange = () => {
      updateApp('globalParameters', store.getState().game);
    };
    return store.subscribe(handleChange);
  });

  const toolbox = (
    <Toolbox />
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
