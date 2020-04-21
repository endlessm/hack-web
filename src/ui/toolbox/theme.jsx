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
    backgroundImage: `url('/assets/toolbox/background.png'),
                      radial-gradient(at -47% 158%,
                                      rgba(197, 163, 93, 0.81) 0%,
                                      rgba(208, 95, 52, 0.80) 14%,
                                      rgba(32, 69, 108, 0.63) 66%,
                                      #1C3753 100%)`,
  },
});

export default theme;
