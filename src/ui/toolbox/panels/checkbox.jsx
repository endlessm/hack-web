import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../../store';

import Checkbox from '../checkbox';

const CheckboxPanel = ({
  title,
  items,
}) => {
  const params = useSelector((state) => state.hackableApp);
  const dispatch = useDispatch();

  if (typeof params[items[0].key] === 'undefined') {
    return <></>;
  }

  const onChange = (changedValues) => {
    Object.keys(changedValues).forEach((p) => {
      dispatch(actions.hackableAppSetParam([p], changedValues[p]));
    });
  };

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
};

export default CheckboxPanel;
