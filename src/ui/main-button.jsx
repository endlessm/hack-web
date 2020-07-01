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

import {
  Button,
  withStyles,
} from '@material-ui/core';

import AttractWrapper from './attract-wrapper';

const HackButton = withStyles(({ spacing }) => ({
  root: {
    borderRadius: spacing(3),
    whiteSpace: 'nowrap',
  },
  label: {
    textTransform: 'none',
  },
}))(Button);

const MainButton = AttractWrapper(withStyles(({ palette }) => ({
  root: {
    color: palette.primary.contrastText,
    background: palette.primary.main,
    '&:hover': {
      color: palette.secondary.contrastText,
      backgroundColor: palette.secondary.main,
    },
  },
}))(HackButton));

export { MainButton as default, HackButton };
