import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import {
  ButtonBase,
  makeStyles,
} from '@material-ui/core';

const ASSETS = '/assets/toolbox/lockscreen';

const useStyles = makeStyles(({ zIndex }) => ({
  base: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: zIndex.drawer + 10,
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: 'black',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: ({ screen }) => `url('${ASSETS}/${screen}/no-key.png')`,
  },
  hasKey: {
    backgroundImage: ({ screen }) => `url('${ASSETS}/${screen}/has-key.png')`,
  },
  // This will make the video have the same size than the button background
  // with 'cover' so we don't have black bars.
  video: {
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '100%',
    minHeight: '100%',
    width: 'auto',
    height: 'auto',
  },
}));

const LockScreen = ({
  hasKey, locked, screen, children, onUnlock,
}) => {
  const classes = useStyles({ screen });
  const [showButton, setShowButton] = useState(true);

  const video = useRef(null);

  if (!locked) {
    return children;
  }

  const unlock = () => {
    if (!hasKey) {
      return;
    }
    video.current.play();
  };

  const hideButton = () => {
    setShowButton(false);
  };

  return (
    <div className={classes.root}>
      {children}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={video}
        className={clsx(classes.base, classes.video)}
        preload="auto"
        onPlay={hideButton}
        onEnded={onUnlock}
      >
        <source src={`${ASSETS}/${screen}/open.webm`} type="video/webm" />
      </video>
      { showButton && (
        <ButtonBase
          className={clsx(classes.button, classes.base, { [classes.hasKey]: hasKey })}
          onClick={unlock}
        />
      )}
    </div>
  );
};

LockScreen.propTypes = {
  locked: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  screen: PropTypes.string.isRequired,
  onUnlock: PropTypes.func.isRequired,
  hasKey: PropTypes.bool,
};

LockScreen.defaultProps = {
  hasKey: false,
};

export default LockScreen;
