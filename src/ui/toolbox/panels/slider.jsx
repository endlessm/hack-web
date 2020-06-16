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
