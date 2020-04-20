import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Divider,
  IconButton,
  SvgIcon,
  makeStyles,
  withStyles,
} from '@material-ui/core';

const useStyles = makeStyles(({ mixins, spacing, palette }) => ({
  offset: {
    ...mixins.toolbar,
    marginTop: spacing(2),
  },
  offsetExpanded: {
    height: '100%',
    borderBottom: `${spacing(1)}px solid ${palette.primary.main}`,
  },
  dialogue: {
    height: '100%',
    backgroundColor: palette.background.default,
    overflowY: 'scroll',
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const SidePanel = ({ content, buttons, expanded }) => {
  const classes = useStyles();

  return (
    <>
      <div className={clsx(classes.offset, expanded && classes.offsetExpanded)} />
      <Divider />
      <Box className={classes.dialogue} px={1} py={2}>
        {content}
      </Box>
      <Divider />
      <Box
        m={1}
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-end"
      >
        {buttons}
      </Box>
    </>
  );
};


SidePanel.propTypes = {
  content: PropTypes.element,
  buttons: PropTypes.element,
  expanded: PropTypes.bool,
};

SidePanel.defaultProps = {
  content: null,
  buttons: null,
  expanded: false,
};

const ChoiceButton = withStyles(({ custom, palette, spacing }) => ({
  root: {
    color: palette.common.white,
    background: `linear-gradient(to right, ${palette.common.hackGreen}, ${palette.common.hackGreenGradient})`,
    margin: spacing(0.5),
    borderRadius: spacing(3),
    whiteSpace: 'nowrap',
  },
  label: {
    textTransform: 'none',
    textShadow: custom.hackButtonTextShadow,
  },
}))(Button);

const ChoiceIconButton = withStyles(({
  palette, shadows, spacing, transitions,
}) => ({
  root: {
    boxShadow: shadows[2],
    transition: `box-shadow ${transitions.duration.short}ms ${transitions.easing.easeInOut} 0ms`,
    '&:hover': {
      boxShadow: shadows[4],
    },
    color: palette.common.white,
    background: `linear-gradient(to right, ${palette.common.hackGreen}, ${palette.common.hackGreenGradient})`,
    margin: spacing(0.5),
    borderRadius: spacing(3),
    whiteSpace: 'nowrap',
  },
}))(IconButton);

const ChoiceSvgIcon = withStyles(({ custom }) => ({
  root: {
    filter: `drop-shadow(${custom.hackButtonTextShadow})`,
  },
}))(SvgIcon);

export {
  SidePanel as default, ChoiceButton, ChoiceIconButton, ChoiceSvgIcon,
};
