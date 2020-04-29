import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Box,
  ButtonBase,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { actions } from '../store';
import ImageMainBg from './background.png';
import SidePanel from './side-panel';
import { GoButton } from './main-button';
import QuestFTHView from './quest-fth-view';
import HackCard from './hack-card';

const useStyles = makeStyles(({
  breakpoints, custom, spacing, zIndex,
}) => ({
  root: {
    height: `calc(100% - ${spacing(10)}px)`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundImage: `url('${ImageMainBg}')`,
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  cardsContainer: {
    pointerEvents: 'none',
    zIndex: zIndex.appBar - 10,
    [breakpoints.down('md')]: {
      maxWidth: custom.cardSizes.downMd.containerWidth,
    },
    [breakpoints.only('lg')]: {
      maxWidth: custom.cardSizes.onlyLg.containerWidth,
    },
    [breakpoints.only('xl')]: {
      maxWidth: custom.cardSizes.onlyXl.containerWidth,
    },
  },
  backgroundButton: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: zIndex.appBar - 20,
  },
}));

const CardSetView = ({ slug }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cardset = useSelector((state) => state.cardsets.find((cs) => slug === cs.slug));
  const selectedCard = useSelector((state) => state.ui.cardSelected[slug]);

  useEffect(() => {
    dispatch(actions.sidePanelSetOpen());
  }, [dispatch]);

  const getContent = (card) => (
    <Grid container justify="flex-start">
      <Grid item>
        <Typography variant="h4">
          {card.name}
        </Typography>
        <Typography gutterBottom variant="subtitle1" color="textSecondary">
          {card.subtitle}
        </Typography>
        <Typography variant="body1" paragraph>
          {card.description}
        </Typography>
      </Grid>
    </Grid>
  );

  const emptyContent = (
    <Grid container justify="flex-start">
      <Grid item>
        <Typography variant="h5">Hey, Hacker!</Typography>
        <Typography variant="body1">My name&apos;s Riley, and I&apos;m here to show off Endless OS and Hack! Pick a card and check out what we&apos;ve got to offer!</Typography>
      </Grid>
    </Grid>
  );

  const sidebar = (
    <SidePanel
      content={selectedCard ? getContent(selectedCard) : emptyContent}
      buttons={selectedCard ? <GoButton card={selectedCard} /> : null}
      card={selectedCard}
      expanded
    />
  );

  const onBackgroundClick = () => {
    if (selectedCard) {
      dispatch(actions.deselectCards());
    }
  };

  const canvas = (
    <Box className={classes.root}>
      <Container fixed className={classes.cardsContainer}>
        <Grid container spacing={4}>
          {
            cardset.cards.map((c) => (
              <Grid key={c.slug} item xs={12} md={4}>
                <HackCard cardset={cardset} card={c} />
              </Grid>
            ))
          }
        </Grid>
      </Container>
      <ButtonBase className={classes.backgroundButton} onClick={onBackgroundClick} />
    </Box>
  );

  return (
    <QuestFTHView
      canvas={canvas}
      sidebar={sidebar}
      title={cardset.name}
      isMainPage={slug === '/home'}
      disableHackButton
    />
  );
};

CardSetView.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default CardSetView;
