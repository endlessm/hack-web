import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
// import Layout from './layout';
// import Layout from './layoutFTH';
import FrameLayout from './Layout/FrameLayout';

function Main() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <FrameLayout />
        </ThemeProvider>
    );
}

export default function renderDOM() {
    ReactDOM.render(<Main />, document.querySelector('#root'));
}

