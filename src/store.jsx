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
  originalHackableAppSet: (data) => ({
    type: 'ORIG-SET',
    payload: data,
  }),
  hackableAppSet: (data) => ({
    type: 'SET',
    payload: data,
  }),
  hackableAppSetParam: (key, value) => ({
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

function originalHackableAppReducer(state = {}, action) {
  switch (action.type) {
    case 'ORIG-SET': {
      return { ...action.payload };
    }
    default:
      return state;
  }
}

function hackableAppReducer(state = {}, action) {
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
const dummyQuestList = [...Array(10).keys()].map((i) => ({
  slug: `quest_${i}`,
  name: `Quest #${i + 1} - Robots and Pits`,
  description: 'Riley, one of your classmates, can\'t wait to meet you and tell you everything about the Academy.',
  subtitle: 'What you\'ll do?',
  difficulty: ['easy', 'medium', 'hard'][i % 3],
}));

const initialState = {
  auth: {
    authenticated: false,
    username: null,
  },
  pathways: [
    {
      slug: 'games',
      tempUrl: 'games/fixme-name-the-sidetrack-quest',
      name: 'Games',
      description: 'This is a category description.',
      quests: dummyQuestList,
    },
    {
      slug: 'art',
      tempUrl: 'art/fixme-name-the-p5-quest',
      name: 'Art',
      description: 'This is a category description.',
      quests: dummyQuestList,
    },
    {
      slug: 'web',
      tempUrl: 'web/fixme-name-the-html-quest',
      name: 'Web',
      description: 'This is a category description.',
      quests: dummyQuestList,
    },
    {
      slug: 'maker',
      tempUrl: 'maker/make-change',
      name: 'Maker',
      description: 'This is a category description.',
      quests: dummyQuestList,
    },
    {
      slug: 'os',
      tempUrl: 'os',
      name: 'OS',
      description: 'This is a category description.',
      quests: dummyQuestList.slice(0, 5),
    },
  ],
  hackableApp: {},
  originalHackableApp: {},
};

const store = createStore(combineReducers({
  auth: authReducer,
  pathways: pathwaysReducer,
  hackableApp: hackableAppReducer,
  originalHackableApp: originalHackableAppReducer,
}), initialState);

export default store;
