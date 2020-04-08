import React from 'react';
import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  flipBox: {
    zIndex: 0,
    perspective: `${theme.custom.flipToHackPerspective}px`,
    width: '100%',
    height: '100%',
  },
  flipBoxInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: `transform ${theme.transitions.duration.complex}ms`,
    transitionTimingFunction: 'linear',
    transformStyle: 'preserve-3d',
  },
  flipBoxInnerWhenFlipped: {
    transform: 'rotateY(180deg)',
  },
  toolbox: {
    background: fade(theme.palette.secondary.main, 0.4),
    transform: 'rotateY(180deg)',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    pointerEvents: 'none',
    transition: `opacity ${theme.transitions.duration.complex / 2}ms`,
    transitionTimingFunction: 'steps(1, end)',
  },
  toolboxWhenFlipped: {
    opacity: 1,
    pointerEvents: 'auto',
  },
  canvas: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  canvasWhenFlipped: {
    pointerEvents: 'none',
  },
}));


const FlipToHack = ({ flipped, toolbox, canvas }) => {
  const classes = useStyles();

  return (
    <div className={classes.flipBox}>
      <div className={clsx(classes.flipBoxInner, flipped && classes.flipBoxInnerWhenFlipped)}>
        <div className={clsx(classes.canvas, flipped && classes.canvasWhenFlipped)}>
          {canvas}
        </div>
        <div className={clsx(classes.toolbox, flipped && classes.toolboxWhenFlipped)}>
          {toolbox}
        </div>
      </div>
    </div>
  );
};

FlipToHack.propTypes = {
  flipped: PropTypes.bool.isRequired,
  toolbox: PropTypes.element.isRequired,
  canvas: PropTypes.element.isRequired,
};

export default FlipToHack;
