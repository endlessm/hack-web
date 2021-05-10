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
import { Redirect } from 'react-router-dom';
import {
  Container, Typography, Button, TextField, Grid,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useSelector } from 'react-redux';

import { resetPassword, confirmPassword } from '../cognito';

const ResetPassword = () => {
  const [username, setUsername] = useState('');
  const [verification, setVerification] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const auth = useSelector((state) => state.auth);

  const callback = () => {
    if (!username || !password || !verification) {
      setError('You must provide all fields');
      return;
    }
    confirmPassword(username, verification, password)
      .then(() => {
        setConfirmed(true);
      })
      .catch((err) => setError(err.message));
  };

  const forgotCallback = () => {
    if (!username) {
      setError('You must provide your email');
      return;
    }
    resetPassword(username);
    setInfo('Check your email to get the verification code');
    setError('');
    setVerificationSent(true);
  };

  if (confirmed) {
    return <Redirect to="/login" />;
  }

  if (auth.authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Typography variant="h2" component="h1">
        Reset password
      </Typography>

      { error && <Alert severity="error">{ error }</Alert> }
      { info && <Alert severity="info">{ info }</Alert> }

      <form noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField value={username} onChange={(ev) => setUsername(ev.target.value)} label="email" />
          </Grid>
          <Grid item xs={12}>
            <TextField type="text" value={verification} onChange={(ev) => setVerification(ev.target.value)} label="verification code" />
          </Grid>
          <Grid item xs={12}>
            <TextField type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} label="new password" />
          </Grid>
          <Grid item xs={12}>
            { verificationSent && <Button onClick={callback}>Reset password</Button> }
            <Button onClick={forgotCallback}>{ `${verificationSent ? 'Resend' : 'Send'} Verification Code` }</Button>
          </Grid>
        </Grid>
      </form>

    </Container>
  );
};

export default ResetPassword;
