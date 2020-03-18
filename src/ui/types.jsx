import PropTypes from 'prop-types';

const difficultyType = PropTypes.oneOf(['easy', 'medium', 'hard']);

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
  difficulty: PropTypes.string,
});

export {
  difficultyType,
  pathwayType,
  questType,
};
