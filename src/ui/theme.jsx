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
    cardSizes: {
      downMd: {
        width: defaultTheme.spacing(14),
        height: defaultTheme.spacing(21),
        containerWidth: defaultTheme.spacing(14) * 3 + defaultTheme.spacing(8) * 2,
      },
      onlyLg: {
        width: defaultTheme.spacing(18.5),
        height: defaultTheme.spacing(28),
        containerWidth: defaultTheme.spacing(18.5) * 3 + defaultTheme.spacing(8) * 2,
      },
      onlyXl: {
        width: defaultTheme.spacing(28),
        height: defaultTheme.spacing(42),
        containerWidth: defaultTheme.spacing(28) * 3 + defaultTheme.spacing(8) * 2,
      },
    },
  },
});

export { theme as default, colors };
