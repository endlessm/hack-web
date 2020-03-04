import React from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Drawer,
  Fab,
  Grid,
  makeStyles,
  Paper,
  withStyles,
} from '@material-ui/core';
import {
  ChevronLeft,
  ChevronRight,
} from '@material-ui/icons';

import PropTypes from 'prop-types';

import FlipToHack from './flip-to-hack';

import HackIcon from './hack-icon.svg';

const useStyles = makeStyles((theme) => {
  // console.log(theme); // FIXME

  // Fill 3 of 12 columns in XL screen size:
  const drawerWidth = theme.breakpoints.values.xl * 0.25;

  return {
    root: {
      display: 'flex',
      height: '100%',
    },
    dialogueToggleButton: {
      position: 'absolute',
      top: theme.spacing(2),
      right: theme.spacing(2),
      zIndex: theme.zIndex.drawer + 1,
    },
    toolboxToggleButton: {
      position: 'absolute',
      borderRadius: '0 50% 50% 0',
      top: `calc(50% - ${theme.spacing(3)}px)`,
    },
    drawer: {
      // display: 'none', // FIXME
      width: drawerWidth,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(10) + 1,
      },
    },
    sidebarWrapper: {
      whiteSpace: 'normal',
    },
    toolbar: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      padding: theme.spacing(1, 0),
    },
    content: {
      overflow: 'hidden',
      position: 'relative',
      flexGrow: 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: `calc(100% - ${drawerWidth}px)`,
      height: '100%',
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    stickyBubble: {
    },
    stickyBubbleClosed: {
      display: 'none',
    },
  };
});


const BubbleButton = withStyles({
  textTransform: 'none',
  root: {
    textTransform: 'none',
  },
})((props) => {
  const { children, ...other } = props;

  return (
    <Button
      variant="contained"
      color="primary"
      {...other}
    >
      {children || 'my button'}
    </Button>
  );
});

BubbleButton.propTypes = {
  children: PropTypes.node,
};


const QuestFTHView = ({
  toolbox, canvas, sidebar, onFlipped,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [flipped, setFlipped] = React.useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const toggleFlip = () => {
    setFlipped(!flipped);
    if (onFlipped) {
      onFlipped(!flipped);
    }
  };

  const testText = 'Welcome to Hack Web.';

  return (
    <div className={classes.root}>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <FlipToHack
          flipped={flipped}
          toolbox={toolbox}
          canvas={canvas}
        />
        <Fab
          color="secondary"
          aria-label="open toolbox"
          edge="end"
          size="medium"
          onClick={toggleFlip}
          className={clsx(classes.toolboxToggleButton)}
        >
          {flipped ? <ChevronLeft /> : <ChevronRight />}
        </Fab>
      </main>
      <Fab
        color="primary"
        aria-label="open / close dialogue"
        size="medium"
        onClick={toggleOpen}
        className={clsx(classes.dialogueToggleButton)}
      >
        <img alt="Hack" src={HackIcon} />
      </Fab>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        anchor="right"
        open={open}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="stretch"
          height="100%"
          className={classes.sidebarWrapper}
          bgcolor="secondary.main"
        >
          <Box m={1} pb={2}>
            <Paper
              elevation={6}
            >
              <Box
                display="flex"
              >
                <Box
                  mr={7}
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  className={clsx(classes.stickyBubble, {
                    [classes.stickyBubbleClosed]: !open,
                  })}
                >
                  <Box
                    mt={2}
                    ml={2}
                    mb={1}
                    height="100%"
                  >
                    {testText}
                  </Box>
                  <Box
                    mb={-2}
                  >
                    <Grid
                      container
                      justify="flex-end"
                      spacing={1}
                    >
                      <Grid item>
                        <BubbleButton>Hint</BubbleButton>
                      </Grid>
                      <Grid item>
                        <BubbleButton>Hint</BubbleButton>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Box
                  flexShrink={1}
                  pt={10}
                  pr={1}
                />
              </Box>
            </Paper>
          </Box>
          {open ? sidebar : <Box />}
        </Box>
      </Drawer>
    </div>
  );
};

QuestFTHView.propTypes = {
  toolbox: PropTypes.element.isRequired,
  canvas: PropTypes.element.isRequired,
  sidebar: PropTypes.element.isRequired,
  onFlipped: PropTypes.func,
};

QuestFTHView.defaultProps = {
  onFlipped: null,
};

export default QuestFTHView;
