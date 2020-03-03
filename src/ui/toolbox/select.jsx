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
          <MenuItem key={item.key} value={item.key}>{item.value}</MenuItem>
        ))}
      </Select>
    </CardContent>
  </Card>
);

ToolboxSelect.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ToolboxSelect;
