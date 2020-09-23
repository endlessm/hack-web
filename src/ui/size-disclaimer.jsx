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
import { useTranslation } from 'react-i18next';

import {
  Container,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

import ImageMainBg from './background.png';

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    padding: spacing(4),
    backgroundImage: `url('${ImageMainBg}')`,
    height: '100vh',
  },
  glitching: {
    width: '144px',
    height: '160px',
    margin: '0 auto',
    animationName: '$glitch',
    animationDuration: '1.3s',
    animationTimingFunction: 'steps(40, end)',
    animationIterationCount: 'infinite',
    background: 'transparent url("assets/avatars/glitching.png") no-repeat',
    backgroundPosition: 'left',
    backgroundSize: 'cover',
  },

  '@keyframes glitch': {
    from: {
      backgroundPosition: 'left',
    },
    to: {
      backgroundPosition: 'right',
    },
  },
}));

const SizeDisclaimer = ({ min }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();
  const minWidth = theme.breakpoints.values[min];
  const { width, height } = window.screen;
  const pixelRatio = window.devicePixelRatio;
  const [deviceWidth, deviceHeight] = [width * pixelRatio, height * pixelRatio];
  const text = t('Sorry, we currently only support devices with a screen at least {{minWidth}} pixels wide.', { minWidth: minWidth * pixelRatio });
  const deviceText = t('Your device\'s screen is {{width}} × {{height}}.', { width: deviceWidth, height: deviceHeight });
  const smallScreen = t('To enjoy our content, please use a desktop or laptop computer, a tablet, or a phone with a larger screen.');
  const rotateScreen = t('To enjoy our content, please rotate your device.');

  const shouldRotate = height >= minWidth;

  return (
    <Container className={classes.root}>
      <div className={classes.glitching} />
      <Typography align="center">
        {text}
        &nbsp;
        {deviceText}
        &nbsp;
        { shouldRotate ? rotateScreen : smallScreen }
      </Typography>
    </Container>
  );
};

SizeDisclaimer.propTypes = {
  min: PropTypes.string,
};

SizeDisclaimer.defaultProps = {
  min: 'md',
};

const MinSize = ({ children, min }) => {
  const matches = useMediaQuery(({ breakpoints }) => breakpoints.up(min));

  if (matches) {
    return children;
  }

  return <SizeDisclaimer min={min} />;
};

MinSize.propTypes = {
  min: PropTypes.string,
  children: PropTypes.node.isRequired,
};

MinSize.defaultProps = {
  min: 'md',
};


export default MinSize;
