import React from 'react';
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

const useStyles = makeStyles(({ transitions }) => ({
  fthButton: {
    // Note, the following sizes are intentionally hardcoded to fit
    // the assets.
    borderRadius: '0 60px 60px 0',
    width: '96px',
    height: '124px',
    boxShadow: 'none',
    transition: transitions.create(['background-image'], {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.short,
    }),
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
}));

const FTHButton = ({ className, flipped, ...props }) => {
  FTHButton.muiName = Fab.muiName;
  const classes = useStyles();

  return (
    <Fab
      color="secondary"
      aria-label="open toolbox"
      edge="end"
      size="medium"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      className={clsx(className, classes.fthButton, {
        [classes.fthButtonFlipped]: flipped,
      })}
    />
  );
};

FTHButton.propTypes = {
  className: PropTypes.string,
  flipped: PropTypes.bool,
};

FTHButton.defaultProps = {
  className: '',
  flipped: false,
};

export default FTHButton;
