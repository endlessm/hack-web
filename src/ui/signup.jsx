/* Copyright © 2020 Endless OS LLC
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
