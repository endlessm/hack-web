import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './app';
import theme from './theme';
import Demo from './demo';
import Layout from './layout';
// import Layout from './layoutFTH';

// function Main() {
//     return (<ThemeProvider theme={theme}>
//             <CssBaseline />
//             <App />
//             </ThemeProvider>
//            );
// }

// ReactDOM.render(<Main />, document.querySelector('#root'));
// ReactDOM.render(<Demo />, document.querySelector('#root'));
ReactDOM.render(<Layout />, document.querySelector('#root'));
