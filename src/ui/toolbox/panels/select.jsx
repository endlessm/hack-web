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
import { actions } from '../../../store';

import Select from '../select';

const SelectPanel = ({
  title,
  items,
  param,
}) => {
  const params = useSelector((state) => state.hackableApp);
  const dispatch = useDispatch();

  if (typeof params[param] === 'undefined') {
    return <></>;
  }

  return (
    <Select
      title={title}
      items={items}
      value={params[param].toString()}
      onChange={(ev) => dispatch(actions.hackableAppSetParam([param], ev.target.value))}
    />
  );
};
SelectPanel.propTypes = {
  title: PropTypes.string.isRequired,
  param: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
};

export default SelectPanel;
