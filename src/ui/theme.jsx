import { createMuiTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const colors = {
  hackGreen: '#37dcb1',
  deepBlue: '#181866',
};

const theme = createMuiTheme({
  transitions: {
    duration: {
      complex: 1000,
    },
  },
  palette: {
    common: colors,
    primary: {
      main: colors.hackGreen,
      // FIXME: the computed contrast for our green is black, but we
      // are setting it to white.
      // contrastText: '#fff',
    },
    secondary: {
      main: colors.deepBlue,
    },
    error: {
      main: red.A400,
    },
    background: {
      // default: colors.deepBlue,
    },
  },
  shape: {
    borderRadius: 16,
  },
  custom: {
    flipToHackPerspective: 1000,
    landingTitleGradientDirection: 270,
    difficultyBar: {
      easy: {
        colors: ['#37DCB1', '#00E718'],
      },
      medium: {
        colors: ['#EFBE2D', '#FF6B00'],
      },
      hard: {
        colors: ['#F92781', '#FF0000'],
      },
    },
  },
});

export default theme;
