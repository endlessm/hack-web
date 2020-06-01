import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const attractStyles = makeStyles(({ custom }) => ({
  glow: {
    position: 'relative',
    '&:hover:before': {
      animation: 'none',
    },
    '&:before': {
      content: '""',
      width: '50%',
      height: '50%',
      position: 'absolute',
      top: '25%',
      left: '25%',
      animation: '$glow 1s alternate infinite',
      borderRadius: '100%',
    },
  },

  '@keyframes glow': custom.glowAnimation,
}));

const AttractWrapper = (WrappedComponent) => {
  const Wrapper = ({ attracting, ...props }) => {
    const classes = attractStyles();

    return (
      <div className={clsx({ [classes.glow]: attracting })}>
        <WrappedComponent
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        />
      </div>
    );
  };

  Wrapper.propTypes = {
    attracting: PropTypes.bool,
  };

  Wrapper.defaultProps = {
    attracting: false,
  };

  return memo(Wrapper);
};

export default AttractWrapper;
