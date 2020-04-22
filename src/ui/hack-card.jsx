import React from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { actions } from '../store';
import { cardSetType, cardType } from './types';
import { getGoButton } from './main-button';

const defaultImage = '/assets/cards/default-card.svg';

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  root: {
    width: `${spacing(28)}px`,
    height: `${spacing(42)}px`,
    display: 'flex',
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'relative',
    transition: `transform ${transitions.duration.standard}ms linear`,
    '&:hover': {
      transform: 'scale(1.05)',
    },
    '&:hover $backgroundBox': {
      transform: 'scale(1.2)',
    },
  },
  rootSelected: {
    boxShadow: `0px 0px 0px ${spacing(1)}px ${palette.primary.main}`,
  },
  backgroundBox: {
    backgroundImage: ({ card }) => {
      const bgImg = `url('/assets/cards/${card.slug.slice(1)}/card.png')`;
      return `${bgImg}, url('${defaultImage}')`;
    },
    position: 'absolute',
    width: '100%',
    height: '100%',
    transition: `transform ${transitions.duration.standard}ms linear`,
  },
  cardContent: {
    borderTop: `${spacing(1)}px solid ${palette.primary.main}`,
    backgroundColor: palette.background.paper,
    zIndex: 1,
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  collapsableBox: {
    display: 'flex',
    flexDirection: 'column',
    transition: `max-height ${transitions.duration.standard}ms linear, padding ${transitions.duration.standard}ms linear`,
    maxHeight: 0,
    overflow: 'hidden',
  },
  collapsableBoxSelected: {
    maxHeight: `${spacing(15.5)}px`,
  },
  actions: {
    justifyContent: 'flex-end',
    padding: '1em',
  },
}));

const HackCard = ({ card, cardset }) => {
  const classes = useStyles({ card });

  const dispatch = useDispatch();

  const isSelected = useSelector((state) => state.ui.cardSelected[cardset.slug] === card);

  const handleClick = () => {
    if (isSelected) return;
    dispatch(actions.selectCard(cardset, card));
    dispatch(actions.sidePanelSetOpen());
  };

  return (
    <Card
      elevation={6}
      className={clsx(
        classes.root,
        isSelected && classes.rootSelected,
      )}
      onClick={handleClick}
    >
      <Box className={classes.backgroundBox} />
      <CardActionArea>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom>
            <b>{ `${card.name}` }</b>
          </Typography>
          <Box className={clsx(
            classes.collapsableBox,
            isSelected && classes.collapsableBoxSelected,
          )}
          >
            <Typography variant="body2" color="textSecondary">
              { card.subtitle }
            </Typography>
            <CardActions className={classes.cardActions}>
              {getGoButton(card)}
            </CardActions>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

HackCard.propTypes = {
  card: cardType.isRequired,
  cardset: cardSetType,
};

HackCard.defaultProps = {
  cardset: null,
};

function useCardInfo() {
  // eslint-disable-next-line no-restricted-globals
  const slug = location.pathname;

  const title = useSelector((state) => {
    const cardset = state.cardsets.find((cs) => cs.slug === '/home');
    const card = cardset.cards.find((c) => slug === c.slug);
    return card.name;
  });
  return { title };
}

export { HackCard as default, useCardInfo };
