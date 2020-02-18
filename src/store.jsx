import { createStore } from 'redux';

function reducer() {
  return {
    pathways: [
      {
        slug: 'games',
        name: 'Games',
        description: 'This is a category description.',
      },
      {
        slug: 'art',
        name: 'Art',
        description: 'This is a category description.',

      },
      {
        slug: 'web',
        name: 'Web',
        description: 'This is a category description.',

      },
      {
        slug: 'maker',
        name: 'Maker',
        description: 'This is a category description.',
      },
      {
        slug: 'os',
        name: 'OS',
        description: 'This is a category description.',
      },
    ],
  };
}

const store = createStore(reducer);
export default store;
