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

import Checkbox from '../checkbox';

const CheckboxPanel = ({
  title,
  items,
}) => {
  const params = useSelector((state) => state.hackableApp);
  const dispatch = useDispatch();

  if (typeof params[items[0].key] === 'undefined') {
    return <></>;
  }

  const onChange = (changedValues) => {
    Object.keys(changedValues).forEach((p) => {
      dispatch(actions.hackableAppSetParam([p], changedValues[p]));
    });
  };

  const customItems = items.map((item) => ({ ...item, value: params[item.key] }));

  return (
    <Checkbox
      title={title}
      items={customItems}
      onChange={onChange}
    />
  );
};
CheckboxPanel.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.bool,
  })).isRequired,
};

export default CheckboxPanel;
