import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Select from '../select';

const SelectPanel = ({
  title,
  items,
  param,
  onChange,
}) => {
  const params = useSelector((state) => state.game);

  if (typeof params[param] === 'undefined') {
    return <></>;
  }

  return (
    <Select
      title={title}
      items={items}
      value={params[param].toString()}
      onChange={(ev) => onChange({
        [param]: ev.target.value,
      })}
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
  onChange: PropTypes.func.isRequired,
};

export default SelectPanel;
