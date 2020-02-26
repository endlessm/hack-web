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
}) => {
  const menuItems = Object.keys(items).map((key) => (
    <MenuItem key={key} value={key}>{items[key]}</MenuItem>
  ));

  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <Select value={value} onChange={onChange}>
          { menuItems }
        </Select>
      </CardContent>
    </Card>
  );
};

ToolboxSelect.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ToolboxSelect;
