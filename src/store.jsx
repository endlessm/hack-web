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
  gameSet: (data) => ({
    type: 'SET',
    payload: data,
  }),
  gameSetParam: (key, value) => ({
    type: 'SET-PARAM',
    payload: { key, value },
  }),
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

function gameReducer(state = {}, action) {
  switch (action.type) {
    case 'SET': {
      return { ...action.payload };
    }
    case 'SET-PARAM': {
      const { key, value } = action.payload;
      return { ...state, [key]: value };
    }
    default:
      return state;
  }
}

// TODO: Fake data. Remove this later.
const dummyQuest = {
  slug: 'blender',
  name: 'Sidetrack #1 - Robots and Pits',
  description: 'Riley, one of your classmates, can\'t wait to meet you and tell you everything about the Academy.',
  subtitle: 'What you\'ll do?',
  difficulty: 'medium',
};
const dummyQuestList = [...Array(10).keys()].map(() => dummyQuest);

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
      quests: dummyQuestList,
    },
    {
      slug: 'art',
      name: 'Art',
      description: 'This is a category description.',
      quests: dummyQuestList,
    },
    {
      slug: 'web',
      name: 'Web',
      description: 'This is a category description.',
      quests: dummyQuestList,
    },
    {
      slug: 'maker',
      name: 'Maker',
      description: 'This is a category description.',
      quests: dummyQuestList,
    },
    {
      slug: 'os',
      name: 'OS',
      description: 'This is a category description.',
      quests: dummyQuestList.slice(0, 5),
    },
  ],
  game: {},
};

const store = createStore(combineReducers({
  auth: authReducer,
  pathways: pathwaysReducer,
  game: gameReducer,
}), initialState);

export default store;
