import React, { useState } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { actions } from '../store';
import { cardSetType, cardType } from './types';

const defaultImage = '/assets/cards/default-card.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '16em',
    minHeight: '24em',
    display: 'flex',
    backgroundRepeat: 'no reapeat',
    backgroundSize: '100% 100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    borderColor: theme.palette.common.white,
    borderStyle: 'solid',
    borderRadius: '1em',
    borderWidth: 0,
    position: 'relative',
    margin: '0.5em',
    transition: `margin ${theme.transitions.duration.standard}ms ease`,
    textDecoration: 'none',
  },
  rootExpanded: {
    margin: '0 0.5em',
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
  backgroundBoxExpanded: {
    transform: 'scale(1.2)',
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
  collapsableBoxExpanded: {
    // Just a big height.
    maxHeight: '16em',
  },
  button: {
    borderRadius: '1em',
    padding: '0 1em',
    // FIXME is changing from primary color to secondary colors on
    // hover part of the spec?
    '&:hover': {
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.main,
    },
  },
  actions: {
    justifyContent: 'flex-end',
    padding: '1em',
  },
}));

const HackCard = ({ card, cardset }) => {
  const [expanded, setExpanded] = useState(false);

  const classes = useStyles({ card });

  const dispatch = useDispatch();

  const isSelected = useSelector((state) => state.ui.cardSelected[cardset.slug] === card);

  const handleMouseEnter = () => {
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
  };

  const handleClick = () => {
    dispatch(actions.selectCard(cardset, card));
    dispatch(actions.sidePanelSetOpen());
  };

  return (
    <Card
      className={clsx(
        classes.root,
        expanded && classes.rootExpanded,
        isSelected && classes.rootSelected,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <Box className={clsx(classes.backgroundBox, expanded && classes.backgroundBoxExpanded)} />
      <CardActionArea>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom>
            <b>{ `${card.name}` }</b>
          </Typography>
          <Box className={clsx(classes.collapsableBox, expanded && classes.collapsableBoxExpanded)}>
            <Typography variant="body2" color="textSecondary">
              { card.subtitle }
            </Typography>
            <CardActions className={classes.cardActions}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                disableElevation
                className={classes.button}
              >
                Show
              </Button>
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
