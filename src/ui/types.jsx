import PropTypes from 'prop-types';

const pathwayType = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
});

export {
  // eslint-disable-next-line import/prefer-default-export
  pathwayType,
};
