import React, { useEffect, useState } from 'react';
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
import { GoButton } from './main-button';

const defaultImage = '/assets/cards/default-card.png';

const useStyles = makeStyles(({
  breakpoints, custom, palette, spacing, transitions,
}) => ({
  root: {
    pointerEvents: 'painted',
    marginLeft: 'auto',
    marginRight: 'auto',
    [breakpoints.down('md')]: {
      width: custom.cardSizes.downMd.width,
      height: custom.cardSizes.downMd.height,
    },
    [breakpoints.only('lg')]: {
      width: custom.cardSizes.onlyLg.width,
      height: custom.cardSizes.onlyLg.height,
    },
    [breakpoints.only('xl')]: {
      width: custom.cardSizes.onlyXl.width,
      height: custom.cardSizes.onlyXl.height,
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'relative',
    backgroundImage: `url('${defaultImage}')`,
    transition: `transform ${transitions.duration.standard}ms linear`,
    '&:hover': {
      transform: 'scale(1.05)',
    },
    '&:hover $backgroundBox': {
      transform: 'scale(1.2)',
    },
  },
  coverBackground: {
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
  },
  rootSelected: {
    boxShadow: `0px 0px 0px ${spacing(1)}px ${palette.primary.main}`,
  },
  backgroundBox: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    transition: `${transitions.create(['opacity'], {
      easing: transitions.easing.easeOut,
      duration: transitions.duration.enteringScreen,
    })}, transform ${transitions.duration.standard}ms linear`,
  },
  backgroundBoxLoaded: {
    opacity: 1,
    backgroundImage: ({ card }) => `url('/assets/cards/${card.slug.slice(1)}/side-panel.png')`,
  },
  titleLoading: {
    opacity: 0,
    transition: transitions.create(['opacity'], {
      easing: transitions.easing.easeOut,
      duration: transitions.duration.enteringScreen,
    }),
  },
  titleLoaded: {
    opacity: 1,
  },
  cardContent: {
    borderTop: `${spacing(1)}px solid ${palette.primary.main}`,
    backgroundColor: palette.background.paper,
    zIndex: 1,
    [breakpoints.down('lg')]: {
      padding: `${spacing(0.5)}px`,
      '& .MuiTypography-gutterBottom': {
        marginBottom: 0,
      },
    },
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: spacing(1),
    [breakpoints.down('md')]: {
      padding: `0 0 ${spacing(1)}px 0`,
    },
  },
  collapsableBox: {
    display: 'flex',
    flexDirection: 'column',
    transition: `max-height ${transitions.duration.standard}ms linear, padding ${transitions.duration.standard}ms linear`,
    maxHeight: 0,
    overflow: 'hidden',
  },
  collapsableBoxSelected: {
    [breakpoints.down('md')]: {
      maxHeight: custom.cardSizes.downMd.height,
    },
    [breakpoints.only('lg')]: {
      maxHeight: custom.cardSizes.onlyLg.height,
    },
    [breakpoints.only('xl')]: {
      maxHeight: custom.cardSizes.onlyXl.height,
    },
  },
  cardSubtitle: {
    [breakpoints.down('md')]: {
      display: 'none',
    },
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

  const [loaded, setLoaded] = useState(false);

  const handleClick = () => {
    if (!loaded) return;
    if (isSelected) return;
    dispatch(actions.selectCard(cardset, card));
    dispatch(actions.sidePanelSetOpen());
  };

  useEffect(() => {
    const image = new Image();
    image.src = `/assets/cards/${card.slug.slice(1)}/side-panel.png`;
    image.onload = () => {
      setLoaded(true);
    };
  }, [card.slug]);

  return (
    <Card
      elevation={6}
      className={clsx(
        classes.root,
        classes.coverBackground,
        isSelected && classes.rootSelected,
      )}
      onClick={handleClick}
    >
      <Box className={clsx(
        classes.coverBackground,
        classes.backgroundBox,
        loaded && classes.backgroundBoxLoaded,
      )}
      />
      <CardActionArea>
        <CardContent className={classes.cardContent}>
          <Typography
            className={clsx(
              classes.titleLoading,
              loaded && classes.titleLoaded,
            )}
            gutterBottom
          >
            <b>{ `${card.name}` }</b>
          </Typography>
          <Box className={clsx(
            classes.collapsableBox,
            isSelected && classes.collapsableBoxSelected,
          )}
          >
            <Typography variant="body2" color="textSecondary" className={classes.cardSubtitle}>
              { card.subtitle }
            </Typography>
            <CardActions className={classes.cardActions}>
              <GoButton card={card} />
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

function useCard() {
  // eslint-disable-next-line no-restricted-globals
  const slug = location.pathname;

  return useSelector((state) => {
    const cardset = state.cardsets.find((cs) => cs.slug === '/home');

    if (!cardset) {
      // default state if it's not initialized yet, this is needed because with
      // translations the cardset is lazy loaded and we can try to get the current
      // quest card when the cardset is undefined
      return {
        slug: '',
        name: '',
        subtitle: '',
        description: '',
      };
    }

    return cardset.cards.find((c) => slug === c.slug);
  });
}

export { HackCard as default, useCard };
