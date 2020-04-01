import React from 'react';
import clsx from 'clsx';
import {
  Box,
  Divider,
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

import FlipToHack from './flip-to-hack';

import HackIcon from './hack-icon.svg';

const useStyles = makeStyles((theme) => {
  // Fill 3 of 12 columns in XL screen size:
  const drawerWidth = theme.breakpoints.values.xl * 0.25;

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
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: theme.spacing(10) - drawerWidth,
      height: '100%',
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
    hackFabRoot: {
      boxShadow: 'none',
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
          <FlipToHack
            flipped={flipped}
            toolbox={toolbox}
            canvas={canvas}
          />
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
            <HackIcon />
          </Fab>
        </Box>
        {controls && <Divider />}
        {controls}
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
};

QuestFTHView.defaultProps = {
  onFlipped: null,
  toolbox: null,
  controls: null,
};

export default QuestFTHView;
