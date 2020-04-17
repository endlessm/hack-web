import PropTypes from 'prop-types';

const pathwayType = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
});

const questType = PropTypes.shape({
  slug: PropTypes.string,
  name: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
});

export {
  pathwayType,
  questType,
};
