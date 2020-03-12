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

  return (
    <TextField
      label={label}
      type="number"
      inputProps={inputProps}
      value={params[param]}
      onChange={(ev) => dispatch(actions.gameSetParam([param], ev.target.value))}
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
};
NumberPanel.defaultProps = {
  inputProps: {},
};

export default NumberPanel;
