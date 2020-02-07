import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const colors = {
    hackGreen: '#37dcb1',
    deepBlue: '#181866',
};

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        common: colors,
        primary: {
            main: colors.deepBlue,
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: colors.deepBlue,
        },
    },
});

export default theme;
