/* Copyright © 2020 Endless OS LLC
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { createStore, combineReducers } from 'redux';
import ReactGA from 'react-ga';

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
  inventoryToggle: () => ({
    type: 'INVENTORY-TOGGLE',
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
  resetHackableApp: () => ({
    type: 'RESET',
  }),
  setCardSets: (data) => ({
    type: 'CARDSETS',
    payload: data,
  }),
  setGameState: (key, value) => ({
    type: 'GAME-STATE',
    payload: { key, value },
  }),
  gameStateReset: () => ({
    type: 'GAME-STATE-RESET',
  }),
  setAchievementsData: (data) => ({
    type: 'ACHIEVEMENTS',
    payload: data,
  }),
};

function gameStateReducer(state = {}, action) {
  switch (action.type) {
    case 'GAME-STATE': {
      const { key, value } = action.payload;
      return { ...state, [key]: value };
    }
    case 'GAME-STATE-RESET': {
      return {};
    }
    default:
      return state;
  }
}

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
    case 'INVENTORY-TOGGLE': {
      return { ...state, inventory: !state.inventory };
    }
    default:
      return state;
  }
}

function cardSetReducer(state = [], action) {
  switch (action.type) {
    case 'CARDSETS': {
      return [...action.payload];
    }
    default:
      return state;
  }
}

function originalHackableAppReducer(state = {}, action) {
  switch (action.type) {
    case 'ORIG-SET': {
      return { ...action.payload };
    }
    case 'RESET': {
      return {};
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
    case 'RESET': {
      return {};
    }
    default:
      return state;
  }
}

function achievementsDataReducer(state = {}, action) {
  switch (action.type) {
    case 'ACHIEVEMENTS': {
      return { ...action.payload };
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
    inventory: false,
  },
  cardsets: [],
  hackableApp: {},
  originalHackableApp: {},
  gameState: {},
  achievementsData: {},
};

// load gameState from localStorage
if (localStorage.getItem('gameState')) {
  initialState.gameState = JSON.parse(localStorage.getItem('gameState'));
}

const store = createStore(combineReducers({
  gameState: gameStateReducer,
  auth: authReducer,
  ui: uiReducer,
  cardsets: cardSetReducer,
  hackableApp: hackableAppReducer,
  originalHackableApp: originalHackableAppReducer,
  achievementsData: achievementsDataReducer,
}), initialState);

const initializeDefaultData = (t) => {
  const defaultCardSets = [
    {
      slug: '/home',
      // Note: not translated on purpose. It's the brand name.
      name: 'Hack Lab',
      description: t('Hey, Hacker! My name\'s Riley, and I\'m here to show off Endless OS and Hack! Pick a card and check out what we\'ve got to offer!'),
      cards: [
        {
          slug: '/art',
          name: t('Processing'),
          subtitle: t('Take your first steps into programming!'),
          description: t('Processing is a language that connects programming to art, making it easy for anyone to understand. Check out the basics of JavaScript, a common programming language with many different uses!'),
        },
        {
          slug: '/games',
          name: t('Sidetrack'),
          subtitle: t('Take a break, and enjoy a game!'),
          description: t('Join Riley as she presents one of her projects! Sidetrack isn\'t just a game - Playing will teach you programming basics, like how to arrange instructions, how to write basic code, and teach you to solve problems by planning.'),
        },
        {
          slug: '/web',
          name: t('Web Tech'),
          subtitle: t('Explore web pages, and learn how to make your own!'),
          description: t('Have you ever wondered how web pages are made, or wanted to make your own? Come and take your first steps into web design - it\'s easier than you think!'),
        },
        {
          slug: '/maker',
          name: t('Engineering'),
          subtitle: t('Learn how strong buildings stay up!'),
          description: t('Learn some basic engineering in this fun (and tasty!) activity. The virtual world is useful, but there\'s no substitute for building with your hands!'),
        },
        {
          slug: '/os',
          name: t('Endless OS'),
          subtitle: t('Dive deeper into hacking with the Endless Operating System!'),
          description: t('Endless OS is the center of it all - an operating system that\'s easy for anyone to use. But easy doesn\'t mean less powerful - Endless OS has everything you need to work, learn, play, and connect, using the best free and open-source software.'),
        },
        {
          slug: '/t2',
          name: t('Terminal Two'),
          subtitle: t('Explore the world of Terminal Two!'),
          description: t('Terminal Two is another branch of Endless, focused on delivering educational games. Journey through their worlds, hacking futuristic cities, discovering ancient ruins, and exploring alien planets!'),
        },
      ],
    },
    {
      slug: '/os',
      name: t('Endless OS'),
      subtitle: t('Dive deeper into hacking with the Endless Operating System!'),
      description: t('Endless OS is the center of it all - an operating system that\'s easy for anyone to use. But easy doesn\'t mean less powerful - Endless OS has everything you need to work, learn, play, and connect, using the best free and open-source software.'),
      cards: [
        {
          slug: '/os/os-win',
          href: 'https://support.endlessm.com/hc/en-us/articles/212890106-How-do-I-install-Endless-OS-alongside-Windows-',
          name: t('Windows'),
          subtitle: t('Endless OS and Windows - Side by side!'),
          description: t('If you\'re running Windows, you can install Endless OS side-by-side in your free hard drive space. Choose what OS you want to use whenever you start up your computer. You can also run it as a virtual machine - a computer inside your computer.'),
        },
        {
          slug: '/os/os-mac',
          href: 'https://support.endlessm.com/hc/en-us/articles/115001629603-How-can-I-create-and-boot-an-Endless-USB-stick-from-macOS-',
          name: t('MacOS'),
          subtitle: t('Endless OS power without restarting your Mac!'),
          description: t('Although our support for Apple devices is still in development, you can try out Endless OS on your Mac by running it in a virtual machine. We\'ve got detailed instructions to help you every step of the way.'),
        },
        {
          slug: '/os/os-switch',
          href: 'https://endlessos.com/download/',
          name: t('Switch to Endless OS'),
          subtitle: t('Join the open-source revolution!'),
          description: t('It\'s never been easier to install a new operating system! Endless OS has simple instructions for switching over - and you can even do it while your computer is running!'),
        },
        {
          slug: '/os/os-hacklaptop',
          href: 'https://www.hack-computer.com/hack-web-computer',
          name: t('Hack Computer'),
          subtitle: t('A just-right laptop for learning, work and play!'),
          description: t('Endless OS comes pre-installed on the Hack Computer - a competitively-priced laptop that\'s powerful enough for software development, but small and light enough to take anywhere, complete with an all-day battery.'),
        },
        {
          slug: '/os/os-hackkey',
          href: 'https://www.hack-computer.com/hack-web-key',
          name: t('Hack Key'),
          subtitle: t('EOS Power in a USB Package!'),
          description: t('The Hack Key is a USB drive that comes pre-installed with Endless OS - plug it in, reboot, and you\'re using Endless OS! Unplug it, restart, and the computer is back to normal. You can take it with you anywhere you go - any computer can be your personal Endless OS computer!'),
        },
        {
          slug: '/os/os-rpi',
          href: 'https://support.endlessm.com/hc/en-us/articles/360039665771-How-to-install-Endless-OS-on-Raspberry-Pi-',
          name: t('Raspberry Pi'),
          subtitle: t('The ultimate DIY Hacking solution!'),
          description: t('If you own or are interested in a Raspberry Pi, Endless OS works there too! Turn your Raspberry Pi into a media center, a robot controller, a tiny desktop, a home file server, an electronics project station, and so much more! Whatever you choose, Endless OS is there to support you.'),
        },
      ],
    },
    {
      slug: '/t2',
      name: t('Terminal Two'),
      subtitle: t('Explore the world of Terminal Two!'),
      description: t('Terminal Two is another branch of Endless, focused on delivering educational games. Journey through their worlds, hacking futuristic cities, discovering ancient ruins, and exploring alien planets!'),
      cards: [
        {
          slug: '/t2/t2-whitehouse',
          href: 'https://terminaltwo.com/games/White-House',
          name: t('White House'),
          subtitle: t('Color and Investigate!'),
          description: t('Using the magic of CSS, hack your world into a unique burst of color and light revealing hidden objects and clues.'),
        },
        {
          slug: '/t2/t2-aqueducts',
          href: 'https://terminaltwo.com/games/Aqueducts',
          name: t('Aqueducts'),
          subtitle: t('A Voxel Adventure!'),
          description: t('All the water has disappeared from your village and it\'s up to you to save the day! Go on an adventure to connect the water pipes and bring water back to your village.'),
        },
        {
          slug: '/t2/t2-passage',
          href: 'https://terminaltwo.com/games/The-Passage',
          name: t('The Passage'),
          subtitle: t('Blast and Hack!'),
          description: t('You\'ve landed on a mysterious planet with one mission; find the secret map to locate the hidden bunker. Hack the world to cross perilous lands and the obstacles within.'),
        },
        {
          slug: '/t2/t2-squash',
          href: 'https://terminaltwo.com/games/Frog-Squash',
          name: t('FrogSquash'),
          subtitle: t('Jump and Dash!'),
          description: t('Dodge arrows, saws, and fire balls without getting squashed! Choose from eight different animals to cross these perilous roads. Hack your animals and go farther than ever before!'),
        },
        {
          slug: '/t2/t2-ovum',
          href: 'https://terminaltwo.com/games/Ovum-City',
          name: t('Ovum City'),
          subtitle: t('Explore and Control!'),
          description: t('Can you control the chaos? Hack your way into the cyberpunk world of Ovum City. Debug broken code, solve puzzles, and upgrade your hardware as you explore this open world. Don\'t get caught by the drones! It\'s up to you how Ovum City evolves.'),
        },
        {
          slug: '/t2/t2-more',
          href: 'https://terminaltwo.com/play',
          name: t('More Games'),
          subtitle: t('Exciting games in development!'),
          description: t('Terminal 2 has lots more games coming soon - Maze adventures, fantasy quests, space shooters, hacking racers, survival shooters... Keep up to date on the site, and sign up for the free download!'),
        },
      ],
    },
  ];
  store.dispatch(actions.setCardSets(defaultCardSets));

  const defaultAchievements = {
    'web-complete': t('Web Tech hacker'),
    'p5-complete': t('Art hacker'),
    'pdf-complete': t('Maker hacker'),
    'sidetrack1-complete': t('Sidetrack gamer'),
    'sidetrack2-complete': t('Sidetrack hacker'),
  };
  store.dispatch(actions.setAchievementsData(defaultAchievements));
};

function trackGameStateChanges(key) {
  const ev = {
    category: 'User',
    action: null,
    value: 0,
    label: null,
  };

  // track game state changes in analytics
  switch (key) {
    case 'quest.Web/complete':
    case 'quest.P5/complete':
    case 'quest.Sidetrack1/complete':
    case 'quest.Sidetrack2/complete': {
      const quest = key.split('/')[0].split('.')[1];
      ev.category = quest;
      ev.action = `${quest} completed`;
      break;
    }

    default:
      return;
  }

  ReactGA.event(ev);
}

function setGameState(key, value) {
  trackGameStateChanges(key, value);

  let finalKey = key;
  let finalValue = value;

  // slash is used to define nesting
  const [basek, ...rest] = key.split('/');

  // Nested values
  if (rest.length > 0) {
    const state = store.getState().gameState;
    finalKey = basek;

    finalValue = state[basek] || {};
    const lastKey = rest[rest.length - 1];
    const keys = rest.slice(0, -1);

    let object = finalValue;
    keys.forEach((k) => {
      if (!(k in object)) {
        object[k] = {};
      }
      object = object[k];
    });
    object[lastKey] = value;
  }

  store.dispatch(actions.setGameState(finalKey, finalValue));
}

function getGameState(key) {
  const { gameState } = store.getState();
  if (key in gameState) {
    return gameState[key];
  }

  // slash is used to define nesting
  const [basek, ...rest] = key.split('/');
  if (basek in gameState) {
    let object = gameState[basek];
    // eslint-disable-next-line no-restricted-syntax
    for (const k of rest) {
      if (!(k in object)) {
        object = null;
        break;
      }
      object = object[k];
    }
    return object;
  }

  return null;
}

// Persist gameState between sessions in local storage
store.subscribe(() => {
  localStorage.setItem('gameState', JSON.stringify(store.getState().gameState));
});

export {
  store as default,
  initializeDefaultData,
  getGameState,
  setGameState,
};
