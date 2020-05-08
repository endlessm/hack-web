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
      name: 'Pick a dimension to explore!',
      description: 'Hey, Hacker! My name\'s Riley, and I\'m here to show off Endless OS and Hack! Pick a card and check out what we\'ve got to offer!',
      cards: [
        {
          slug: '/web',
          name: 'Web Tech',
          subtitle: ' Explore web pages, and learn how to make your own!',
          description: 'Have you ever wondered how web pages are made, or wanted to make your own? Come and take your first steps into web design - it\'s easier than you think!',
        },
        {
          slug: '/maker',
          name: 'Engineering',
          subtitle: 'Learn how strong buildings stay up!',
          description: 'Learn some basic engineering in this fun (and tasty!) activity. The virtual world is useful, but there is no substitute for building with your own hands!',
        },
        {
          slug: '/art',
          name: 'Processing',
          subtitle: 'Take your first steps into programming!',
          description: 'Processing is a language that connects programming to art, making it easy for anyone to understand and start learning. Check out the bascis of Javascript, a common programming language with many different uses!',
        },
        {
          slug: '/os',
          name: 'Endless OS',
          subtitle: 'Dive deeper into hacking with the Endless Operating System!',
          description: 'Endless OS is the center of it all - an operating system designed to be easy for anyone to use. Easy doesn\'t mean less powerful, though - Endless OS has everything you need to work, learn, play, and connect, using the best of free and open-source software.',
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
      subtitle: 'Dive deeper into hacking with the Endless Operating System!',
      description: 'Endless OS is the center of it all - an operating system designed to be easy for anyone to use. Easy doesn\'t mean less powerful, though - Endless OS has everything you need to work, learn, play, and connect, using the best of free and open-source software.',
      cards: [
        {
          slug: '/os/os-win',
          href: 'https://support.endlessm.com/hc/en-us/articles/212890106-How-do-I-install-Endless-OS-alongside-Windows-',
          name: 'Windows',
          subtitle: 'Endless OS and Windows - Side by side!',
          description: 'If you\'re running Windows, you can install Endless OS side-by-side in your free hard drive space. Choose what OS you want to use whenever you start up your computer. You can also run it as a virtual machine - a computer inside your computer.',
        },
        {
          slug: '/os/os-mac',
          href: 'https://support.endlessm.com/hc/en-us/articles/115001629603-How-can-I-create-and-boot-an-Endless-USB-stick-from-macOS-',
          name: 'MacOS',
          subtitle: 'Endless OS power without restarting your Mac!',
          description: 'Although our support for Apple devices is still in development, you can try out Endless OS on your Mac by running it in a virtual machine. We\'ve got detailed instructions walk you through running Endless OS inside your existing MacOS session, and we\'re working hard on bringing every option for running Endless OS to Apple products.',
        },
        {
          slug: '/os/os-switch',
          href: 'https://endlessos.com/download/',
          name: 'Switch to Endless OS',
          subtitle: 'Join the open-source revolution!',
          description: 'It\'s never been easier to install a new operating system! Endless OS has simple instructions for switching over - and you can even do it while your computer is running!',
        },
        {
          slug: '/os/os-hacklaptop',
          href: 'https://www.hack-computer.com/products',
          name: 'Hack Computer',
          subtitle: 'A just-right laptop for learning, work and play!',
          description: 'Endless OS comes pre-installed on the Hack Computer - a competitively-priced laptop that\'s powerful enough for software development, but small and light enough to take anywhere, complete with an all-day battery.',
        },
        {
          slug: '/os/os-hackkey',
          href: 'https://www.hack-computer.com/products',
          name: 'Hack Key',
          subtitle: 'EOS Power in a USB Package!',
          description: 'The Hack Key is a USB drive that comes pre-installed with Endless OS - plug it in, reboot, and you\'re using Endless OS! Unplug it, restart, and the computer is back to normal. You can take it with you anywhere you go - any computer can be your personal Endless OS computer!',
        },
        {
          slug: '/os/os-rpi',
          href: 'https://support.endlessm.com/hc/en-us/articles/360039665771-How-to-install-Endless-OS-on-Raspberry-Pi-',
          name: 'Raspberry Pi',
          subtitle: 'The ultimate DIY Hacking solution!',
          description: 'If you own or are interested in owning a Raspberry Pi, Endless OS works there too! Turn your Raspberry Pi intto a media center, a robot control, a tiny desktop, a home file server, an electronics project station, and so much more! Whatever you choose, Endless OS will be there to support you.',
        },
      ],
    },
    {
      slug: '/t2',
      name: 'T2 Games',
      subtitle: 'Explore the world of Terminal Two!',
      description: 'Terminal Two is another branch of Endless, focused on delivering educational games. Journey through their worlds, hacking futuristic cities, discovering ancient ruins, and exploring alien planets!',
      cards: [
        {
          slug: '/t2/t2-whitehouse',
          href: 'https://terminaltwo.com/games/white-house',
          name: 'White House',
          subtitle: 'Color and Investigate!',
          description: 'Using the magic of CSS, hack your world into a unique burst of color and light revealing hidden objects and clues.',
        },
        {
          slug: '/t2/t2-aqueducts',
          href: 'https://terminaltwo.com/games/aqueducts',
          name: 'Aqueducts',
          subtitle: 'A Voxel Adventure!',
          description: 'All the water has disappeared from your village and it\'s up to you to save the day! Go on an adventure to connect the water pipes and bring water back to your village.',
        },
        {
          slug: '/t2/t2-passage',
          href: 'https://terminaltwo.com/games/the-passage',
          name: 'The Passage',
          subtitle: 'Blast and Hack!',
          description: 'You\'ve landed on a mysterious planet with one mission; find the secret map to locate the hidden bunker. Hack the world to cross perilous lands and the obstacles within.',
        },
        {
          slug: '/t2/t2-squash',
          href: 'https://terminaltwo.com/games/frog-squash',
          name: 'FrogSquash',
          subtitle: 'Jump and Dash!',
          description: 'Dodge arrows, saws, and fire balls without getting squashed! Choose from eight different animals to cross these perilous roads. Hack your animals and go farther than ever before!',
        },
        {
          slug: '/t2/t2-canyon',
          href: 'https://terminaltwo.com/play',
          name: 'More Games',
          subtitle: 'Exciting games in development!',
          description: 'Terminal 2 has lots more games coming soon - Maze adventures, fantasy quests, space shooters, hacking racers, survival shooters... Keep up to date on the site, and sign up for the free download!',
        },
        {
          slug: '/t2/t2-ovum',
          href: 'https://terminaltwo.com/games/ovum-city',
          name: 'Ovum City',
          subtitle: 'Explore and Control!',
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
