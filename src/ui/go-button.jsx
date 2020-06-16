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
