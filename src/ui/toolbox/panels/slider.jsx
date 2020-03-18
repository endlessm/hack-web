import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import {
  Grid,
  Slider,
} from '@material-ui/core';

import {
  Remove,
  Add,
} from '@material-ui/icons';

import { actions } from '../../../store';

const SliderPanel = ({
  icon,
  min,
  max,
  param,
}) => {
  const params = useSelector((state) => state.hackableApp);
  const dispatch = useDispatch();

  if (typeof params[param] === 'undefined') {
    return <></>;
  }

  let realIcon = icon;
  if (icon instanceof Function) {
    realIcon = icon(params);
  }

  return (
    <Grid container spacing={2}>
      <Grid item>
        { realIcon }
      </Grid>
      <Grid item>
        <Remove />
      </Grid>
      <Grid item xs>
        <Slider
          min={min}
          max={max}
          value={params[param]}
          onChange={(ev, val) => dispatch(actions.hackableAppSetParam([param], val))}
          valueLabelDisplay="on"
        />
      </Grid>
      <Grid item>
        <Add />
      </Grid>
    </Grid>
  );
};
SliderPanel.propTypes = {
  icon: PropTypes.node.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  param: PropTypes.string.isRequired,
};

export default SliderPanel;
