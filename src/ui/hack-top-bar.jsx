import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
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


const useStyles = makeStyles(({
  custom, palette, spacing, transitions, mixins,
}) => ({
  appbar: {
    background: ({ isMainPage }) => {
      if (isMainPage) {
        return palette.primary.main;
      }
      const d = spacing(10);
      return `linear-gradient(to right, ${palette.primary.main} ${d}px, ${palette.background.paper} ${d}px)`;
    },
    left: 0,
    transition: transitions.create(['width'], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen,
    }),
  },
  appbarShift: {
    width: `calc(100% - ${custom.drawerWidth}px)`,
  },
  toolbar: {
    marginTop: spacing(1),
    marginLeft: spacing(0.5),
    marginBottom: spacing(1),
  },
  offset: {
    ...mixins.toolbar,
    marginTop: spacing(2),
  },
}));

const HackTopBar = ({ title, isMainPage }) => {
  const classes = useStyles({ isMainPage });

  const open = useSelector((state) => state.ui.sidePanelOpen);

  return (
    <Box>
      <AppBar
        elevation={0}
        className={clsx(classes.appbar, {
          [classes.appbarShift]: open,
        })}
      >
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
            <Box ml={4}>
              <Typography variant="h5" color="secondary">
                {title}
              </Typography>
            </Box>
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
