import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, IconButton, Typography, Box, Toolbar,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';

import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';

import { pathwayType } from './types';


const useStyles = makeStyles((theme) => ({
  appBar: {
    margin: 0,
  },
  topBarBox: {
    width: '100%',
    height: '10em',
    display: 'flex',
    justifyContent: 'center',
    margin: '2em 0',
    backgroundImage: `linear-gradient(270deg, ${fade(theme.palette.primary.main, 0.5)}, ${fade(theme.palette.secondary.main, 0.5)})`,
    backgroundSize: '100% auto',
  },
  navButton: {
    alignSelf: 'center',
  },
  characterBg: {
    backgroundImage: ({ pathway }) => `url('/assets/pathways/${pathway.slug}-header.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    backgroundSize: 'auto 100%',
    marginRight: '1.5em',
    width: 142,
  },
  toolbar: {
    minHeight: '14em',
  },
  titleBox: {
    paddingBottom: '6em 0',
    margin: '0 1em 0 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-center',
    color: 'white',
  },
}));

const PathwayTopBar = ({ pathway }) => {
  const pathways = useSelector((state) => state.pathways);
  const pathwayIndex = pathways.findIndex((p) => pathway.slug === p.slug);

  const classes = useStyles({ pathway });

  const getNextPathwayUrl = (() => {
    const i = (pathwayIndex + 1) % pathways.length;
    return `/${pathways[i].slug}`;
  })();

  const getPrevPathwayUrl = (() => {
    const i = (pathwayIndex + pathways.length - 1) % pathways.length;
    return `/${pathways[i].slug}`;
  })();

  return (
    <>
      <AppBar>
        <Box className={classes.topBarBox}>
          <IconButton className={classes.navButton} component={RouterLink} to={getPrevPathwayUrl}>
            <NavigateBeforeRoundedIcon />
          </IconButton>
          <div className={classes.characterBg} />
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
          <IconButton className={classes.navButton} component={RouterLink} to={getNextPathwayUrl}>
            <NavigateNextRoundedIcon />
          </IconButton>
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
