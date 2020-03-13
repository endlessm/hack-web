import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { TextField } from '@material-ui/core';

import { actions } from '../../../store';

const NumberPanel = ({
  label,
  param,
  inputProps,
}) => {
  const params = useSelector((state) => state.game);
  const dispatch = useDispatch();

  if (typeof params[param] === 'undefined') {
    return <></>;
  }

  const limits = { ...inputProps };
  // String limits are getted from params
  if (typeof limits.min === 'string') {
    limits.min = params[limits.min];
  }
  if (typeof limits.max === 'string') {
    limits.max = params[limits.max];
  }
  if (typeof limits.step === 'string') {
    limits.step = params[limits.step];
  }

  return (
    <TextField
      label={label}
      type="number"
      inputProps={limits}
      value={params[param]}
      onChange={(ev) => dispatch(actions.gameSetParam([param], ev.target.value))}
    />
  );
};
NumberPanel.propTypes = {
  label: PropTypes.string.isRequired,
  param: PropTypes.string.isRequired,
  inputProps: PropTypes.shape({
    min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
};
NumberPanel.defaultProps = {
  inputProps: {},
};

export default NumberPanel;
