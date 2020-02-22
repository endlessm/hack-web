import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container, Box,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import QuestCardGrid from './quest-card-grid';
import ImageHeaderBg from './home-background-header.jpg';
import ImageMainBg from './home-background-main.jpg';


const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${ImageHeaderBg}')`,
    backgroundSize: '100%',
    backgroundPosition: 'bottom',
  },
  titleBox: {
    height: '10em',
    padding: '6em 0',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-center',
    color: 'white',
  },
  pathwayCard: {
    margin: '0 1em',
  },
  cardsBox: {
    width: '100%',
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${ImageMainBg}')`,
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    padding: '4em 0',
    display: 'flex',
  },
});

const Pathway = ({ slug }) => {
  const classes = useStyles();
  const pathways = useSelector((state) => state.pathways);
  const pathway = pathways.find((p) => slug === p.slug);

  return (
    <>
      <Container className={classes.root}>
        <Box className={classes.cardsBox}>
          <Container fixed>
            <QuestCardGrid pathway={pathway} quests={pathway.quests} />
          </Container>
        </Box>
      </Container>
    </>
  );
};

Pathway.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default Pathway;
