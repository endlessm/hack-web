import React from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  Drawer,
  IconButton,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import PropTypes from 'prop-types';

import FlipToHack from './flip-to-hack';

const useStyles = makeStyles((theme) => {
  const drawerWidth = theme.breakpoints.values.sm * 0.4;

  return {
    root: {
      display: 'flex',
      height: '100%',
    },
    toggleButton: {
      zIndex: 10,
      position: 'absolute',
      background: theme.palette.common.hackGreen,
      top: `calc(50% - ${theme.spacing(3)}px)`,
      '&:hover': {
        background: theme.palette.common.hackGreen,
      },
    },
    sidebarToggleButton: {
      borderRadius: '50% 0 0 50%',
      right: 0,
    },
    toolboxToggleButton: {
      borderRadius: '0 50% 50% 0',
      left: 0,
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
      position: 'relative',
      flexGrow: 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: `calc(100% - ${drawerWidth}px)`,
      height: '100%',
      marginRight: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
  };
});


const QuestFTHView = ({
  toolbox, canvas, sidebar, onFlipped,
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
        <FlipToHack
          flipped={flipped}
          toolbox={toolbox}
          canvas={canvas}
        />
        <IconButton
          color="secondary"
          aria-label="open dialogue"
          edge="start"
          onClick={toggleOpen}
          className={clsx(classes.toggleButton, classes.sidebarToggleButton)}
        >
          {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>

        <IconButton
          color="secondary"
          aria-label="open toolbox"
          edge="end"
          onClick={toggleFlip}
          className={clsx(classes.toggleButton, classes.toolboxToggleButton)}
        >
          {flipped ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>

      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {sidebar}
      </Drawer>
    </div>
  );
};

QuestFTHView.propTypes = {
  toolbox: PropTypes.element.isRequired,
  canvas: PropTypes.element.isRequired,
  sidebar: PropTypes.element.isRequired,
  onFlipped: PropTypes.func,
};

QuestFTHView.defaultProps = {
  onFlipped: null,
};

export default QuestFTHView;
