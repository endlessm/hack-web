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
import {
  Box,
  Divider,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

import { cardType } from './types';

const defaultImage = '/assets/cards/default-side-panel.png';

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  offset: {
    minHeight: `${spacing(10)}px`,
    flexShrink: 1,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    backgroundImage: ({ card }) => {
      if (!card) {
        return `url('${defaultImage}')`;
      }
      // FIXME add a fallback background:
      return `url('/assets/cards/${card.slug.slice(1)}/side-panel.png')`;
    },
    transition: transitions.create(['height'], {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.short,
    }),
  },
  offsetExpanded: {
    flexGrow: 1,
    borderBottom: `${spacing(1)}px solid ${palette.primary.main}`,
  },
  dialogue: {
    height: '100%',
    backgroundColor: palette.background.default,
    overflowY: 'scroll',
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
  },
  dialogueExpanded: {
    height: 'fit-content',
  },
}));

const SidePanel = ({
  content, buttons, card, expanded,
}) => {
  const classes = useStyles({ card });

  // Make it always unexpanded for the smallest resolutions:
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));
  const isExpanded = isSmall ? false : expanded;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      height="100%"
    >
      <div className={clsx(classes.offset, isExpanded && classes.offsetExpanded)} />
      <Divider />
      <Box className={clsx(classes.dialogue, isExpanded && classes.dialogueExpanded)} px={1} py={2}>
        {content}
      </Box>
      <Divider />
      <Box>
        <Box
          my={1}
          mr={2}
          display="flex"
          flexWrap="wrap"
          justifyContent="flex-end"
        >
          {buttons}
        </Box>
      </Box>
    </Box>
  );
};


SidePanel.propTypes = {
  content: PropTypes.element,
  buttons: PropTypes.element,
  card: cardType,
  expanded: PropTypes.bool,
};

SidePanel.defaultProps = {
  content: null,
  buttons: null,
  card: null,
  expanded: false,
};

export {
  SidePanel as default,
};
