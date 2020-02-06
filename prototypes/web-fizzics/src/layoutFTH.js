import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

// import * as dat from 'dat.gui';

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
        // FIXME theme with MUI
        background: 'rgb(77, 204, 174)',
        borderRadius: '50% 0 0 50%',
        top: 'calc(50% - 23px)',
        right: '12px',
        '&:hover': {
            background: 'rgb(77, 204, 174)',
        },
    },
    toolboxToggleButton: {
        zIndex: 10,
        position: 'absolute',
        // FIXME theme with MUI
        background: 'rgb(77, 204, 174)',
        borderRadius: '0 50% 50% 0',
        top: 'calc(50% - 23px)',
        left: '0',
        '&:hover': {
            background: 'rgb(77, 204, 174)',
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
        background: 'rgb(13, 17, 64)',
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
        transition: 'transform 0.8s',
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
        background: 'rgba(13, 17, 64, 0.5)',
        transform: 'rotateY(180deg)',
        backfaceVisibility: 'hidden',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    toolboxWhenFlipped: {
    }
}));

const FizzicControls = function () {
    
}

export default function PersistentDrawerRight() {
    useScript('main.js');
    useScript('app.js');

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [flipped, setFlipped] = React.useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleFlipToggle = () => {
        setFlipped(!flipped);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (<div className={classes.root}>
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
            edge="end"
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
            <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
            ))}
            </List>
            <Divider />
            <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
            ))}
            </List>
            </Drawer>
            </div>
           );
}
