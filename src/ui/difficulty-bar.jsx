import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

import { difficultyType } from './types';


const barProportions = {
  easy: 1,
  medium: 2,
  hard: 3,
};

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 1,
    height: '0.75em',
    display: 'flex',
  },
  bar: {
    flexGrow: ({ difficulty }) => barProportions[difficulty],
    backgroundImage: ({ difficulty }) => {
      const { colors } = theme.custom.difficultyBar[difficulty];
      return `linear-gradient(to right, ${colors[0]}, ${colors[1]})`;
    },
  },
  space: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: ({ difficulty }) => Object.keys(barProportions).length - barProportions[difficulty],
  },
  overlayBox: {
    zIndex: 2,
    position: 'absolute',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  separator: {
    backgroundColor: theme.palette.background.paper,
    width: '0.2em',
  },
  empty: {
    flexGrow: 1,
  },
}));

const DifficultyBar = ({ difficulty }) => {
  const classes = useStyles({ difficulty });

  return (
    <Box className={classes.root}>
      <Box className={classes.overlayBox}>
        {/* Do this programatically if more difficulty levels added. */}
        <Box className={classes.empty} />
        <Box className={classes.separator} />
        <Box className={classes.empty} />
        <Box className={classes.separator} />
        <Box className={classes.empty} />
      </Box>
      <Box className={classes.bar} />
      <Box className={classes.space} />
    </Box>
  );
};

DifficultyBar.propTypes = {
  difficulty: difficultyType.isRequired,
};

export default DifficultyBar;
