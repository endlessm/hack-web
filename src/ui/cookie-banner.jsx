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
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
  Slide,
  Typography,
} from '@material-ui/core';

import { actions } from '../store';
import MainButton, { HackButton } from './main-button';

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
}));

const CookieBanner = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { googleAnalyticsEnabled } = useSelector((state) => state.ui);
  const classes = useStyles();

  const [open, setOpen] = useState(true);

  useEffect(() => {
    const cookies = localStorage.getItem('cookies');

    if (cookies === 'analytics' && !googleAnalyticsEnabled) {
      ReactGA.initialize(GATrackingId);
      ReactGA.set({ anonymizeIp: true });
      dispatch(actions.enableGoogleAnalytics());
      setOpen(false);
    } else if (cookies === 'none') {
      setOpen(false);
    }
  }, [dispatch, googleAnalyticsEnabled]);

  const handleClose = () => {
    ReactGA.initialize(GATrackingId);
    ReactGA.set({ anonymizeIp: true });
    dispatch(actions.enableGoogleAnalytics());
    setOpen(false);
    localStorage.setItem('cookies', 'analytics');
  };

  const block = () => {
    setOpen(false);
    localStorage.setItem('cookies', 'none');
  };

  return (
    <Slide in={open} direction="down">
      <Paper className={classes.drawer}>
        <Container fixed margin={1}>
          <Grid
            container
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
            <Grid item xs={4}>
              <Box
                display="flex"
                justifyContent="center"
              >
                <Box mx={1}>
                  <HackButton onClick={block} variant="contained">
                    {t('Deny')}
                  </HackButton>
                </Box>
                <Box mx={1}>
                  <MainButton onClick={handleClose} variant="contained">
                    {t('Allow')}
                  </MainButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </Slide>
  );
};

export default CookieBanner;
