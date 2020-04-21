import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Container,
  fade,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

import HackCardGrid from './hack-card-grid';
import ImageMainBg from './home-background-main.jpg';
import SidePanel, { ChoiceButton } from './side-panel';

import QuestFTHView from './quest-fth-view';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    maxWidth: '100%',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  cardsBox: {
    width: '100%',
    backgroundImage: `linear-gradient(${fade(theme.palette.common.black, 0.5)}, ${fade(theme.palette.common.black, 0.5)}), url('${ImageMainBg}')`,
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    padding: '4em 0',
    display: 'flex',
    flex: 1,
  },
}));

const CardSetView = ({ slug }) => {
  const classes = useStyles();
  const cardset = useSelector((state) => state.cardsets.find((cs) => slug === cs.slug));
  const selectedCard = useSelector((state) => state.ui.cardSelected);

  const getContent = (card) => (
    <Grid container justify="flex-start">
      <Grid item>
        <Typography variant="h5">
          {card.name}
        </Typography>
        <Typography variant="body">
          {card.description}
        </Typography>
      </Grid>
    </Grid>
  );

  const getButtons = (card) => {
    // If card has href, it is an external link:
    if (card.href) {
      return (
        <ChoiceButton
          variant="contained"
          size="large"
          href={card.href}
          target="_blank"
        >
          Start
        </ChoiceButton>
      );
    }

    // Otherwise, it must be a quest:
    return (
      <ChoiceButton
        variant="contained"
        size="large"
        component={RouterLink}
        to={card.slug}
      >
        Start
      </ChoiceButton>
    );
  };

  const emptyContent = (
    <Grid container justify="flex-start">
      <Grid item>
        <Typography variant="h5">Empty Content</Typography>
        <Typography variant="body">Empty Description</Typography>
      </Grid>
    </Grid>
  );

  const sidebar = (
    <SidePanel
      content={selectedCard ? getContent(selectedCard) : emptyContent}
      buttons={selectedCard ? getButtons(selectedCard) : null}
      expanded
    />
  );

  const canvas = (
    <Box className={classes.root}>
      <Container className={classes.content}>
        <Box className={classes.cardsBox}>
          <Container fixed>
            <HackCardGrid cardset={cardset} cards={cardset.cards} />
          </Container>
        </Box>
      </Container>
    </Box>
  );

  return (
    <QuestFTHView
      canvas={canvas}
      sidebar={sidebar}
      title={cardset.name}
      hideHomeIcon={cardset.slug === 'home'}
    />
  );
};

CardSetView.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default CardSetView;
