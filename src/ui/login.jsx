import React, { useState } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Fab,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import HackTopBar from './hack-top-bar';
import { MainButton } from './main-button';
import HackIconClose from './hack-icon-close.svg';
import HackIconCloseWhite from './hack-icon-close-white.svg';

import loginBox from './login-box.jpg';
import LoginBg from './login-background.png';

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

// FIXME: Replace em, px and direct units with theme.spacing
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiToolbar-root .MuiTypography-root': {
      margin: '0 auto',
      fontWeight: 'bold',
    },
    backgroundImage: `url('${LoginBg}')`,
    backgroundSize: 'cover',
    minHeight: '100%',
  },
  hackIcon: {
    width: `${theme.spacing(6)}px`,
    height: `${theme.spacing(6)}px`,
  },
  hackIconBox: {
    width: `${theme.spacing(12)}px`,
    height: `${theme.spacing(12)}px`,
  },
  dialogueToggleButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: theme.zIndex.drawer + 1,
    opacity: 0.5,
  },
  hackFabRoot: {
    boxShadow: 'none',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 0,
    position: 'relative',
    margin: '4em auto',
    borderRadius: '2em',
    width: '26em',
    height: '38em',
  },
  cardContent: {
    padding: 20,
    paddingTop: 10,

    '& input': {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: '2em',
      padding: '1ex',
      paddingLeft: '1em',
      width: '100%',
    },
  },
  backgroundBox: {
    background: `linear-gradient(rgba(10, 10, 20, 0.8), rgba(10, 10, 20, 0.8)), url('${loginBox}')`,
    backgroundSize: 'cover',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const classes = useStyles();

  const callback = (ev) => {
    ev.preventDefault();
    login(username, password)
      .then(() => {
        dispatch(actions.auth(username));
      })
      .catch((err) => {
        setError(err.message);
      });

    return false;
  };

  if (auth.authenticated) {
    return <Redirect to="/" />;
  }

  const HackIcon = (
    <Paper elevation={6} className={classes.dialogueToggleButton}>
      <Box m={1}>
        <Fab
          color="primary"
          aria-label="open / close dialogue"
          size="medium"
          classes={{ root: classes.hackFabRoot }}
        >
          <HackIconClose className={classes.hackIcon} />
        </Fab>
      </Box>
    </Paper>
  );

  return (
    <div className={classes.root}>
      <HackTopBar title="login to explore" hideHomeIcon />
      {HackIcon}

      <form noValidate autoComplete="off" onSubmit={callback}>

        <Card className={classes.card}>
          <Box className={classes.backgroundBox}>
            <Box textAlign="center" color="common.white">
              <HackIconCloseWhite className={classes.hackIconBox} />
              <Typography variant="h2" component="h1"> HACK </Typography>
              <Typography variant="h4" component="h2"> WEB </Typography>
            </Box>
          </Box>

          <CardContent className={classes.cardContent}>
            { error && <Alert severity="error">{ error }</Alert> }
            <Box mt={1}>
              <input value={username} onChange={(ev) => setUsername(ev.target.value)} placeholder="email" />
            </Box>
            <Box mt={2}>
              <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} placeholder="password" />
            </Box>

          </CardContent>

          <CardActions className={classes.cardContent}>
            <Box ml="auto">
              <MainButton
                variant="contained"
                size="large"
                type="submit"
                onClick={callback}
              >
                LOGIN
              </MainButton>
            </Box>
          </CardActions>
        </Card>

      </form>
    </div>
  );
};

export default Login;
