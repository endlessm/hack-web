import React, { useState } from 'react';
import {
  Container, Typography, Button, TextField, Grid,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { login, getUser } from '../cognito';

import { actions } from '../store';

export
const RequireAuth = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fakeAuth = process.env.NODE_ENV === 'development' && !(CONFIG.testAuth);

  if (!auth.authenticated && fakeAuth) {
    dispatch(actions.auth('test user'));
  }

  const user = getUser();
  if (!auth.authenticated) {
    if (user) {
      dispatch(actions.auth(user.username));
    } else {
      return <Redirect to="/login" />;
    }
  }

  return children;
};

RequireAuth.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const callback = () => {
    login(username, password)
      .then(() => {
        dispatch(actions.auth(username));
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  if (auth.authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Typography variant="h2" component="h1">
        Login
      </Typography>

      { error && <Alert severity="error">{ error }</Alert> }

      <form noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField value={username} onChange={(ev) => setUsername(ev.target.value)} label="email" />
          </Grid>
          <Grid item xs={12}>
            <TextField type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} label="password" />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={callback}>Login</Button>
          </Grid>
        </Grid>
      </form>

      <Button component={RouterLink} to="/signup">Sign up</Button>
      <Button component={RouterLink} to="/reset-password">Forgot password</Button>

    </Container>
  );
};

export default Login;
