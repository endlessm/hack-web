import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

import ImageMainBg from './background.png';
import SidePanel from './side-panel';
import { getGoButton } from './main-button';
import QuestFTHView from './quest-fth-view';
import HackCard from './hack-card';

const useStyles = makeStyles((theme) => ({
  root: {
    height: `calc(100% - ${theme.spacing(10)}px)`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundImage: `url('${ImageMainBg}')`,
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));

const CardSetView = ({ slug }) => {
  const classes = useStyles();
  const cardset = useSelector((state) => state.cardsets.find((cs) => slug === cs.slug));
  const selectedCard = useSelector((state) => state.ui.cardSelected[slug]);

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
      buttons={selectedCard ? getGoButton(selectedCard) : null}
      expanded
    />
  );

  const canvas = (
    <Box className={classes.root}>
      <Container fixed maxWidth="md">
        <Grid container spacing={4}>
          {
            cardset.cards.map((c) => (
              <Grid key={c.slug} item xs={4}>
                <Container>
                  <HackCard cardset={cardset} card={c} />
                </Container>
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </Box>
  );

  return (
    <QuestFTHView
      canvas={canvas}
      sidebar={sidebar}
      title={cardset.name}
      hideHomeIcon={cardset.slug === '/home'}
    />
  );
};

CardSetView.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default CardSetView;
