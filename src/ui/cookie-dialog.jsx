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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';

import { actions } from '../store';

const GATrackingId = 'UA-160877903-1';

const CookieDialog = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { gaInit } = useSelector((state) => state.ui);

  const [open, setOpen] = useState(true);

  useEffect(() => {
    const cookies = document.cookie.split('; ');
    const accepted = cookies.includes('cookies=accepted');
    if (accepted && !gaInit) {
      ReactGA.initialize(GATrackingId);
      ReactGA.set({ anonymizeIp: true });
      dispatch(actions.gaInitialized());
      setOpen(false);
    }
  }, [dispatch, gaInit]);

  const handleClose = () => {
    ReactGA.initialize(GATrackingId);
    ReactGA.set({ anonymizeIp: true });
    dispatch(actions.gaInitialized());
    setOpen(false);

    // Storing in a cookie that the user has accepted the cookies. This way we
    // don't show this dialog more times.
    document.cookie = 'cookies=accepted';
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableBackdropClick
      aria-labelledby="cookie-dialog-title"
      aria-describedby="cookie-dialog-description"
    >
      <DialogTitle id="cookie-dialog-title">{t('This website uses cookies')}</DialogTitle>
      <DialogContent>
        <DialogContentText id="cookie-dialog-description">
          {t('To help improve our service and provide the best experience we work with Google Analytics. They do not share you data. For more information please review the Google Analytics privacy policy here:')}
          <br />
          <a
            href="https://policies.google.com/privacy"
            rel="noreferrer"
            target="_blank"
          >
            https://policies.google.com/privacy
          </a>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          {t('Agree')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CookieDialog;
