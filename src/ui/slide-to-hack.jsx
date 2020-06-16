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
