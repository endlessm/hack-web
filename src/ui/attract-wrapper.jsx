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

import React, { memo, forwardRef } from 'react';
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
  const Wrapper = forwardRef(({ attracting, ...props }, ref) => {
    const classes = attractStyles();

    return (
      <div className={clsx({ [classes.glow]: attracting })}>
        <WrappedComponent
          ref={ref}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        />
      </div>
    );
  });

  Wrapper.propTypes = {
    attracting: PropTypes.bool,
  };

  Wrapper.defaultProps = {
    attracting: false,
  };

  return memo(Wrapper);
};

export default AttractWrapper;
