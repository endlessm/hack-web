import { createStore, combineReducers } from 'redux';

export
const actions = {
  auth: (username) => ({
    type: 'AUTH',
    payload: {
      username,
    },
  }),
  logout: () => ({ type: 'LOGOUT' }),
};

function authReducer(state = {}, action) {
  switch (action.type) {
    case 'AUTH': {
      const { username } = action.payload;
      return {
        ...state,
        authenticated: true,
        username,
      };
    }
    case 'LOGOUT':
      return {
        ...state,
        authenticated: false,
        username: null,
      };
    default:
      return state;
  }
}

function pathwaysReducer(state = [], action) {
  switch (action.type) {
    default:
      return state;
  }
}

const initialState = {
  auth: {
    authenticated: false,
    username: null,
  },
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

const store = createStore(combineReducers({
  auth: authReducer,
  pathways: pathwaysReducer,
}), initialState);

export default store;
