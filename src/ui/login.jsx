import React, { useState } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Fab,
  Paper,
  Typography,
  fade,
  makeStyles,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import clsx from 'clsx';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import HackTopBar from './hack-top-bar';
import { MainButton } from './main-button';
import HackIconClose from './hack-icon-close.svg';
import HackIconCloseWhite from './hack-icon-close-white.svg';

import loginBox from './login-box.jpg';
import LoginBg from './background.png';

import { login, getUser } from '../cognito';

import { actions } from '../store';

export
const RequireAuth = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fakeAuth = process.env.NODE_ENV === 'development' && !(CONFIG.testAuth);

  // No login for production site or fakeAuth
  if (!auth.authenticated && (CONFIG.branch === 'stable' || fakeAuth)) {
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

const useStyles = makeStyles(({ spacing, palette, zIndex }) => {
  const cardImageOverlay = fade(palette.grey[900], 0.8);

  return {
    root: {
      fontFamily: 'Metropolis',
      backgroundImage: `url('${LoginBg}')`,
      backgroundSize: 'cover',
      minHeight: '100%',
      overflow: 'hidden',
    },
    metro: {
      fontFamily: 'Metropolis-SemiBold',
    },
    hackIcon: {
      width: `${spacing(6)}px`,
      height: `${spacing(6)}px`,
    },
    hackIconBox: {
      width: `${spacing(12)}px`,
      height: `${spacing(12)}px`,
    },
    dialogueToggleButton: {
      position: 'absolute',
      top: spacing(1),
      right: spacing(1),
      zIndex: zIndex.drawer + 1,
      opacity: 0.5,
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      borderWidth: 0,
      position: 'relative',
      margin: `${spacing(8)}px auto`,
      width: `${spacing(48)}px`,
      height: `${spacing(72)}px`,
    },
    cardContent: {
      padding: spacing(5),

      '& input': {
        border: `1px solid ${palette.grey[500]}`,
        borderRadius: `${spacing(4)}px`,
        padding: `${spacing(1)}px`,
        paddingLeft: `${spacing(2)}px`,
        width: '100%',
      },
    },
    cardActions: {
      paddingTop: 0,
    },
    backgroundBox: {
      background: `linear-gradient(${cardImageOverlay}, ${cardImageOverlay}), url('${loginBox}')`,
      backgroundSize: 'cover',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
});

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
          disabled
        >
          <HackIconClose className={classes.hackIcon} />
        </Fab>
      </Box>
    </Paper>
  );

  return (
    <div className={classes.root}>
      <HackTopBar title="login to explore" isMainPage />
      {HackIcon}

      <form noValidate autoComplete="off" onSubmit={callback}>

        <Card className={classes.card}>
          <Box className={classes.backgroundBox}>
            <Box textAlign="center" color="common.white">
              <HackIconCloseWhite className={classes.hackIconBox} />
              <Typography variant="h2" component="h1" className={classes.metro}> HACK </Typography>
              <Typography variant="h4" component="h2" className={classes.metro}> WEB </Typography>
            </Box>
          </Box>

          <CardContent className={classes.cardContent}>
            { error && <Alert severity="error">{ error }</Alert> }
            <Box>
              <input value={username} onChange={(ev) => setUsername(ev.target.value)} placeholder="email" />
            </Box>
            <Box mt={2}>
              <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} placeholder="password" />
            </Box>

          </CardContent>

          <CardActions className={clsx(classes.cardContent, classes.cardActions)}>
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
