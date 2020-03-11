import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { TextField } from '@material-ui/core';

const NumberPanel = ({
  label,
  param,
  inputProps,
  onChange,
}) => {
  const params = useSelector((state) => state.game);

  if (typeof params[param] === 'undefined') {
    return <></>;
  }

  return (
    <TextField
      label={label}
      type="number"
      inputProps={inputProps}
      value={params[param]}
      onChange={(ev) => onChange({
        [param]: ev.target.value,
      })}
    />
  );
};
NumberPanel.propTypes = {
  label: PropTypes.string.isRequired,
  param: PropTypes.string.isRequired,
  inputProps: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
  }),
  onChange: PropTypes.func.isRequired,
};
NumberPanel.defaultProps = {
  inputProps: {},
};

export default NumberPanel;
