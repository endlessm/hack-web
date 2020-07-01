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

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactGA from 'react-ga';
import { useTranslation } from 'react-i18next';

import {
  Grid,
  Button,
  Slide,
  Paper,
  Typography,
  makeStyles,
  Container,
} from '@material-ui/core';

import { actions } from '../store';

const GATrackingId = 'UA-160877903-1';

const useStyles = makeStyles(({ zIndex, shadows, spacing }) => ({
  drawer: {
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: zIndex.drawer + 20,
    boxShadow: shadows[12],
    borderRadius: 0,
  },
  text: {
    padding: spacing(1),
  },
  button: {
    textAlign: 'center',
  },
}));

const CookieBanner = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { gaInit } = useSelector((state) => state.ui);
  const classes = useStyles();

  const [open, setOpen] = useState(true);

  useEffect(() => {
    const cookies = document.cookie.split('; ');
    const allCookies = cookies.includes('cookies=all');

    if (allCookies && !gaInit) {
      ReactGA.initialize(GATrackingId);
      ReactGA.set({ anonymizeIp: true });
      dispatch(actions.gaInitialized());
      setOpen(false);
    } else if (cookies.includes('cookies=required')) {
      setOpen(false);
    }
  }, [dispatch, gaInit]);

  const handleClose = () => {
    ReactGA.initialize(GATrackingId);
    ReactGA.set({ anonymizeIp: true });
    dispatch(actions.gaInitialized());
    setOpen(false);
    document.cookie = 'cookies=all';
  };

  const block = () => {
    setOpen(false);
    document.cookie = 'cookies=required';
  };

  return (
    <Slide in={open} direction="down">
      <Paper className={classes.drawer}>
        <Container fixed margin={1}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={8}>
              <Typography variant="body2" gutterBottom className={classes.text}>
                {t('We\'d appreciate it if you let us use Google Analytics cookies on this site. These cookies help us see how this site is used. We collect this information so we can make better decisions about what content we make in the future, and who we make it for. You can read the Google Analytics privacy policy here:')}
                &nbsp;
                <a
                  href="https://policies.google.com/privacy"
                  rel="noreferrer"
                  target="_blank"
                >
                  https://policies.google.com/privacy
                </a>
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.button}>
              <Button onClick={block} variant="contained">
                {t('Deny')}
              </Button>
            </Grid>
            <Grid item xs={2} className={classes.button}>
              <Button onClick={handleClose} variant="contained" color="primary" autoFocus>
                {t('Allow')}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </Slide>
  );
};

export default CookieBanner;
