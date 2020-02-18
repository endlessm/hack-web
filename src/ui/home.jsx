import React from 'react';
import {
  Typography,
} from '@material-ui/core';

import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { fade } from '@material-ui/core/styles/colorManipulator';

import PathwayCard from './pathway-card';

import ImageHeaderBg from './home-background-header.jpg';
import ImageMainBg from './home-background-main.jpg';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${ImageHeaderBg}')`,
    backgroundSize: '100%',
    backgroundPosition: 'bottom',
    width: '100%',
    height: '100%',
  },
  titleBox: {
    backgroundImage: `linear-gradient(270deg, ${fade(theme.palette.primary.main, 0.5)} 75%, rgba(0, 0, 0, 0.0)), url('${ImageMainBg}')`,
    backgroundSize: '100% auto',
    width: '100%',
    height: '35em',
    padding: '8em',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderWidth: '2em 0',
    borderStyle: 'solid',
    borderColor: theme.palette.primary.main,
    color: 'white',
    boxShadow:
      'inset 0em 1em 1em -1em black,'
      + 'inset 0 -1em 1em -1em black',
  },
  cardsBox: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  pathwayCard: {
    margin: '0 1em',
  },
}));

export default () => {
  const pathways = useSelector((state) => state.pathways);
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.titleBox}>
        <Typography variant="h1">
          <Box fontWeight="fontWeightMedium">
            Hack Web
          </Box>
        </Typography>
        <Typography variant="h5">
          <Box fontStyle="italic">
            Pick a category to get started
          </Box>
        </Typography>
      </Box>
      <Box className={classes.cardsBox}>
        <Grid container justify="center" className={classes.cardGrid}>
          {pathways.map((p) => (
            <Grid key={p.slug} item>
              <Box className={classes.pathwayCard}>
                <PathwayCard pathway={p} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
