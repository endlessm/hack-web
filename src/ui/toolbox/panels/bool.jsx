import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { FormControlLabel, Checkbox } from '@material-ui/core';
import { actions } from '../../../store';

const BoolPanel = ({
  label,
  param,
}) => {
  const params = useSelector((state) => state.game);
  const dispatch = useDispatch();

  if (typeof params[param] === 'undefined') {
    return <></>;
  }

  return (
    <FormControlLabel
      control={(
        <Checkbox
          checked={!params[param]}
          onChange={(ev) => dispatch(actions.gameSetParam([param], !ev.target.checked))}
        />
      )}
      label={label}
    />
  );
};
BoolPanel.propTypes = {
  label: PropTypes.string.isRequired,
  param: PropTypes.string.isRequired,
};

export default BoolPanel;
