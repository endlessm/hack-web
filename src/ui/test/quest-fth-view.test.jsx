import { hot } from 'react-hot-loader';
import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

import TestWrapper from './test-wrapper';
import QuestFTHView from '../quest-fth-view';

const App = () => {
  const toolbox = (
    <Typography variant="h4">This is the toolbox</Typography>
  );

  const canvas = (
    <div style={{ backgroundColor: '#0ff', width: '100%', height: '100%' }} />
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
