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
  selectCard: (quest) => ({
    type: 'SELECT-CARD',
    payload: quest,
  }),
  deselectCard: () => ({
    type: 'DESELECT-CARD',
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
      return { ...state, cardSelected: action.payload };
    }
    case 'DESELECT-CARD': {
      return { ...state, cardSelected: null };
    }
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
  href: 'https://hack-computer.com/',
  name: `Quest #${i + 1} - Robots and Pits`,
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
    cardSelected: null,
  },
  pathways: [
    {
      slug: 'home',
      name: 'Pick a dimension to explore.',
      description: '',
      quests: [
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
      slug: 'os',
      name: 'Intro to Endless',
      description: 'This is a category description.',
      quests: dummyQuestList.slice(0, 5),
    },
    {
      slug: 't2',
      name: 'Intro to T2',
      description: 'This is a category description.',
      quests: dummyQuestList.slice(0, 5),
    },
  ],
  hackableApp: {},
  originalHackableApp: {},
};

const store = createStore(combineReducers({
  auth: authReducer,
  ui: uiReducer,
  pathways: pathwaysReducer,
  hackableApp: hackableAppReducer,
  originalHackableApp: originalHackableAppReducer,
}), initialState);

export default store;
