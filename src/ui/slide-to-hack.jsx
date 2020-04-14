import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Slide, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  toolbox: {
    width: '50%',
  },
  toolboxWhenFlipped: {
    width: '50%',
  },
  canvas: {
    width: '100%',
  },
  canvasWhenFlipped: {
    width: '50%',
    position: 'absolute',
    top: 0,
    left: '50%',
  },
});

const SlideToHack = ({ flipped, toolbox, canvas }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Slide direction="right" in={flipped} appear={false} mountOnEnter unmountOnExit>
        <Box className={clsx(classes.toolbox, flipped && classes.toolboxWhenFlipped)}>
          {toolbox}
        </Box>
      </Slide>
      <div className={clsx(classes.canvas, flipped && classes.canvasWhenFlipped)}>
        {canvas}
      </div>
    </div>
  );
};

SlideToHack.propTypes = {
  flipped: PropTypes.bool.isRequired,
  toolbox: PropTypes.element.isRequired,
  canvas: PropTypes.element.isRequired,
};

export default SlideToHack;
