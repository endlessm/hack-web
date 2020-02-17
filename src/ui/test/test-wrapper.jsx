import React from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import PropTypes from 'prop-types';

import 'typeface-roboto';

import theme from '../theme';

const TestWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

TestWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default TestWrapper;
