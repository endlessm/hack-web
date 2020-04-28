import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  IconButton,
  withStyles,
} from '@material-ui/core';

import { cardType } from './types';

const MainButton = withStyles(({ palette, spacing }) => ({
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
}))(Button);

const MainIconButton = withStyles(({
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
}))(IconButton);

const GoButton = ({ card }) => {
  // If card has href, it is an external link:
  if (card.href) {
    return (
      <MainButton
        variant="contained"
        size="large"
        href={card.href}
        target="_blank"
      >
        Let&apos;s go
      </MainButton>
    );
  }

  // Otherwise, it must be a quest:
  return (
    <MainButton
      variant="contained"
      size="large"
      component={RouterLink}
      to={card.slug}
    >
      Let&apos;s go
    </MainButton>
  );
};

GoButton.propTypes = {
  card: cardType.isRequired,
};

export {
  MainButton, MainIconButton, GoButton,
};
