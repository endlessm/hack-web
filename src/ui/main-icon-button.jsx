import {
  IconButton,
  withStyles,
} from '@material-ui/core';

import AttractWrapper from './attract-wrapper';

const MainIconButton = AttractWrapper(withStyles(({
  palette, shadows, spacing, transitions,
}) => ({
  root: {
    boxShadow: shadows[2],
    transition: transitions.create(['box-shadow', 'color', 'background'], {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.short,
    }),
    color: palette.primary.contrastText,
    background: palette.primary.main,
    borderRadius: spacing(3),
    whiteSpace: 'nowrap',
    '&:hover': {
      boxShadow: shadows[4],
      color: palette.secondary.contrastText,
      backgroundColor: palette.secondary.main,
    },
  },
}))(IconButton));

export default MainIconButton;
