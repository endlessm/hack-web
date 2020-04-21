import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  AppBar,
  Box,
  makeStyles,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';

import {
  Home,
} from '@material-ui/icons';


const useStyles = makeStyles(({ spacing, mixins }) => ({
  toolbar: {
    marginTop: spacing(1),
    marginBottom: spacing(1),
  },
  offset: {
    ...mixins.toolbar,
    marginTop: spacing(2),
  },
}));

const HackTopBar = ({ title, hideHomeIcon }) => {
  const classes = useStyles();

  return (
    <Box>
      <AppBar elevation={0}>
        <Toolbar className={classes.toolbar}>
          {!hideHomeIcon && (
            <IconButton
              component={RouterLink}
              to="/"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <Home />
            </IconButton>
          )}
          <Typography variant="h5" color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </Box>
  );
};

HackTopBar.propTypes = {
  title: PropTypes.string.isRequired,
  hideHomeIcon: PropTypes.bool,
};

HackTopBar.defaultProps = {
  hideHomeIcon: false,
};

export default HackTopBar;
