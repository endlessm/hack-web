import {
  IconButton,
  withStyles,
} from '@material-ui/core';

import AttractWrapper from './attract-wrapper';

const SecondaryIconButton = AttractWrapper(withStyles(({
  palette, shadows, spacing, transitions,
}) => ({
  root: {
    boxShadow: shadows[2],
    transition: transitions.create(['box-shadow', 'color', 'background'], {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.short,
    }),
    color: palette.secondary.contrastText,
    background: palette.secondary.main,
    borderRadius: spacing(3),
    whiteSpace: 'nowrap',
    '&:hover': {
      boxShadow: shadows[4],
      color: palette.primary.main,
      background: palette.secondary.main,
    },
  },
}))(IconButton));

export default SecondaryIconButton;
