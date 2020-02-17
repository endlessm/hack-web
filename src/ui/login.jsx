import React, { useState } from 'react';
import {
  Container, Typography, Button, TextField, Grid, AppBar, Toolbar,
} from '@material-ui/core';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { actions } from '../store';

export
const RequireAuth = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!auth.authenticated) {
    return <Redirect to="/login" />;
  }

  const styles = {
    flexGrow: 1,
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={styles}>
            Hack Web
          </Typography>
          <Button color="inherit" onClick={() => dispatch(actions.logout())}>Logout</Button>
        </Toolbar>
      </AppBar>

      {children}
    </div>
  );
};

RequireAuth.propTypes = {
  children: PropTypes.instanceOf(React.Component).isRequired,
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  return (
    <Container>
      <Typography variant="h2" component="h1">
        Login
      </Typography>

      <form noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField value={username} onChange={(ev) => setUsername(ev.target.value)} label="username" />
          </Grid>
          <Grid item xs={12}>
            <TextField type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} label="password" />
          </Grid>
          <Grid item xs={12}>
            <Button component={RouterLink} to="/" onClick={() => dispatch(actions.auth(username))}>Login</Button>
          </Grid>
        </Grid>
      </form>

    </Container>
  );
};

export default Login;
