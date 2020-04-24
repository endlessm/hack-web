import { hot } from 'react-hot-loader';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TestWrapper from './test-wrapper';
import Dialogue, { useQuest } from '../dialogue';
import { useCard } from '../hack-card';
import QuestFTHView from '../quest-fth-view';
import questContent from './sidetrack-quest.ink';

import store, { actions } from '../../store';
import { proxyApp, updateApp } from '../toolbox/tools';
import Toolbox from '../toolbox/sidetrack';

import SoundsMeta from '../../../apps/sounds/metadata.json';

const SidetrackSounds = [
  'sidetrack/bg/lobby_loop',
  'sidetrack/bg/bonus_mode',
  'sidetrack/bg/auto_mode',
  'sidetrack/bg/manual_mode',
  'sidetrack/sfx/start_chime',
  'sidetrack/sfx/move_fwd',
  'sidetrack/sfx/move_up',
  'sidetrack/sfx/move_down',
  'sidetrack/sfx/move_jump',
  'sidetrack/sfx/push_default',
  'sidetrack/sfx/failure',
  'sidetrack/sfx/move_fwd',
  'sidetrack/sfx/move_up',
  'sidetrack/sfx/move_down',
  'sidetrack/sfx/move_jump',
  'sidetrack/sfx/push_default',
  'sidetrack/sfx/failure',
  'sidetrack/sfx/robot',
  'sidetrack/sfx/explosion',
  'sidetrack/sfx/instruction_grab',
  'sidetrack/sfx/instruction_drag',
  'sidetrack/sfx/instruction_drop',
  'sidetrack/sfx/start_chime',
  'sidetrack/sfx/start_chime',
  'sidetrack/sfx/felix_smash',
  'sidetrack/bg/manual_mode',
  'sidetrack/bg/auto_mode',
  'sidetrack/bg/bonus_mode',
  'sidetrack/bg/lobby_loop',
  'sidetrack/sfx/failure',
  'sidetrack/sfx/success',
];

const useStyles = makeStyles({
  root: {
  },
  frame: {
    width: '100%',
    height: '100vh',
    border: 'none',
  },
});

const SidetrackQuest = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const card = useCard();

  const {
    quest, dialogue, choices, setCurrentChoice, hasEnded, restartQuest,
  } = useQuest(questContent);

  const [firstTimeCode, setFirstTimeCode] = useState(true);
  const [appLoaded, setAppLoaded] = useState(false);

  const changeCallback = (params, firstTime = false) => {
    const app = document.querySelector('#app');

    const level = app.contentWindow[`globalLevel${params.currentLevel}Parameters`];
    const code = {
      instructionCode: level.instructionCode,
      levelCode: level.levelCode,
      robotADirection: level.robotADirection,
      robotBDirection: level.robotBDirection,
    };
    const state = { ...params, ...code };
    dispatch(actions.hackableAppSet(state));
    if (firstTime && firstTimeCode) {
      dispatch(actions.originalHackableAppSet(state));
      setFirstTimeCode(false);
    }

    // Expose some game variables to the quest
    let questUpdated = false;
    if (params.currentLevel !== quest.getStoryVariable('currentLevel')) {
      quest.updateStoryVariable('currentLevel', params.currentLevel);
      questUpdated = true;
    }
    if (params.success !== Boolean(quest.getStoryVariable('success'))) {
      quest.updateStoryVariable('success', params.success);
      questUpdated = true;
    }
    if (params.playing !== Boolean(quest.getStoryVariable('playing'))) {
      quest.updateStoryVariable('playing', params.playing);
      questUpdated = true;
    }
    if (params.controlsCutscene !== Boolean(quest.getStoryVariable('controlsCutscene'))) {
      quest.updateStoryVariable('controlsCutscene', params.controlsCutscene);
      questUpdated = true;
    }
    if (params.escapeCutscene !== Boolean(quest.getStoryVariable('escapeCutscene'))) {
      quest.updateStoryVariable('escapeCutscene', params.escapeCutscene);
      questUpdated = true;
    }

    // Only update quest if some variable changes, to avoid infinite loop
    if (questUpdated) {
      setCurrentChoice(undefined);
    }
  };

  const loadState = () => {
    const app = document.querySelector('#app');
    if (!app.contentWindow.loadState) {
      setTimeout(loadState, 500);
      return;
    }

    // fake ToyApp
    app.contentWindow.ToyApp = {
      isHackMode: true,
      runningQuest: true,
      showClubhouse: () => {},
      saveState: () => {},
      requestState: () => {},
      loadNotify: () => {},
    };

    // preload all sounds
    SidetrackSounds.forEach((s) => {
      const sound = SoundsMeta[s];
      const soundFile = sound['sound-file'];
      const audio = new Audio(`/apps/sounds/${soundFile}`);
      audio.setAttribute('id', s);
      if (sound.volume) {
        audio.volume = sound.volume;
      }
      app.contentDocument.body.appendChild(audio);
    });

    app.contentWindow.Sounds = {
      getSound: (sound) => {
        const audio = app.contentDocument.getElementById(sound);
        return audio;
      },
      play: (sound) => {
        const audio = app.contentWindow.Sounds.getSound(sound);
        audio.currentTime = 0;
        audio.play();
      },
      stop: (sound) => {
        const audio = app.contentWindow.Sounds.getSound(sound);
        audio.pause();
        audio.currentTime = 0;
      },
      playLoop: (sound) => {
        const audio = app.contentWindow.Sounds.getSound(sound);
        audio.setAttribute('loop', 'true');
        audio.currentTime = 0;
        audio.play();
      },
    };

    // fake pauseToyApp
    app.contentWindow.wakeScenes = () => {};
    app.contentWindow.sleepScenes = () => {};
    app.contentWindow.needHackScreen = () => {};
    app.contentWindow.hideNeedHackScreen = () => {};
    app.contentWindow.clearSleepTimer = () => {};

    // center vertically
    app.contentDocument.body.style.height = '100vh';

    app.contentWindow.loadState();

    // starting at level defined on the quest
    const highestAchievedLevel = quest.getStoryVariable('highestAchievedLevel');
    const availableLevels = quest.getStoryVariable('availableLevels');
    const startLevel = quest.getStoryVariable('startLevel');
    // TODO: remove this timeout or show feedback to the user
    setTimeout(() => {
      app.contentWindow.globalParameters.highestAchievedLevel = highestAchievedLevel;
      app.contentWindow.globalParameters.availableLevels = availableLevels;
      app.contentWindow.globalParameters.startLevel = startLevel;
      setAppLoaded(true);
    }, 5000);
  };

  useEffect(() => {
    // Creates a proxy to track iframe globalParameters
    if (firstTimeCode) {
      proxyApp('globalParameters', changeCallback);
      loadState();
    }
  });

  useEffect(() => {
    const handleChange = () => {
      const params = store.getState().hackableApp;
      const currentLevel = {
        instructionCode: params.instructionCode,
        levelCode: params.levelCode,
        robotADirection: params.robotADirection,
        robotBDirection: params.robotBDirection,
      };

      updateApp('globalParameters', params);
      updateApp(`globalLevel${params.currentLevel}Parameters`, currentLevel, () => {
        changeCallback(params);
      });
    };
    return store.subscribe(handleChange);
  });

  // Update the app when the quest changes some variable
  useEffect(() => {
    if (!appLoaded) {
      return;
    }

    const params = {
      currentLevel: quest.getStoryVariable('currentLevel'),
      startLevel: quest.getStoryVariable('startLevel'),
      highestAchievedLevel: quest.getStoryVariable('highestAchievedLevel'),
      availableLevels: quest.getStoryVariable('availableLevels'),
      success: quest.getStoryVariable('success'),
      playing: quest.getStoryVariable('playing'),
      controlsCutscene: quest.getStoryVariable('controlsCutscene'),
      escapeCutscene: quest.getStoryVariable('escapeCutscene'),
    };
    updateApp('globalParameters', params);
  }, [quest, dialogue, appLoaded]);

  const toolbox = <Toolbox />;

  const canvas = (
    <iframe
      id="app"
      title="Fizzics App"
      className={classes.frame}
      src="/apps/hack-toy-apps/com.hack_computer.Sidetrack/app/index.html"
    />
  );

  const onRestartSelected = () => {
    // TODO: Bring the app and toolbox to the initial state.
    restartQuest();
  };

  const sidebar = (
    <Dialogue
      dialogue={dialogue}
      choices={choices}
      onChoiceSelected={setCurrentChoice}
      onRestartSelected={onRestartSelected}
      hasEnded={hasEnded}
      card={card}
    />
  );

  return (
    <TestWrapper>
      <QuestFTHView
        toolbox={toolbox}
        canvas={canvas}
        sidebar={sidebar}
        title={card.name}
      />
    </TestWrapper>
  );
};

const WrappedQuest = () => (
  <TestWrapper>
    <SidetrackQuest />
  </TestWrapper>
);

const App = hot(module)(WrappedQuest);

export { App as default, SidetrackQuest };
