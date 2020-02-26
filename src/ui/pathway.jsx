import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {
  Container, Box,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import PathwayTopBar from './pathway-top-bar';
import QuestCardGrid from './quest-card-grid';
import PathwayOSIFrame from './pathway-os-iframe';
import ImageMainBg from './home-background-main.jpg';


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
  titleBox: {
    height: '10em',
    padding: '6em 0',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-center',
    color: 'red',
  },
  pathwayCard: {
    margin: '0 1em',
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

const Pathway = ({ slug }) => {
  const classes = useStyles();
  const pathways = useSelector((state) => state.pathways);
  const pathway = pathways.find((p) => slug === p.slug);

  return (
    <Box className={classes.root}>
      <PathwayTopBar pathway={pathway} />
      <Container className={classes.content}>
        <Box className={classes.cardsBox}>
          <Container fixed>
            <QuestCardGrid pathway={pathway} quests={pathway.quests} />
          </Container>
        </Box>
        {pathway.slug === 'os' && <PathwayOSIFrame />}
      </Container>
    </Box>
  );
};

Pathway.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default Pathway;
