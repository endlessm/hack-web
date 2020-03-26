import { createMuiTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const colors = {
  hackGreen: '#37dcb1',
  hackGreenGradient: '#4a90e2',
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
    chatMessageMaxWidth: '90%',
    hackButtonTextShadow: '0px 2px 2px rgba(0,0,0,0.2)',
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

const sectionTheme = createMuiTheme(theme, {
  overrides: {
    MuiExpansionPanelSummary: {
      root: {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  typography: {
    subtitle1: {
      fontSize: '2rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '1.4rem',
      fontWeight: 300,
    },
  },
  shape: {
    borderRadius: 'unset',
  },
});

export {
  theme as default,
  sectionTheme,
  colors,
};
