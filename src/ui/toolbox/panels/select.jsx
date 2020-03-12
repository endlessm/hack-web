import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../../store';

import Select from '../select';

const SelectPanel = ({
  title,
  items,
  param,
}) => {
  const params = useSelector((state) => state.game);
  const dispatch = useDispatch();

  if (typeof params[param] === 'undefined') {
    return <></>;
  }

  return (
    <Select
      title={title}
      items={items}
      value={params[param].toString()}
      onChange={(ev) => dispatch(actions.gameSetParam([param], ev.target.value))}
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
};

export default SelectPanel;
