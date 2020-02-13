import { createStore } from 'redux';

function reducer() {
  return {
    pathways: [
      {
        slug: 'games',
        name: 'Games',
      },
      {
        slug: 'art',
        name: 'Art',
      },
      {
        slug: 'web',
        name: 'Web',
      },
      {
        slug: 'maker',
        name: 'Maker',
      },
      {
        slug: 'os',
        name: 'Operating System',
      },
    ],
  };
}

const store = createStore(reducer);
export default store;
