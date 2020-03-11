import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { FormControlLabel } from '@material-ui/core';
import { GreenCheckbox } from '../checkbox';

const BoolPanel = ({
  label,
  param,
  onChange,
}) => {
  const params = useSelector((state) => state.game);

  if (typeof params[param] === 'undefined') {
    return <></>;
  }

  return (
    <FormControlLabel
      control={(
        <GreenCheckbox
          checked={!params[param]}
          onChange={(ev) => onChange({ [param]: !ev.target.checked })}
        />
      )}
      label={label}
    />
  );
};
BoolPanel.propTypes = {
  label: PropTypes.string.isRequired,
  param: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BoolPanel;
