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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '16em',
    height: '24em',
    display: 'flex',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    borderColor: theme.palette.common.white,
    borderStyle: 'solid',
    borderRadius: '1em',
    borderWidth: 0,
    position: 'relative',
    margin: '0.5em',
    transition: `transform ${theme.transitions.duration.standard}ms linear`,
    textDecoration: 'none',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    '&:hover $backgroundBox': {
      transform: 'scale(1.2)',
    },
  },
  rootSelected: {
    boxShadow: `0px 0px 0px ${theme.spacing(1)}px ${theme.palette.primary.main}`,
  },
  backgroundBox: {
    backgroundImage: ({ card }) => {
      const bgImg = `url('/assets/cards/${card.slug.slice(1)}/card.png')`;
      return `${bgImg}, url('${defaultImage}')`;
    },
    position: 'absolute',
    width: '100%',
    height: '100%',
    transition: `transform ${theme.transitions.duration.standard}ms linear`,
  },
  cardContent: {
    borderTop: `${theme.spacing(1)}px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.background.paper,
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
    transition: `max-height ${theme.transitions.duration.standard}ms linear, padding ${theme.transitions.duration.standard}ms linear`,
    maxHeight: 0,
    overflow: 'hidden',
  },
  collapsableBoxSelected: {
    // Just a big height.
    maxHeight: '16em',
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
