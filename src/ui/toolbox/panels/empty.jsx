import React from 'react';
import PropTypes from 'prop-types';

const EmptyPanel = ({ type }) => (
  <p>
    {`TYPE '${type}' NOT IMPLEMENTED`}
  </p>
);
EmptyPanel.propTypes = {
  type: PropTypes.string.isRequired,
};

export default EmptyPanel;
