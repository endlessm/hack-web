import React, {
  useEffect,
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

import HackIconOpen from './hack-icon-open.svg';
import HackIconClose from './hack-icon-close.svg';

import Inventory from './inventory';

const useStyles = makeStyles((theme) => {
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
    dialogueToggleButtonDisabled: {
      opacity: 0.5,
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
      [theme.breakpoints.down('md')]: {
        marginRight: theme.custom.drawerWidths.downMd + theme.spacing(2),
      },
      [theme.breakpoints.only('lg')]: {
        marginRight: theme.custom.drawerWidths.onlyLg + theme.spacing(2),
      },
      [theme.breakpoints.only('xl')]: {
        marginRight: theme.custom.drawerWidths.onlyXl + theme.spacing(2),
      },
    },
    controlsContainerVisible: {
      transition: marginTransitionShift,
      opacity: 1,
    },
    drawer: {
      flexShrink: 0,
      [theme.breakpoints.down('md')]: {
        width: theme.custom.drawerWidths.downMd,
      },
      [theme.breakpoints.only('lg')]: {
        width: theme.custom.drawerWidths.onlyLg,
      },
      [theme.breakpoints.only('xl')]: {
        width: theme.custom.drawerWidths.onlyXl,
      },
    },
    drawerPaper: {
      [theme.breakpoints.down('md')]: {
        width: theme.custom.drawerWidths.downMd,
      },
      [theme.breakpoints.only('lg')]: {
        width: theme.custom.drawerWidths.onlyLg,
      },
      [theme.breakpoints.only('xl')]: {
        width: theme.custom.drawerWidths.onlyXl,
      },
    },
    content: {
      overflow: 'hidden',
      flexGrow: 1,
      transition: marginTransition,
      [theme.breakpoints.down('md')]: {
        marginRight: -theme.custom.drawerWidths.downMd,
      },
      [theme.breakpoints.only('lg')]: {
        marginRight: -theme.custom.drawerWidths.onlyLg,
      },
      [theme.breakpoints.only('xl')]: {
        marginRight: -theme.custom.drawerWidths.onlyXl,
      },
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
  toolbox, canvas, sidebar, controls, onFlipped,
  sideBySide, hideControls, title, subtitle, isMainPage, attractFTH,
  disableHackButton,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const open = useSelector((state) => state.ui.sidePanelOpen);

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

  // Hook for component unmount, to clear the timeout:
  useEffect(() => (function clenup() {
    clearTimeout(movingTimeout);
  }), [movingTimeout]);

  const toggleOpen = () => {
    dispatch(actions.sidePanelToggleOpen());
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
        { isMainPage && <Inventory /> }
        <HackTopBar title={title} subtitle={subtitle} isMainPage={isMainPage} />
        {toolbox ? (
          <>
            {sideBySide ? (
              <SlideToHack flipped toolbox={toolbox} canvas={canvasWrap} />
            ) : (
              <FlipToHack
                toolbox={toolbox}
                canvas={canvasWrap}
                attractFTH={attractFTH}
                onFlipped={onFlipped}
              />
            )}
          </>
        ) : (
          <>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <div {...bind()} className={classes.canvas}>{canvas}</div>
          </>
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
          [classes.dialogueToggleButtonDisabled]: disableHackButton,
        })}
      >
        <Box m={1}>
          <Fab
            color="primary"
            aria-label="open / close dialogue"
            size="medium"
            onClick={toggleOpen}
            classes={{ root: classes.hackFabRoot }}
            disabled={disableHackButton}
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
        {sidebar}
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
  subtitle: PropTypes.string,
  isMainPage: PropTypes.bool,
  disableHackButton: PropTypes.bool,
  attractFTH: PropTypes.bool,
};

QuestFTHView.defaultProps = {
  onFlipped: null,
  toolbox: null,
  controls: null,
  sideBySide: false,
  hideControls: true,
  subtitle: null,
  isMainPage: false,
  disableHackButton: false,
  attractFTH: false,
};

export default QuestFTHView;
