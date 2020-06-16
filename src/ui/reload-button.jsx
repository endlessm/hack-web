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
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import { SettingsBackupRestore } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import SecondaryIconButton from './secondary-icon-button';

const ReloadButton = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t('Reset code')}>
      <SecondaryIconButton
        aria-label={t('Reset code')}
        edge="end"
        size="medium"
        onClick={onClick}
      >
        <SettingsBackupRestore />
      </SecondaryIconButton>
    </Tooltip>
  );
};

ReloadButton.propTypes = {
  onClick: PropTypes.func,
};

ReloadButton.defaultProps = {
  onClick: null,
};

export default ReloadButton;
