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
