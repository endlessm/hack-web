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
