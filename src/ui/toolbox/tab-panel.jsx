import React from 'react';
import PropTypes from 'prop-types';

const TabPanel = ({
  children,
  value,
  index,
}) => (
  <>
    { value === index && <>{children}</> }
  </>
);

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default TabPanel;
