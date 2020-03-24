import React from 'react';
import {
  Typography,
  Box, Container,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

import PathwayCardGrid from './pathway-card-grid';

import ImageHeaderBg from './home-background-header.jpg';
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
    backgroundImage: `linear-gradient(${theme.custom.landingTitleGradientDirection}deg, ${fade(theme.palette.primary.main, 0.5)} 75%, transparent), url('${ImageMainBg}')`,
    backgroundSize: '100% auto',
    width: '100%',
    height: '35em',
    padding: '8em',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderWidth: '2em 0',
    borderStyle: 'solid',
    borderColor: theme.palette.primary.main,
    color: theme.palette.secondary.contrastText,
    boxShadow:
           `inset 0em 1em 1em -1em ${theme.palette.common.black},`
           + `inset 0 -1em 1em -1em ${theme.palette.common.black}`,
  },
  cardsBox: {
    // FIXME remove the linear-gradient, it should be part of the asset.
    backgroundImage: `linear-gradient(${fade(theme.palette.common.black, 0.5)}, ${fade(theme.palette.common.black, 0.5)}), url('${ImageHeaderBg}')`,
    backgroundPosition: 'bottom',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    padding: '4em 0',
  },
  pathwayCard: {
    margin: '0 1em',
  },
}));

export default () => {
  const pathways = useSelector((state) => state.pathways);
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Container className={classes.content}>
        <Box className={classes.titleBox}>
          <Typography variant="h1">
            <Box fontWeight="fontWeightMedium">
              Hack Web
            </Box>
          </Typography>
          <Typography variant="h5">
            <Box fontStyle="italic">
              Pick a category to get started
            </Box>
          </Typography>
        </Box>
        <Box className={classes.cardsBox}>
          <PathwayCardGrid pathways={pathways} />
        </Box>
      </Container>
    </Box>
  );
};
