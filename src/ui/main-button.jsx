import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  withStyles,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';

import { actions } from '../store';
import { cardType } from './types';

const attractStyles = makeStyles(({ custom }) => ({
  glow: {
    position: 'relative',
    '&:before': {
      content: '""',
      width: '50%',
      height: '50%',
      position: 'absolute',
      top: '25%',
      left: '25%',
      animation: '$glow 1s alternate infinite',
      borderRadius: '100%',
    },
  },

  '@keyframes glow': custom.glowAnimation,
}));

const AttractWrapper = (WrappedComponent) => {
  const Wrapper = ({ attracting, ...props }) => {
    const classes = attractStyles();

    return (
      <div className={clsx({ [classes.glow]: attracting })}>
        <WrappedComponent
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        />
      </div>
    );
  };

  Wrapper.propTypes = {
    attracting: PropTypes.bool,
  };

  Wrapper.defaultProps = {
    attracting: false,
  };

  return memo(Wrapper);
};

const MainButton = AttractWrapper(withStyles(({ palette, spacing }) => ({
  root: {
    color: palette.primary.contrastText,
    background: palette.primary.main,
    borderRadius: spacing(3),
    whiteSpace: 'nowrap',
    '&:hover': {
      color: palette.secondary.contrastText,
      backgroundColor: palette.secondary.main,
    },
  },
  label: {
    textTransform: 'none',
  },
}))(Button));

const MainIconButton = AttractWrapper(withStyles(({
  palette, shadows, spacing, transitions,
}) => ({
  root: {
    boxShadow: shadows[2],
    transition: transitions.create(['box-shadow', 'color', 'background'], {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.short,
    }),
    color: palette.primary.contrastText,
    background: palette.primary.main,
    borderRadius: spacing(3),
    whiteSpace: 'nowrap',
    '&:hover': {
      boxShadow: shadows[4],
      color: palette.secondary.contrastText,
      backgroundColor: palette.secondary.main,
    },
  },
}))(IconButton));

const GoButton = AttractWrapper(({ card }) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  // If card has href, it is an external link:
  if (card.href) {
    return (
      <MainButton
        variant="contained"
        size={isSmall ? 'small' : 'large'}
        href={card.href}
        target="_blank"
      >
        {t('Let\'s go')}
      </MainButton>
    );
  }

  const onClick = () => {
    dispatch(actions.deselectCards());
  };

  // Otherwise, it must be a quest:
  return (
    <MainButton
      variant="contained"
      size={isSmall ? 'small' : 'large'}
      component={RouterLink}
      to={card.slug}
      onClick={onClick}
    >
      {t('Let\'s go')}
    </MainButton>
  );
});

GoButton.propTypes = {
  card: cardType.isRequired,
};

export {
  MainButton, MainIconButton, GoButton,
};
