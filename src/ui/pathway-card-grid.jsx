import React, { useState } from 'react';
import {
  Box,
  Grid,
  IconButton,
  makeStyles,
  withWidth,
} from '@material-ui/core';
import {
  NavigateBeforeRounded,
  NavigateNextRounded,
} from '@material-ui/icons';
import PropTypes from 'prop-types';

import { pathwayType } from './types';
import PathwayCard from './pathway-card';

const useStyles = makeStyles((theme) => ({
  navButton: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const calculatePageSize = (width) => {
  if (width === 'xl') return 5;
  if (width === 'lg') return 4;
  if (width === 'md') return 3;
  return 1;
};

const getDisplayablePathways = (pathways, pageIndex, pageSize) => {
  const start = pageIndex;
  let end = Math.min(pageIndex + pageSize, pathways.length);

  const displayables = pathways.slice(start, end);
  if (end - start === pageSize) {
    return displayables;
  }

  end = pageSize - (end - start);
  return displayables.concat(pathways.slice(0, end));
};

const PathwayCardGrid = ({ pathways, width }) => {
  const classes = useStyles();

  const totalSize = pathways.length;
  const pageSize = calculatePageSize(width);
  const [pageIndex, setPageIndex] = useState(0);

  const displayablePathways = getDisplayablePathways(pathways, pageIndex, pageSize);

  const onBackButtonClicked = () => {
    const maybeIndex = pageIndex - 1;
    setPageIndex(maybeIndex < 0 ? totalSize : maybeIndex);
  };

  const onNextButtonClicked = () => {
    const maybeIndex = pageIndex + 1;
    setPageIndex(maybeIndex > totalSize ? 0 : maybeIndex);
  };

  return (
    <Grid container alignItems="center" justify="center">
      { pageSize !== totalSize && (
        <Grid item>
          <IconButton className={classes.navButton} onClick={onBackButtonClicked}>
            <NavigateBeforeRounded />
          </IconButton>
        </Grid>
      )}
      <Grid item>
        <Grid container>
          {displayablePathways.map(
            (p) => (
              <Grid key={p.slug} item>
                <Box m={2}>
                  <PathwayCard key={p.slug} pathway={p} />
                </Box>
              </Grid>
            ),
          )}
        </Grid>
      </Grid>
      { pageSize !== totalSize && (
        <Grid item>
          <IconButton className={classes.navButton} onClick={onNextButtonClicked}>
            <NavigateNextRounded />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
};

PathwayCardGrid.propTypes = {
  pathways: PropTypes.arrayOf(pathwayType).isRequired,
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(PathwayCardGrid);
