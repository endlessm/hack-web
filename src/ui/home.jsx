import React from 'react';
import {
  Container, Typography, ButtonGroup, Button,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';

import pathwaysType from './types';

const Home = ({ pathways }) => (
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

Home.propTypes = {
  pathways: pathwaysType.isRequired,
};

const mapStateToProps = (state) => (
  {
    pathways: state.pathways,
  }
);

export default connect(mapStateToProps)(Home);
