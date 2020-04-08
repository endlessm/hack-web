import React from 'react';
import clsx from 'clsx';
import {
  Box,
  Drawer,
  Fab,
  makeStyles,
  Paper,
} from '@material-ui/core';
import {
  ChevronLeft,
  ChevronRight,
} from '@material-ui/icons';

import PropTypes from 'prop-types';

import SlideToHack from './slide-to-hack';
import FlipToHack from './flip-to-hack';

import HackIconOpen from './hack-icon-open.svg';
import HackIconClose from './hack-icon-close.svg';

const useStyles = makeStyles((theme) => {
  // Fill 3 of 12 columns in XL screen size:
  const drawerWidth = theme.breakpoints.values.xl * 0.25;

  const marginTransition = theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  });

  const marginTransitionShift = theme.transitions.create('margin', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  });

  return {
    root: {
      display: 'flex',
      height: '100%',
    },
    dialogueToggleButton: {
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1),
      zIndex: theme.zIndex.drawer + 1,
    },
    dialogueToggleButtonClosed: {
      boxShadow: 'none',
    },
    toolboxToggleButton: {
      position: 'absolute',
      borderRadius: '0 50% 50% 0',
      top: `calc(50% - ${theme.spacing(3)}px)`,
    },
    controlsContainer: {
      position: 'absolute',
      top: theme.spacing(1),
      right: 0,
      marginRight: theme.spacing(12),
      transition: marginTransition,
    },
    controlsContainerShift: {
      transition: marginTransitionShift,
      marginRight: drawerWidth + theme.spacing(2),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      overflow: 'hidden',
      flexGrow: 1,
      transition: marginTransition,
      marginRight: theme.spacing(10) - drawerWidth,
      height: '100%',
    },
    contentShift: {
      transition: marginTransitionShift,
      marginRight: 0,
    },
    hackFabRoot: {
      boxShadow: 'none',
    },
    hackIcon: {
      width: `${theme.spacing(6)}px`,
      height: `${theme.spacing(6)}px`,
    },
    canvas: {
      textAlign: 'center',
      position: 'relative',
      width: '100%',
      height: '100%',
    },
  };
});


const QuestFTHView = ({
  toolbox, canvas, sidebar, controls, onFlipped, sideBySide,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [flipped, setFlipped] = React.useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const toggleFlip = () => {
    setFlipped(!flipped);
    if (onFlipped) {
      onFlipped(!flipped);
    }
  };

  return (
    <div className={classes.root}>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {toolbox ? (
          <>
            {sideBySide ? (
              <SlideToHack flipped={flipped} toolbox={toolbox} canvas={canvas} />
            ) : <FlipToHack flipped={flipped} toolbox={toolbox} canvas={canvas} />}
          </>
        ) : <div className={classes.canvas}>{canvas}</div>}
        {toolbox && (
          <Fab
            color="secondary"
            aria-label="open toolbox"
            edge="end"
            size="medium"
            onClick={toggleFlip}
            className={classes.toolboxToggleButton}
          >
            {flipped ? <ChevronLeft /> : <ChevronRight />}
          </Fab>
        )}
        {controls && (
          <Box className={clsx(classes.controlsContainer, {
            [classes.controlsContainerShift]: open,
          })}
          >
            {controls}
          </Box>
        )}
      </main>
      <Paper
        elevation={6}
        className={clsx(classes.dialogueToggleButton, {
          [classes.dialogueToggleButtonClosed]: !open,
        })}
      >
        <Box m={1}>
          <Fab
            color="primary"
            aria-label="open / close dialogue"
            size="medium"
            onClick={toggleOpen}
            classes={{ root: classes.hackFabRoot }}
          >
            {open ? (
              <HackIconClose className={classes.hackIcon} />
            ) : (
              <HackIconOpen className={classes.hackIcon} />
            )}
          </Fab>
        </Box>
      </Paper>
      <Drawer
        variant="persistent"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
        open={open}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="stretch"
          height="100%"
        >
          {sidebar}
        </Box>
      </Drawer>
    </div>
  );
};

QuestFTHView.propTypes = {
  toolbox: PropTypes.element,
  canvas: PropTypes.element.isRequired,
  sidebar: PropTypes.element.isRequired,
  controls: PropTypes.element,
  onFlipped: PropTypes.func,
  sideBySide: PropTypes.bool,
};

QuestFTHView.defaultProps = {
  onFlipped: null,
  toolbox: null,
  controls: null,
  sideBySide: false,
};

export default QuestFTHView;
