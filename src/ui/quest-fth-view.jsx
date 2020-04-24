import React, {
  useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import {
  Box,
  Drawer,
  Fab,
  makeStyles,
  Paper,
  useTheme,
} from '@material-ui/core';

import PropTypes from 'prop-types';

import { useMove } from 'react-use-gesture';

import { actions } from '../store';
import HackTopBar from './hack-top-bar';
import SlideToHack from './slide-to-hack';
import FlipToHack from './flip-to-hack';
import FTHButton from './fth-button';

import HackIconOpen from './hack-icon-open.svg';
import HackIconClose from './hack-icon-close.svg';

const useStyles = makeStyles((theme) => {
  // Fill 3 of 12 columns in XL screen size:
  const drawerWidth = theme.breakpoints.values.xl * 0.25;

  const marginTransition = theme.transitions.create(['opacity', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  });

  const marginTransitionShift = theme.transitions.create(['opacity', 'margin'], {
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
      top: `calc(50% - ${theme.spacing(2.5)}px)`,
    },
    controlsContainer: {
      position: 'absolute',
      top: theme.spacing(11),
      right: 0,
      marginRight: theme.spacing(1),
      transition: marginTransition,
      opacity: 0,
    },
    controlsContainerShift: {
      transition: marginTransitionShift,
      marginRight: drawerWidth + theme.spacing(2),
    },
    controlsContainerVisible: {
      transition: marginTransitionShift,
      opacity: 1,
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
      marginRight: -drawerWidth,
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
  toolbox, canvas, sidebar, controls, onFlipped, sideBySide, hideControls, title, isMainPage,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const open = useSelector((state) => state.ui.sidePanelOpen);

  // When sideBySide is true we show the toolbox by default
  const [flipped, setFlipped] = useState(sideBySide);

  const [movingTimeout, setMovingTimeout] = useState();
  const [controlsVisible, setControlsVisible] = useState(!hideControls);

  const theme = useTheme();

  const bind = useMove((state) => {
    if (state.first) {
      clearTimeout(movingTimeout);
      setControlsVisible(true);
    }
    if (state.last) {
      const timeout = setTimeout(() => {
        setControlsVisible(false);
      }, theme.transitions.duration.triggeredByMouse);
      setMovingTimeout(timeout);
    }
  }, {
    threshold: theme.spacing(6),
  });

  const toggleOpen = () => {
    dispatch(actions.sidePanelToggleOpen());
    if (open) {
      setTimeout(() => {
        dispatch(actions.deselectCards());
      }, theme.transitions.duration.leavingScreen);
    }
  };

  const onDrawerClose = () => {
    dispatch(actions.deselectCards());
  };

  const toggleFlip = () => {
    setFlipped(!flipped);
    if (onFlipped) {
      onFlipped(!flipped);
    }
  };

  const canvasWrap = (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <div {...bind()}>{canvas}</div>
    </>
  );

  return (
    <div className={classes.root}>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <HackTopBar title={title} isMainPage={isMainPage} />
        {toolbox ? (
          <>
            {sideBySide ? (
              <SlideToHack flipped={flipped} toolbox={toolbox} canvas={canvasWrap} />
            ) : <FlipToHack flipped={flipped} toolbox={toolbox} canvas={canvasWrap} />}
          </>
        ) : (
          <>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <div {...bind()} className={classes.canvas}>{canvas}</div>
          </>
        )}
        {toolbox && !sideBySide && (
          <FTHButton
            onClick={toggleFlip}
            className={classes.toolboxToggleButton}
            flipped={flipped}
          />
        )}
        {controls && (
          <Box className={clsx(classes.controlsContainer, {
            [classes.controlsContainerShift]: open,
            [classes.controlsContainerVisible]: controlsVisible,
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
        onClose={onDrawerClose}
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
  hideControls: PropTypes.bool,
  title: PropTypes.string.isRequired,
  isMainPage: PropTypes.bool,
};

QuestFTHView.defaultProps = {
  onFlipped: null,
  toolbox: null,
  controls: null,
  sideBySide: false,
  hideControls: true,
  isMainPage: false,
};

export default QuestFTHView;
