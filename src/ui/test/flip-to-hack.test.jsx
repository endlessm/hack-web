import { hot } from 'react-hot-loader';
import React from 'react';
import {
  Container,
  Box,
  Button,
  Typography,
} from '@material-ui/core';

import TestWrapper from './test-wrapper';
import FlipToHack from '../flip-to-hack';

const App = () => {
  const [flipped, setFlipped] = React.useState(false);

  const toggleFlip = () => {
    setFlipped(!flipped);
  };

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
          <Button onClick={toggleFlip}>Flip</Button>
          <FlipToHack
            flipped={flipped}
            toolbox={toolbox}
            canvas={canvas}
          />
        </Box>
      </Container>
    </TestWrapper>
  );
};

export default hot(module)(App);
