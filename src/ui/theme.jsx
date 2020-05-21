import { createMuiTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

import {
  metropolis,
  metropolisBold,
  metropolisSemiBold,
} from './fonts';

const colors = {
  hackGreen: '#37dcb1',
  hackGreenGradient: '#4a90e2',
  deepBlue: '#181866',
  messageCodeBlock: '#287A8C',
  messageLink: '#3584E4',
};

const { spacing, breakpoints } = createMuiTheme();

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Metropolis, Roboto, Arial',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [
          metropolis,
          metropolisSemiBold,
          metropolisBold,
        ],
      },
    },
  },
  transitions: {
    duration: {
      complex: 1000,
      triggeredByMouse: 4000,
      bubbleAnimation: 1000,
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
    borderRadius: 14,
  },
  custom: {
    fthButton: {
      width: 66,
      height: 124,
    },
    flipToHackPerspective: 1000,
    landingTitleGradientDirection: 270,
    chatMessageMaxWidth: '90%',
    chatMessageMaxWidths: {
      downMd: '100%',
      onlyLg: '95%',
      onlyXl: '90%',
    },
    chatMessageMinWidths: {
      downMd: '50%',
      onlyLg: '47%',
      onlyXl: '45%',
    },
    // Fill 3 of 12 columns in XL screen size:
    drawerWidth: breakpoints.values.xl * 0.25,
    drawerWidths: {
      downMd: breakpoints.values.md * 0.25,
      onlyLg: breakpoints.values.lg * 0.25,
      onlyXl: breakpoints.values.xl * 0.25,
    },
    appBarHeight: spacing(10),
    cardSizes: {
      downMd: {
        // Size is about 1/2 of the XL one:
        width: spacing(14),
        height: spacing(18),
        containerWidth: spacing(14) * 3 + spacing(16),
      },
      onlyLg: {
        // Size is about 2/3 of the XL one:
        width: spacing(18.5),
        height: spacing(28),
        containerWidth: spacing(18.5) * 3 + spacing(16),
      },
      onlyXl: {
        width: spacing(28),
        height: spacing(42),
        containerWidth: spacing(28) * 3 + spacing(16),
      },
    },
  },
});

export { theme as default, colors };
