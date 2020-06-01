import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Box,
  ButtonBase,
  Container,
  Grid,
  makeStyles,
  useMediaQuery,
  useTheme,
  Typography,
} from '@material-ui/core';

import { actions } from '../store';
import ImageMainBg from './background.png';
import SidePanel from './side-panel';
import GoButton from './go-button';
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

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    dispatch(actions.sidePanelSetOpen());
  }, [dispatch]);

  if (!cardset) {
    return <></>;
  }

  const getContent = (card) => (
    <Grid container justify="flex-start">
      <Grid item>
        <Box px={isSmall ? 0 : 2} py={isSmall ? 0 : 1}>
          <Typography variant="h4">
            {card.name}
          </Typography>
          <Typography gutterBottom variant="subtitle1" color="textSecondary">
            {card.subtitle}
          </Typography>
          <Typography variant="body1" paragraph>
            {card.description}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );

  const sidebar = (
    <SidePanel
      content={getContent(selectedCard || cardset)}
      buttons={selectedCard ? <GoButton card={selectedCard} /> : null}
      card={selectedCard || cardset}
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
        <Grid container spacing={isSmall ? 2 : 4}>
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
