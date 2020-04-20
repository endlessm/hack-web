import React from 'react';

import {
  Grid,
  makeStyles,
} from '@material-ui/core';

import PropTypes from 'prop-types';

import { cardSetType, cardType } from './types';
import HackCard from './hack-card';

const useStyles = makeStyles({
  grid: {
    display: 'flex',
    justifyContent: 'space-around',
  },
});

const HackCardGrid = ({ cardset, cards }) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={3} className={classes.grid}>
        {
          cards.map((c) => (<HackCard key={c.slug} cardset={cardset} card={c} />))
        }
      </Grid>
    </div>
  );
};

HackCardGrid.propTypes = {
  cards: PropTypes.arrayOf(cardType).isRequired,
  cardset: cardSetType,
};

HackCardGrid.defaultProps = {
  cardset: null,
};

export default HackCardGrid;
