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
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import {
  AppBar,
  Box,
  Button,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';

import {
  ExpandMore,
  Home,
  AccountCircle,
  Language,
} from '@material-ui/icons';

import MainIconButton from './main-icon-button';
import { actions, initializeDefaultData } from '../store';

const useStyles = makeStyles(({
  breakpoints, custom, palette, spacing, transitions, mixins,
}) => ({
  appbar: {
    background: ({ isMainPage }) => {
      if (isMainPage) {
        return palette.primary.main;
      }
      const d = spacing(10);
      return `linear-gradient(to right, ${palette.primary.main} ${d}px, ${palette.background.paper} ${d}px)`;
    },
    left: 0,
    transition: transitions.create(['width'], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen,
    }),
  },
  homeButton: {
    boxShadow: 'none',
    borderRadius: 0,
    width: spacing(10),
    height: spacing(10),
    marginTop: -spacing(1),
    marginBottom: -spacing(1),
    marginLeft: -spacing(3.5),
    '&:hover': {
      boxShadow: 'none',
    },
  },
  inventoryButton: {
    boxShadow: 'none',
  },
  appbarShift: {
    [breakpoints.down('md')]: {
      width: `calc(100% - ${custom.drawerWidths.downMd}px)`,
    },
    [breakpoints.only('lg')]: {
      width: `calc(100% - ${custom.drawerWidths.onlyLg}px)`,
    },
    [breakpoints.only('xl')]: {
      width: `calc(100% - ${custom.drawerWidths.onlyXl}px)`,
    },
  },
  toolbar: {
    marginTop: spacing(1),
    marginLeft: spacing(0.5),
    marginBottom: spacing(1),
  },
  offset: {
    ...mixins.toolbar,
    marginTop: spacing(2),
  },
  languageButton: {
    textTransform: 'none',
  },
}));

const labelPerLanguageCode = new Map([
  ['en', 'English'],
  ['es', 'Español'],
  ['de', 'Deutsch'],
]);

const LanguageSelector = ({ isMainPage }) => {
  const classes = useStyles({ isMainPage });
  const { t, i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.sidePanelOpen);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language).then(initializeDefaultData);
    dispatch(actions.deselectCards());
    setAnchorEl(null);
  };

  if (CONFIG.branch === 'stable') {
    // FIXME: Temporarily hiding the language selector in
    // the production site.
    return <></>;
  }

  return (
    <Box position="absolute" right={0} mr={!open ? 10 : 1}>
      <Tooltip title={t('Change language')} enterDelay={300}>
        <Button
          color="secondary"
          size="large"
          aria-controls="language-menu"
          aria-haspopup="true"
          className={classes.languageButton}
          onClick={handleClick}
          startIcon={<Language />}
          endIcon={<ExpandMore />}
        >
          {labelPerLanguageCode.get(i18n.language)}
        </Button>
      </Tooltip>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Array.from(labelPerLanguageCode, ([langId, langLabel]) => (
          <MenuItem
            key={langId}
            onClick={() => changeLanguage(langId)}
            selected={i18n.language === langId}
          >
            {langLabel}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

LanguageSelector.propTypes = {
  isMainPage: PropTypes.bool,
};

LanguageSelector.defaultProps = {
  isMainPage: false,
};

const HackTopBar = ({ title, subtitle, isMainPage }) => {
  const classes = useStyles({ isMainPage });

  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.sidePanelOpen);

  // Update the document title to match the current title
  useEffect(() => {
    document.title = `Hack - ${title}`;
  }, [title]);

  return (
    <Box>
      <AppBar
        elevation={0}
        className={clsx(classes.appbar, {
          [classes.appbarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar}>
          {isMainPage ? (
            <>
              <MainIconButton
                className={classes.inventoryButton}
                edge="start"
                aria-label="menu"
                onClick={() => dispatch(actions.inventoryToggle())}
              >
                <AccountCircle />
              </MainIconButton>
              <LanguageSelector isMainPage={isMainPage} />
            </>
          ) : (
            <MainIconButton
              component={RouterLink}
              className={classes.homeButton}
              to="/"
              edge="start"
              color="secondary"
              aria-label="menu"
            >
              <Home />
            </MainIconButton>
          )}

          {isMainPage ? (
            <Box m="auto">
              <Typography variant="h5" color="secondary">
                <strong>{title}</strong>
              </Typography>
            </Box>
          ) : (
            <Box ml={4}>
              <Typography variant="h5" color="secondary">
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="subtitle1" color="textSecondary">
                  {subtitle}
                </Typography>
              )}
            </Box>
          )}

        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </Box>
  );
};

HackTopBar.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  isMainPage: PropTypes.bool,
};

HackTopBar.defaultProps = {
  isMainPage: false,
  subtitle: null,
};

export default HackTopBar;
