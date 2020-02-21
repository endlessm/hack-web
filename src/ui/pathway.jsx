import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import {
  Container, Typography, Box, AppBar, Toolbar,
} from '@material-ui/core';


import PropTypes from 'prop-types';
import { fade } from '@material-ui/core/styles/colorManipulator';

import QuestCardGrid from './quest-card-grid';


import ImageHeaderBg from './home-background-header.jpg';
import ImageMainBg from './home-background-main.jpg';


const useStyles = makeStyles((theme) => ({
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
  appBar: {
    margin: 0,
  },
  topBarBox: {
    width: '100%',
    display: 'flex',
    margin: '2em 0em',
    backgroundImage: `linear-gradient(270deg, ${fade(theme.palette.primary.main, 0.5)}, ${fade(theme.palette.secondary.main, 0.5)})`,
    backgroundSize: '100% auto',
  },
  toolbar: {
    height: '14em',
  },
  topBarSpace: {
    flexGrow: 1,
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
}));

const Pathway = ({ slug }) => {
  const classes = useStyles();
  const pathways = useSelector((state) => state.pathways);
  const pathway = pathways.find((p) => slug === p.slug);

  return (
    <>
      <AppBar className={classes.appBar}>
        <Box className={classes.topBarBox}>
          <Box className={classes.topBarSpace} />
          <Box className={classes.titleBox}>
            <Typography variant="h3">
              <Box fontWeight="fontWeightMedium">
                {`${pathway.name} pathway`}
              </Box>
            </Typography>
            <Typography variant="h5">
              <Box fontStyle="italic">
                Pick a card to get started
              </Box>
            </Typography>
          </Box>
          <Box className={classes.topBarSpace} />
        </Box>
      </AppBar>
      <Toolbar className={classes.toolbar} />
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
