import React from 'react';
import {
  Box,
  Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import { pathwayType } from './types';
import PathwayCard from './pathway-card';

const useStyles = makeStyles({
  root: {

  },
  cardItem: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '2em',
    width: ({ screen }) => {
      if (screen.large) return '20%';
      if (screen.big) return '25%';
      if (screen.medium) return '33.333%';
      if (screen.small) return '50%';
      return '100%';
    },
  },
});

const PathwayCardGrid = ({ pathways }) => {
  const small = useMediaQuery('(min-width:520px)');
  const medium = useMediaQuery('(min-width:720px)');
  const big = useMediaQuery('(min-width:1024px)');
  const large = useMediaQuery('(min-width:1200px)');

  const screen = {
    small,
    medium,
    big,
    large,
  };
  const classes = useStyles({ screen });

  return (
    <Box className={classes.root}>
      <Grid container spacing={0}>
        {pathways.map(
          (p) => (
            <Grid key={p.slug} item className={classes.cardItem}>
              <PathwayCard key={p.slug} pathway={p} />
            </Grid>
          ),
        )}
      </Grid>
    </Box>
  );
};

PathwayCardGrid.propTypes = {
  pathways: PropTypes.arrayOf(pathwayType).isRequired,
};

export default PathwayCardGrid;
