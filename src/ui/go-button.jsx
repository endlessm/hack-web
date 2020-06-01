import React from 'react';

import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

import { actions } from '../store';
import { cardType } from './types';

import MainButton from './main-button';
import AttractWrapper from './attract-wrapper';

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

export default GoButton;
