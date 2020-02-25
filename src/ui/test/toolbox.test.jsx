import { hot } from 'react-hot-loader';
import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TestWrapper from './test-wrapper';
import QuestFTHView from '../quest-fth-view';

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

  const toolbox = (
    <Typography variant="h4">This is the toolbox</Typography>
  );

  const canvas = (
    <iframe
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
