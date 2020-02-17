import PropTypes from 'prop-types';

const pathwaysType = PropTypes.arrayOf(PropTypes.shape({
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}));

export default pathwaysType;
