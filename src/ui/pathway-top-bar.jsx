import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Toolbar } from '@material-ui/core';
import PropTypes from 'prop-types';
import { fade } from '@material-ui/core/styles/colorManipulator';

import { pathwayType } from './types';
import { RequireAuth } from './login';


const useStyles = makeStyles((theme) => ({
  appBar: {
    margin: 0,
  },
  topBarBox: {
    width: '100%',
    display: 'flex',
    marginBottom: '2em',
    backgroundImage: `linear-gradient(270deg, ${fade(theme.palette.primary.main, 0.5)}, ${fade(theme.palette.secondary.main, 0.5)})`,
    backgroundSize: '100% auto',
  },
  toolbar: {
    minHeight: '12em',
  },
  topBarSpace: {
    flexGrow: 1,
    position: 'relative',
  },
  characterBg: {
    backgroundImage: ({ pathway }) => `url('/assets/pathways/${pathway.slug}-header.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    backgroundSize: 'auto 100%',
    margin: '0 1.5em',
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
    position: 'absolute',
  },
  titleBox: {
    height: '10em',
    paddingBottom: '6em 0',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-center',
    color: 'white',
  },
}));

const PathwayTopBar = ({ children, pathway }) => {
  const classes = useStyles({ pathway });

  const innerBar = () => (
    <Box className={classes.topBarBox}>
      <Box className={classes.topBarSpace}>
        <div className={classes.characterBg} />
      </Box>
      <Box className={classes.titleBox}>
        <Typography variant="h3">
          <Box fontWeight="fontWeightMedium">
            {`${pathway.name} pathway`}
          </Box>
        </Typography>
        <Typography variant="h5">
          <Box fontStyle="italic">
            Pick a card to get started
          </Box>
        </Typography>
      </Box>
      <Box className={classes.topBarSpace} />
    </Box>
  );

  return (
    <RequireAuth inner={innerBar()}>
      {/* FIXME: Height is hard-coded matching the height of the bar
      to prevent children content appearing below the bar. */}
      <Toolbar className={classes.toolbar} />
      {children}
    </RequireAuth>
  );
};

PathwayTopBar.propTypes = {
  pathway: pathwayType.isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
};

export default PathwayTopBar;
