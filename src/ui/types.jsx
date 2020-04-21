import PropTypes from 'prop-types';

const cardSetType = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
});

const cardType = PropTypes.shape({
  slug: PropTypes.string,
  name: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
});

export {
  cardSetType,
  cardType,
};
