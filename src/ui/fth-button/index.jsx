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

import React, { useRef, useEffect } from 'react';
import {
  Fab,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import flipFrontNormal from './flip-front-normal.png';
import flipBackNormal from './flip-back-normal.png';
import flipFrontHover from './flip-front-hover.png';
import flipBackHover from './flip-back-hover.png';
import flipFrontDimmed from './flip-front-dimmed.png';
import flipBackDimmed from './flip-back-dimmed.png';

const useStyles = makeStyles(({ custom, transitions }) => ({
  fthButton: {
    // Note, the following sizes are intentionally hardcoded to fit
    // the assets.
    borderRadius: '0 60px 60px 0',
    width: custom.fthButton.width,
    height: custom.fthButton.height,
    boxShadow: 'none',
    transition: transitions.create(['background-image'], {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.short,
    }),
    backgroundPosition: 'right',
    backgroundImage: `url('${flipFrontNormal}')`,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundImage: `url('${flipFrontHover}')`,
      backgroundColor: 'transparent',
    },
    '&.Mui-disabled': {
      backgroundImage: `url('${flipFrontDimmed}')`,
    },
  },
  fthButtonFlipped: {
    backgroundImage: `url('${flipBackNormal}')`,
    '&:hover': {
      backgroundImage: `url('${flipBackHover}')`,
    },
    '&.Mui-disabled': {
      backgroundImage: `url('${flipBackDimmed}')`,
    },
  },
  glow: {
    // Note, the following sizes are intentionally hardcoded to fit
    // the assets.
    width: '0px',
    height: '0px',
    marginTop: custom.fthButton.height / 2,
    animation: '$glow 1s alternate infinite',
  },

  '@keyframes glow': {
    from: {
      boxShadow: '0 0 0 0px rgba(255, 255, 255, 0.4);',
    },
    to: {
      boxShadow: `
        0 0 60px 20px #fff,  /* inner white */
        0 0 100px 50px #f0f, /* middle magenta */
        0 0 140px 70px #0ff; /* outer cyan */
      `,
    },
  },
}));

const SOUNDS = '/assets/sounds';

const FTHButton = ({
  className,
  flipped,
  attracting,
  onClick,
  ...props
}) => {
  FTHButton.muiName = Fab.muiName;
  const classes = useStyles();

  const hoverRef = useRef(null);
  const inverseHoverRef = useRef(null);
  const clickRef = useRef(null);
  const inverseClickRef = useRef(null);

  const playSound = (ref) => {
    if (!ref.current) {
      return;
    }

    const audio = ref.current;
    audio.currentTime = 0;
    audio.play();
  };

  const stopSound = (ref) => {
    if (!ref.current) {
      return;
    }

    const audio = ref.current;
    audio.pause();
    audio.currentTime = 0;
  };

  useEffect(() => {
    stopSound(hoverRef);
    stopSound(inverseHoverRef);
  }, [flipped]);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio src={`${SOUNDS}/MouseEnter_Flip.webm`} preload="auto" ref={hoverRef} type="audio/webm" />
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio src={`${SOUNDS}/MouseEnter_Inverse.webm`} preload="auto" ref={inverseHoverRef} type="audio/webm" />
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio src={`${SOUNDS}/MouseClick_Flip.webm`} preload="auto" ref={clickRef} type="audio/webm" />
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio src={`${SOUNDS}/MouseClick_Invert.webm`} preload="auto" ref={inverseClickRef} type="audio/webm" />

      { attracting && (
        <div className={clsx(className, classes.glow)} />
      )}
      <Fab
        color="secondary"
        aria-label="open toolbox"
        edge="end"
        size="medium"
        onMouseEnter={() => { playSound(flipped ? inverseHoverRef : hoverRef); }}
        onMouseLeave={() => { stopSound(flipped ? inverseHoverRef : hoverRef); }}
        onClick={() => {
          playSound(flipped ? inverseClickRef : clickRef);
          onClick();
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        className={clsx(className, classes.fthButton, {
          [classes.fthButtonFlipped]: flipped,
        })}
      >
        {/* Fab requires one child */}
        <></>
      </Fab>
    </>
  );
};

FTHButton.propTypes = {
  className: PropTypes.string,
  flipped: PropTypes.bool,
  attracting: PropTypes.bool,
  onClick: PropTypes.func,
};

FTHButton.defaultProps = {
  className: '',
  flipped: false,
  attracting: false,
  onClick: null,
};

export default FTHButton;
