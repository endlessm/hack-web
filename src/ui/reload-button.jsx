import React from 'react';
import PropTypes from 'prop-types';
import { Fab, Tooltip } from '@material-ui/core';
import { SettingsBackupRestore } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

const ReloadButton = ({ onClick, color }) => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t('Reset code')}>
      <Fab
        color={color}
        aria-label={t('Reset code')}
        edge="end"
        size="medium"
        onClick={onClick}
      >
        <SettingsBackupRestore />
      </Fab>
    </Tooltip>
  );
};

ReloadButton.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
};

ReloadButton.defaultProps = {
  onClick: null,
  color: 'secondary',
};

export default ReloadButton;
