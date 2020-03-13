import React from 'react';
import PropTypes from 'prop-types';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

import {
  Card,
  CardHeader,
  CardContent,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
// eslint-disable-next-line react/jsx-props-no-spreading
})((props) => <Checkbox color="default" {...props} />);

const ToolboxCheck = ({
  title,
  items,
  onChange,
}) => {
  const checks = items.map((item) => (
    <FormControlLabel
      key={item.key}
      control={(
        <GreenCheckbox
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

export { ToolboxCheck as default, GreenCheckbox };