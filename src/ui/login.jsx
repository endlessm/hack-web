import React, { useState } from 'react';
import {
  Container, Typography, Button, TextField, Grid, AppBar, Toolbar,
} from '@material-ui/core';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';

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
            Hack Web (
            {auth.username}
            )
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
  const auth = useSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  if (auth.authenticated) {
    return <Redirect to="/" />;
  }

  const facebookResponse = (resp) => {
    if (resp.email) {
      dispatch(actions.auth(resp.email));
    }
  };

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

      <FacebookLogin appId="1385025365013417" fields="name,email,picture" callback={facebookResponse} />

    </Container>
  );
};

export default Login;
