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
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

const ToolboxCheck = ({
  title,
  items,
  onChange,
}) => {
  const checks = items.map((item) => (
    <FormControlLabel
      key={item.key}
      control={(
        <Checkbox
          checked={item.value}
          onChange={(ev) => onChange({ [item.key]: ev.target.checked })}
        />
      )}
      label={item.label}
    />
  ));

  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        { checks }
      </CardContent>
    </Card>
  );
};

ToolboxCheck.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.bool,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ToolboxCheck;
