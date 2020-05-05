import { hot } from 'react-hot-loader';
import React from 'react';
import {
  Container,
  Box,
  Typography,
} from '@material-ui/core';

import TestWrapper from './test-wrapper';
import FlipToHack from '../flip-to-hack';

const App = () => {
  const width = 400;
  const height = 300;

  const toolbox = (
    <Typography variant="h4">This is the toolbox</Typography>
  );

  const canvas = (
    <canvas
      width={width}
      height={height}
      style={{ background: '#0ff' }}
    />
  );

  return (
    <TestWrapper>
      <Container>
        <Typography variant="h4">
          Flip to Hack!
        </Typography>
        <Box style={{ width, height }}>
          <FlipToHack
            toolbox={toolbox}
            canvas={canvas}
          />
        </Box>
      </Container>
    </TestWrapper>
  );
};

export default hot(module)(App);
