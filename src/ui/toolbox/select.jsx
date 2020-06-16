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
import {
  Card,
  CardHeader,
  CardContent,
  Select,
  MenuItem,
} from '@material-ui/core';

const ToolboxSelect = ({
  title,
  value,
  items,
  onChange,
}) => (
  <Card>
    <CardHeader title={title} />
    <CardContent>
      <Select value={value} onChange={onChange}>
        { items.map((item) => (
          <MenuItem key={item.key} value={item.key}>
            { item.image
              ? <img src={item.image} alt={item.value} />
              : <>{item.value}</> }
          </MenuItem>
        ))}
      </Select>
    </CardContent>
  </Card>
);

ToolboxSelect.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ToolboxSelect;
