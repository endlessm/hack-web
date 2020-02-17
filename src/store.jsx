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
      return { ...state, authenticated: true, username };
    }
    case 'LOGOUT':
      return { ...state, authenticated: false, username: false };
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

const store = createStore(combineReducers({
  auth: authReducer,
  pathways: pathwaysReducer,
}), initialState);

export default store;
