import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
  Select,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  img: {
    width: 64,
  },
});

const ToolboxSelect = ({
  title,
  value,
  items,
  onChange,
}) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <Select value={value} onChange={onChange}>
          { items.map((item) => (
            <MenuItem key={item.key} value={item.key}>
              { item.image
                ? <img className={classes.img} src={item.image} alt={item.value} />
                : <>{item.value}</> }
            </MenuItem>
          ))}
        </Select>
      </CardContent>
    </Card>
  );
};

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
