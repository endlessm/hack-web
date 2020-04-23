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

const HackTopBar = ({ title, isMainPage }) => {
  const classes = useStyles();

  return (
    <Box>
      <AppBar elevation={0}>
        <Toolbar className={classes.toolbar}>
          {!isMainPage && (
            <IconButton
              component={RouterLink}
              to="/"
              edge="start"
              color="secondary"
              aria-label="menu"
            >
              <Home />
            </IconButton>
          )}

          {isMainPage ? (
            <Box m="auto">
              <Typography variant="h5" color="secondary">
                <strong>{title}</strong>
              </Typography>
            </Box>
          ) : (
            <Typography variant="h5" color="secondary">
              {title}
            </Typography>
          )}

        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </Box>
  );
};

HackTopBar.propTypes = {
  title: PropTypes.string.isRequired,
  isMainPage: PropTypes.bool,
};

HackTopBar.defaultProps = {
  isMainPage: false,
};

export default HackTopBar;
