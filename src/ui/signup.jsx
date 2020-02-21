import React, { useState } from 'react';
import {
  Container, Typography, Button, TextField, Grid,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { signup } from '../cognito';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [pwdError, setPwdError] = useState(false);
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState('');

  const auth = useSelector((state) => state.auth);

  const callback = () => {
    if (pwdError) {
      setError('Passwords do not match');
      return;
    }

    signup(username, password)
      .then(() => {
        setRedirect('/login');
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const setpwd1 = (pass) => {
    setPassword(pass);
    setPwdError(pass !== password2);
  };

  const setpwd2 = (pass) => {
    setPassword2(pass);
    setPwdError(password !== pass);
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  if (auth.authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Typography variant="h2" component="h1">
        Sign up
      </Typography>

      { error && <Alert severity="error">{ error }</Alert> }

      <form noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField value={username} onChange={(ev) => setUsername(ev.target.value)} label="email" />
          </Grid>
          <Grid item xs={12}>
            <TextField type="password" value={password} error={pwdError} onChange={(ev) => setpwd1(ev.target.value)} label="password" />
          </Grid>
          <Grid item xs={12}>
            <TextField type="password" value={password2} error={pwdError} onChange={(ev) => setpwd2(ev.target.value)} label="repeat password" />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={callback}>Sign up</Button>
          </Grid>
        </Grid>
      </form>

      <Button component={RouterLink} to="/login">Back to login</Button>

    </Container>
  );
};

export default SignUp;
