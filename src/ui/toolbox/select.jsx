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
