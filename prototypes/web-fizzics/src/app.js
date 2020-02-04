import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from './protip';
import Link from '@material-ui/core/Link';

function Copyright() {
    return (<Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
            Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
            </Typography>
           );
}

export default function App() {
        // <Button onClick={toggleDrawer('right', true)>Open Right</Button>
    //     <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
    //     {sideList('right')}
    // </Drawer>
    return (<Container maxWidth="sm">
            <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
            Hello World!
            </Typography>
            <ProTip />
            <Copyright />
            </Box>
            </Container>
           );
}
