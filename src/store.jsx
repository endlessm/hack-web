import { createStore, combineReducers } from 'redux';

export
const actions = {
  auth: (username) => ({
    type: 'AUTH',
    payload: {
      username,
    },
  }),
  sidePanelSetOpen: () => ({
    type: 'SIDE-PANEL-SET-OPEN',
  }),
  sidePanelToggleOpen: () => ({
    type: 'SIDE-PANEL-TOGGLE-OPEN',
  }),
  selectCard: (cardset, card) => ({
    type: 'SELECT-CARD',
    payload: { cardset, card },
  }),
  deselectCards: () => ({
    type: 'DESELECT-CARDS',
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

function uiReducer(state = {}, action) {
  switch (action.type) {
    case 'SIDE-PANEL-SET-OPEN': {
      return { ...state, sidePanelOpen: true };
    }
    case 'SIDE-PANEL-TOGGLE-OPEN': {
      return { ...state, sidePanelOpen: !state.sidePanelOpen };
    }
    case 'SELECT-CARD': {
      const { cardset, card } = action.payload;
      const newValue = {};
      newValue[cardset.slug] = card;
      return { ...state, cardSelected: { ...state.cardSelected, ...newValue } };
    }
    case 'DESELECT-CARDS': {
      return { ...state, cardSelected: {} };
    }
    default:
      return state;
  }
}

function cardSetReducer(state = [], action) {
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
const dummyCards = [...Array(3).keys()].map((i) => ({
  slug: `card-${i}`,
  href: 'https://hack-computer.com/',
  name: `Test Link #${i + 1}`,
  description: 'Riley, one of your classmates, can\'t wait to meet you and tell you everything about the Academy.',
  subtitle: 'What you\'ll do?',
}));

const initialState = {
  auth: {
    authenticated: false,
    username: null,
  },
  ui: {
    sidePanelOpen: false,
    cardSelected: {},
  },
  cardsets: [
    {
      slug: '/home',
      name: 'Pick a dimension to explore.',
      description: '',
      cards: [
        {
          slug: '/games/fixme-name-the-sidetrack-quest',
          name: 'Intro to Gaming',
          subtitle: 'What you\'ll do?',
          description: 'This is a description for the Intro to Gaming quest.',
        },
        {
          slug: '/art/fixme-name-the-p5-quest',
          name: 'Intro to Processing',
          subtitle: 'What you\'ll do?',
          description: 'This is a description for the Intro to Processing quest.',
        },
        {
          slug: '/web/fixme-name-the-html-quest',
          name: 'Intro to Web Technology',
          subtitle: 'What you\'ll do?',
          description: 'This is a description for the Intro to Web quest.',
        },
        {
          slug: '/maker/make-change',
          name: 'Intro to Engineering',
          subtitle: 'What you\'ll do?',
          description: 'This is a description for the Intro to Engineering quest.',
        },
        {
          slug: '/os',
          name: 'Intro to Endless',
          subtitle: 'What you\'ll do?',
          description: 'This is a description for the Intro to Endless quest.',
        },
        {
          slug: '/t2',
          name: 'Intro to T2',
          subtitle: 'What you\'ll do?',
          description: 'This is a description for the Intro to Endless quest.',
        },
      ],
    },
    {
      slug: '/os',
      name: 'Intro to Endless',
      description: 'This is a category description.',
      cards: dummyCards,
    },
    {
      slug: '/t2',
      name: 'Intro to T2',
      description: 'This is a category description.',
      cards: dummyCards,
    },
  ],
  hackableApp: {},
  originalHackableApp: {},
};

const store = createStore(combineReducers({
  auth: authReducer,
  ui: uiReducer,
  cardsets: cardSetReducer,
  hackableApp: hackableAppReducer,
  originalHackableApp: originalHackableAppReducer,
}), initialState);

export default store;
