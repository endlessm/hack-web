import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { fade } from '@material-ui/core/styles/colorManipulator';

// import * as dat from 'dat.gui';

import Dialogue from './dialogue';
import useScript from './hooks/useScript';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '100%',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    },
    title: {
        flexGrow: 1,
    },
    dialogueToggleButton: {
        zIndex: 10,
        position: 'absolute',
        background: theme.palette.common.hackGreen,
        borderRadius: '50% 0 0 50%',
        top: `calc(50% - ${theme.spacing(3)}px)`,
        right: 0,
        // right: 0,
        '&:hover': {
            background: theme.palette.common.hackGreen,
        },
    },
    toolboxToggleButton: {
        zIndex: 10,
        position: 'absolute',
        background: theme.palette.common.hackGreen,
        borderRadius: '0 50% 50% 0',
        top: `calc(50% - ${theme.spacing(3)}px)`,
        left: '0',
        '&:hover': {
            background: theme.palette.common.hackGreen,
        },
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    content: {
        overflow: 'hidden',
        position: 'relative',
        flexGrow: 1,
        // padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: `calc(100% - ${drawerWidth}px)`,
        height: '100%',
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
    flipBox: {
        zIndex: 0,
        perspective: '1000px',
        width: '100%',
        height: '100%',
    },
    flipBoxInner: {
        position: 'relative',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        transition: `transform ${theme.transitions.duration.complex}ms`,
        transformStyle: 'preserve-3d',
    },
    flipBoxInnerWhenFlipped: {
        transform: 'rotateY(180deg)',
    },
    toyApp: {
        position: 'absolute',
    },
    toyAppWhenFlipped: {
        pointerEvents: 'none',
    },
    toolbox: {
        background: fade(theme.palette.primary.main, 0.4),
        transform: 'rotateY(180deg)',
        backfaceVisibility: 'hidden',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    toolboxWhenFlipped: {
    }
}));

export default function Layout() {
    useScript('main.js');

    const classes = useStyles();
    const theme = useTheme();
    console.log(theme);
    const [open, setOpen] = React.useState(true);
    const [flipped, setFlipped] = React.useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleFlip = (value) => {
        // FIXME consider cancel flip (reflip)
        const resizeInterval = window.fizzicsGame.scale.resizeInterval;
        console.log('flip start');
        window.fizzicsGame.scale.resizeInterval = theme.transitions.duration.complex * 2;
        setTimeout(function(){
            console.log('flip end');
            window.fizzicsGame.scale.resizeInterval = resizeInterval;
        }, theme.transitions.duration.complex);

        setFlipped(value);
    };

    const handleFlipToggle = () => {
        return handleFlip(!flipped)
    };

    return (
        <div className={classes.root}>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >

                <div className={classes.flipBox}>
                    <div className={clsx(classes.flipBoxInner, flipped && classes.flipBoxInnerWhenFlipped)}>
                        <div id="toolbox-container" className={clsx(classes.toolbox, flipped && classes.toolboxWhenFlipped)}></div>
                        <div id="toy-app-container" className={clsx(classes.toyApp, flipped && classes.toyAppWhenFlipped)}></div>
                    </div>
                </div>

                <IconButton
                    color="primary"
                    aria-label="open dialogue"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.dialogueToggleButton}
                >
                    {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>

                <IconButton
                    color="primary"
                    aria-label="open toolbox"
                    edge="end"
                    onClick={handleFlipToggle}
                    className={classes.toolboxToggleButton}
                >
                    {flipped ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>

            </main>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Dialogue handleFlip={handleFlip} flipped={flipped} />
            </Drawer>
        </div>
    );
}
