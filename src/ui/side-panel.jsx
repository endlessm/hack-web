import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Box,
  Divider,
} from '@material-ui/core';

const useStyles = makeStyles(({ mixins, spacing, palette }) => ({
  offset: {
    ...mixins.toolbar,
    marginTop: spacing(2),
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

const SidePanel = ({ content, buttons }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.offset} />
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
};

SidePanel.defaultProps = {
  content: null,
  buttons: null,
};


export default SidePanel;
