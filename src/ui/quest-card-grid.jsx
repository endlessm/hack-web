import React from 'react';


import {
  Grid,
} from '@material-ui/core';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { pathwayType, questType } from './types';
import QuestCard from './quest-card';

const useStyles = makeStyles({
  grid: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const QuestCardGrid = ({ pathway, quests }) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={3} className={classes.grid}>
        {
          quests.map((q) => (<QuestCard pathway={pathway} quest={q} />))
        }
      </Grid>
    </div>
  );
};

QuestCardGrid.propTypes = {
  pathway: pathwayType.isRequired,
  quests: PropTypes.arrayOf(questType).isRequired,
};

export default QuestCardGrid;
