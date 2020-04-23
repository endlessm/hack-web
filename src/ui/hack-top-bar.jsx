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

const HackTopBar = ({ title, hideHomeIcon, isMainPage }) => {
  const classes = useStyles();
  const shouldShowIcon = !hideHomeIcon && !isMainPage;

  return (
    <Box>
      <AppBar elevation={0}>
        <Toolbar className={classes.toolbar}>
          {shouldShowIcon && (
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

          {isMainPage ? (
            <Box m="auto">
              <Typography variant="h5" color="inherit">
                <strong>{title}</strong>
              </Typography>
            </Box>
          ) : (
            <Typography variant="h5" color="inherit">
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
  hideHomeIcon: PropTypes.bool,
  isMainPage: PropTypes.bool,
};

HackTopBar.defaultProps = {
  hideHomeIcon: false,
  isMainPage: false,
};

export default HackTopBar;
