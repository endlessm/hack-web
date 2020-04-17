import React from 'react';

import {
  Grid,
  makeStyles,
} from '@material-ui/core';

import PropTypes from 'prop-types';

import { pathwayType, questType } from './types';
import QuestCard from './quest-card';

const useStyles = makeStyles({
  grid: {
    display: 'flex',
    justifyContent: 'space-around',
  },
});

const QuestCardGrid = ({ quests, pathway }) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={3} className={classes.grid}>
        {
          quests.map((q) => (<QuestCard key={q.slug} pathway={pathway} quest={q} />))
        }
      </Grid>
    </div>
  );
};

QuestCardGrid.propTypes = {
  quests: PropTypes.arrayOf(questType).isRequired,
  pathway: pathwayType,
};

QuestCardGrid.defaultProps = {
  pathway: null,
};

export default QuestCardGrid;
