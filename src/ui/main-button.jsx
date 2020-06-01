import {
  Button,
  withStyles,
} from '@material-ui/core';

import AttractWrapper from './attract-wrapper';

const MainButton = AttractWrapper(withStyles(({ palette, spacing }) => ({
  root: {
    color: palette.primary.contrastText,
    background: palette.primary.main,
    borderRadius: spacing(3),
    whiteSpace: 'nowrap',
    '&:hover': {
      color: palette.secondary.contrastText,
      backgroundColor: palette.secondary.main,
    },
  },
  label: {
    textTransform: 'none',
  },
}))(Button));

export default MainButton;
