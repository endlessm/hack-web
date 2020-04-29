import { createMuiTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const colors = {
  hackGreen: '#37dcb1',
  hackGreenGradient: '#4a90e2',
  deepBlue: '#181866',
  messageCodeBlock: '#287A8C',
  messageLink: '#3584E4',
};

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
  transitions: {
    duration: {
      complex: 1000,
      triggeredByMouse: 4000,
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
    // Fill 3 of 12 columns in XL screen size:
    drawerWidth: defaultTheme.breakpoints.values.xl * 0.25,
    appBarHeight: defaultTheme.spacing(10),
    cardWidth: defaultTheme.spacing(28),
    cardHeight: defaultTheme.spacing(42),
    cardSpacing: defaultTheme.spacing(8),
  },
});

export { theme as default, colors };
