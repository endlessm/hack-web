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

import { createMuiTheme } from '@material-ui/core';
import { colors } from '../theme';

const toolboxColors = {
  paperBackground: 'rgba(0, 0, 0, 0.5)',
  popoverBackground: '#000',
  tabBackground: '#4a3a37ee',
  tabColor: '#fff',
  ...colors,
};

const theme = createMuiTheme({
  overrides: {
    MuiTab: {
      root: {
        // we can use here min-width or !important
        '@media (min-width: 600px)': {
          minWidth: 72,
        },
        '&:disabled': {
          opacity: 0.2,
        },
      },
    },
    MuiPopover: {
      paper: {
        background: toolboxColors.popoverBackground,
      },
    },
  },
  palette: {
    type: 'dark',
    background: {
      paper: toolboxColors.paperBackground,
    },
    text: {
      primary: toolboxColors.hackGreen,
    },
    primary: {
      main: toolboxColors.hackGreen,
    },
    secondary: {
      main: toolboxColors.hackGreen,
    },
  },
  props: {
  },

  toolbox: {
    colors: toolboxColors,
    backgroundImage: `url('assets/toolbox/background.png'),
                      radial-gradient(at -47% 158%,
                                      rgba(197, 163, 93, 0.81) 0%,
                                      rgba(208, 95, 52, 0.80) 14%,
                                      rgba(32, 69, 108, 0.63) 66%,
                                      #1C3753 100%)`,
  },
});

export default theme;
