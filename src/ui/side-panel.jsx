import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Divider,
  makeStyles,
} from '@material-ui/core';

import { cardType } from './types';

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

const SidePanel = ({
  content, buttons, card, expanded,
}) => {
  const classes = useStyles({ card });

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
  card: cardType,
  expanded: PropTypes.bool,
};

SidePanel.defaultProps = {
  content: null,
  buttons: null,
  card: null,
  expanded: false,
};

export {
  SidePanel as default,
};
