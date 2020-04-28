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
          slug: '/web',
          name: 'Web Technology',
          subtitle: ' Explore web pages, and learn how to make your own!',
          description: 'Have you ever wondered how web pages are made, or wanted to make your own? Come and take your first steps into web design - it\'s easier than you think!',
        },
        {
          slug: '/maker',
          name: 'Engineering',
          subtitle: 'Learn how strong buildings stay up!',
          description: 'Learn some basic engineering in this fun (and tasty!) activity. This activity is just one of the many real-world activities the desktop version of Hack offers - the virtual world is useful, but there is no substitute for building with your own hands!',
        },
        {
          slug: '/art',
          name: 'Processing',
          subtitle: 'Take your first steps into programming!',
          description: 'Processing is a language that connects programming to art, making it easy for anyone to understand and start learning. The desktop version of Hack includes more activities that ease you into Javascript, a common programming language with many different uses.',
        },
        {
          slug: '/os',
          name: 'Endless OS',
          subtitle: 'Dive deeper into hacking using a full Operating System.',
          description: 'Endless OS is the center of it all - an operating system designed to be easy for anyone to use. Easy doesn\'t mean less powerful, though - Endless OS has everything you need to work, learn, play and connect, using the best of free and open-source software.',
        },
        {
          slug: '/games',
          name: 'Sidetrack',
          subtitle: 'Take a break, and enjoy a game!',
          description: 'Jump into a project from one of Hack\'s characters, Riley! Sidetrack isn\'t just a game, though - Playing will teach you programming basics, like order-of-instructions, basic code, and problem-solving through planning.',
        },
        {
          slug: '/t2',
          name: 'T2 Games',
          subtitle: 'Explore the world of Terminal Two!',
          description: 'Terminal Two is another branch of Endless, focused on delivering educational games. Journey through their worlds, hacking futuristic cities, discovering ancient ruins, and exploring alien planets!',
        },
      ],
    },
    {
      slug: '/os',
      name: 'Endless OS',
      description: 'This is a category description.',
      cards: dummyCards,
    },
    {
      slug: '/t2',
      name: 'T2 Games',
      description: 'Terminal Two is another branch of Endless, focused on delivering educational games. Journey through their worlds, hacking futuristic cities, discovering ancient ruins, and exploring alien planets!',
      cards: [
        {
          slug: 't2-01',
          href: 'https://terminaltwo.com/hourofcode/whitehouse',
          name: 'White House',
          subtitle: '',
          description: 'Using the magic of CSS, hack your world into a unique burst of color and light revealing hidden objects and clues.',
        },
        {
          slug: 't2-02',
          href: 'https://terminaltwo.com/hourofcode/aqueducts',
          name: 'Aqueducts',
          subtitle: '',
          description: 'All the water has disappeared from your village and it\'s up to you to save the day! Go on an adventure to connect the water pipes and bring water back to your village.',
        },
        {
          slug: 't2-03',
          href: 'https://terminaltwo.com/hourofcode/frogsquash',
          name: 'FrogSquash',
          subtitle: '',
          description: 'Dodge arrows, saws, and fire balls without getting squashed! Choose from eight different animals to cross these perilous roads. Hack your animals and go farther than ever before!',
        },
        {
          slug: 't2-04',
          // FIXME, set correct link:
          href: 'https://hack-computer.com/',
          name: 'The Maze',
          subtitle: '',
          description: 'Description: You have landed on an alien planet in a pocket universe and must find a way to escape so you can continue on your journey. Learn and use new programming concepts to hack your way to victory.',
        },
        {
          slug: 't2-05',
          href: 'https://terminaltwo.com/hourofcode/ovumcity',
          name: 'Ovum City',
          subtitle: '',
          description: 'Can you control the chaos? Hack your way into the cyberpunk world of Ovum City. Debug broken code, solve puzzles, and upgrade your hardware as you explore this open world. Don\'t get caught by the drones! It\'s up to you how Ovum City evolves.',
        },
      ],
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
