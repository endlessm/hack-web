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

import { FormControlLabel, Checkbox } from '@material-ui/core';
import { actions } from '../../../store';

const BoolPanel = ({
  label,
  param,
}) => {
  const params = useSelector((state) => state.hackableApp);
  const dispatch = useDispatch();

  if (typeof params[param] === 'undefined') {
    return <></>;
  }

  return (
    <FormControlLabel
      control={(
        <Checkbox
          checked={!params[param]}
          onChange={(ev) => dispatch(actions.hackableAppSetParam([param], !ev.target.checked))}
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
