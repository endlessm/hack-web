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

const useStyles = makeStyles(({ breakpoints, custom, spacing, zIndex }) => ({
  root: {
    height: `calc(100% - ${spacing(10)}px)`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // backgroundImage: `url('${ImageMainBg}')`,
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    [breakpoints.down('xs')]: {
      backgroundColor: '#000',
    },
    [breakpoints.between('xs', 'sm')]: {
      backgroundColor: '#f00',
    },
    [breakpoints.between('sm', 'md')]: {
      backgroundColor: '#faa',
    },
    [breakpoints.between('md', 'lg')]: {
      backgroundColor: '#afa',
    },
    [breakpoints.between('lg', 'xl')]: {
      backgroundColor: '#aaf',
    },
    [breakpoints.up('xl')]: {
      backgroundColor: '#00f',
    },
  },
  cardsContainer: {
    pointerEvents: 'none',
    zIndex: zIndex.appBar - 10,
    // backgroundColor: '#f0f',
    /* [breakpoints.down('xs')]: {
     *   maxWidth: custom.cardWidth,
     * },
     * [breakpoints.between('sm', 'lg')]: {
     *   maxWidth: custom.cardWidth * 2 + custom.cardSpacing,
     * },
     * [breakpoints.up('lg')]: {
     *   maxWidth: custom.cardWidth * 3 + custom.cardSpacing * 2,
     * }, */
    [breakpoints.down('md')]: {
      // 3 cards or less
      // maxWidth: custom.cardWidth / 2,
    },
    [breakpoints.between('md', 'lg')]: {
      // 3 cards or less
      maxWidth: custom.cardWidth / 2 * 3 + custom.cardSpacing * 2,
    },
    [breakpoints.between('lg', 'xl')]: {
      // 3 smaller cards
      maxWidth: custom.cardWidth * (2/3) * 3 + custom.cardSpacing * 2,
    },
    [breakpoints.only('xl')]: {
      maxWidth: custom.cardWidth * 3 + custom.cardSpacing * 2,
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
        <Typography variant="h5">Empty Content</Typography>
        <Typography variant="body1">Empty Description</Typography>
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
              <Grid key={c.slug} item xs={12} md={4} lg={4}>
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
