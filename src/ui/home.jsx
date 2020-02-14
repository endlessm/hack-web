import React from 'react';
import {
  Container, Typography, ButtonGroup, Button,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default () => {
  const pathways = useSelector((state) => state.pathways);

  return (
    <Container>
      <Typography variant="h2" component="h1">
        Hack
      </Typography>
      <ButtonGroup
        orientation="vertical"
        size="large"
        color="primary"
        variant="contained"
      >
        {pathways.map((p) => <Button component={RouterLink} to={`/${p.slug}`}>{p.name}</Button>)}
      </ButtonGroup>
    </Container>
  );
};
