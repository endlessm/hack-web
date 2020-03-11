import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Checkbox from '../checkbox';

const CheckboxPanel = ({
  title,
  items,
  onChange,
}) => {
  const params = useSelector((state) => state.game);

  if (typeof params[items[0].key] === 'undefined') {
    return <></>;
  }

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
  onChange: PropTypes.func.isRequired,
};

export default CheckboxPanel;
