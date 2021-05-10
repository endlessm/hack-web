/* Copyright © 2020 Endless OS LLC
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, { useState } from 'react';
import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import FTHButton from './fth-button';

const useStyles = makeStyles((theme) => ({
  toolboxToggleButton: {
    position: 'fixed',
    top: `calc(50% - ${theme.custom.fthButton.height}px)`,
    left: 0,
    zIndex: theme.zIndex.drawer + 20,
    transition: `opacity ${theme.transitions.duration.complex / 2}ms`,
    transitionTimingFunction: 'steps(1, end)',
  },
  buttonFlipped: {
    opacity: 0,
  },
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
    transform: 'rotateY(-180deg)',
  },
  toolbox: {
    background: fade(theme.palette.secondary.main, 0.4),
    transform: 'rotateY(-180deg)',
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

    '& .ace_tooltip': {
      marginTop: `-${theme.custom.appBarHeight}px`,
    },
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

const FlipToHack = ({
  toolbox, canvas, attractFTH, onFlipped,
}) => {
  const classes = useStyles();
  const [flipped, setFlipped] = useState(false);

  const toggleFlip = () => {
    setFlipped(!flipped);
    if (onFlipped) {
      onFlipped(!flipped);
    }
  };

  return (
    <div className={classes.flipBox}>
      <div className={clsx(classes.flipBoxInner, flipped && classes.flipBoxInnerWhenFlipped)}>
        <div className={clsx(classes.canvas, flipped && classes.canvasWhenFlipped)}>
          {canvas}
          <FTHButton
            onClick={toggleFlip}
            className={clsx(classes.toolboxToggleButton, flipped && classes.buttonFlipped)}
            attracting={attractFTH}
          />
        </div>
        <div className={clsx(classes.toolbox, flipped && classes.toolboxWhenFlipped)}>
          {toolbox}
          <FTHButton
            onClick={toggleFlip}
            className={classes.toolboxToggleButton}
            flipped
            attracting={attractFTH}
          />
        </div>
      </div>
    </div>
  );
};

FlipToHack.propTypes = {
  toolbox: PropTypes.element.isRequired,
  canvas: PropTypes.element.isRequired,
  attractFTH: PropTypes.bool,
  onFlipped: PropTypes.func,
};

FlipToHack.defaultProps = {
  attractFTH: false,
  onFlipped: null,
};

export default FlipToHack;
