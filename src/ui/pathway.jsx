import React from 'react';
import {
  Container, Typography, ButtonGroup, Button,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Pathway = ({ name }) => (
  <Container>
    <Typography variant="h2" component="h1">
      {`Pathway: ${name}`}
    </Typography>
    <ButtonGroup
      orientation="vertical"
      size="large"
      color="primary"
      variant="contained"
    >
      <Button component={RouterLink} to="/">Back</Button>
    </ButtonGroup>
  </Container>
);

Pathway.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Pathway;
