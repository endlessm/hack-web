import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Typography, Box, Toolbar,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';

import { pathwayType } from './types';


const useStyles = makeStyles((theme) => ({
  appBar: {
    margin: 0,
  },
  topBarBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '2em 0',
    backgroundImage: `linear-gradient(270deg, ${fade(theme.palette.primary.main, 0.5)}, ${fade(theme.palette.secondary.main, 0.5)})`,
    backgroundSize: '100% auto',
  },
  toolbar: {
    minHeight: '14em',
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

const PathwayTopBar = ({ pathway }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar>
        <Box className={classes.topBarBox}>
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
        </Box>
      </AppBar>

      {/* FIXME: Height is hard-coded matching the height of the bar
      to prevent children content appearing below the bar. */}
      <Toolbar className={classes.toolbar} />
    </>
  );
};

PathwayTopBar.propTypes = {
  pathway: pathwayType.isRequired,
};

export default PathwayTopBar;
