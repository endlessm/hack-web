import PropTypes from 'prop-types';

const PanelType = PropTypes.shape({
  type: PropTypes.string.isRequired,
  xs: PropTypes.number,
});

const TabType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  grid: PropTypes.arrayOf(PanelType).isRequired,
});

export { PanelType, TabType };
