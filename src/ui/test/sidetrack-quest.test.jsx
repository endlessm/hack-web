import { hot } from 'react-hot-loader';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Fab,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
  VolumeOff,
  VolumeUp,
} from '@material-ui/icons';

import TestWrapper from './test-wrapper';
import Dialogue, { useQuest } from '../dialogue';
import { useCard } from '../hack-card';
import QuestFTHView from '../quest-fth-view';
import questContent from './sidetrack-quest.ink';

import store, { actions } from '../../store';
import { proxyApp, updateApp } from '../toolbox/tools';
import Toolbox, { validateInstructions, validateLevel } from '../toolbox/sidetrack';
import LockScreen from '../toolbox/lockscreen';

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

const useStyles = makeStyles(({ custom }) => ({
  frame: {
    width: '100%',
    height: `calc(100vh - ${custom.appBarHeight}px)`,
    border: 'none',
  },
}));

const SidetrackQuest = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const card = useCard();

  // This is here to trigger a reload when the sidepanel changes so we can
  // focus the APP
  const open = useSelector((state) => state.ui.sidePanelOpen);

  const {
    quest, dialogue, choices, setCurrentChoice, hasEnded, restartQuest,
  } = useQuest(questContent);

  const [lastDialog, setLastDialog] = useState(0);
  const [attractFTH, setAttractFTH] = useState(false);

  const [hasLockKey, setHasLockKey] = useState(false);
  const [isLocked, setIsLocked] = useState(true);

  const [mute, setMute] = useState(false);

  const questRef = useRef(quest);
  const appRef = useRef(null);

  const focusApp = () => {
    if (appRef.current) {
      appRef.current.focus();
    }
  };

  useEffect(() => {
    focusApp();
  }, [open]);

  useEffect(() => {
    const updateQuestVariables = (params) => {
      const currentQuest = questRef.current;
      // Expose some game variables to the quest
      let questUpdated = false;
      if (params.currentLevel !== currentQuest.getStoryVariable('currentLevel')) {
        currentQuest.updateStoryVariable('currentLevel', params.currentLevel);
        questUpdated = true;
      }
      if (params.success !== Boolean(currentQuest.getStoryVariable('success'))) {
        currentQuest.updateStoryVariable('success', params.success);
        questUpdated = true;
      }
      if (params.playing !== Boolean(currentQuest.getStoryVariable('playing'))) {
        currentQuest.updateStoryVariable('playing', params.playing);
        questUpdated = true;
      }
      if (params.controlsCutscene !== Boolean(currentQuest.getStoryVariable('controlsCutscene'))) {
        currentQuest.updateStoryVariable('controlsCutscene', params.controlsCutscene);
        questUpdated = true;
      }
      if (params.escapeCutscene !== Boolean(currentQuest.getStoryVariable('escapeCutscene'))) {
        currentQuest.updateStoryVariable('escapeCutscene', params.escapeCutscene);
        questUpdated = true;
      }

      // Only update quest if some variable changes, to avoid infinite loop
      if (questUpdated) {
        setCurrentChoice(undefined);
      }
    };

    const changeCallback = (params, firstTime = false) => {
      const app = appRef.current;

      if (!app) {
        return;
      }

      const level = app.contentWindow[`globalLevel${params.currentLevel}Parameters`];

      if (questRef.current) {
        try {
          validateInstructions(level.instructionCode);
          validateLevel(level.levelCode);
          questRef.current.updateStoryVariable('codeErrors', false);
          setCurrentChoice(undefined);
        } catch (e) {
          questRef.current.updateStoryVariable('codeErrors', true);
          setCurrentChoice(undefined);
        }
      }

      const code = {
        instructionCode: level.instructionCode,
        levelCode: level.levelCode,
        robotADirection: level.robotADirection,
        robotBDirection: level.robotBDirection,
      };
      const state = { ...params, ...code };
      dispatch(actions.hackableAppSet(state));
      if (firstTime) {
        const initialState = { ...state, startLevel: state.highestAchievedLevel };
        dispatch(actions.originalHackableAppSet(initialState));
      } else {
        updateQuestVariables(params);
      }
    };

    const loadState = () => {
      const app = appRef.current;

      const { readyState } = app.contentDocument;
      if (readyState !== 'complete' || !app.contentWindow.loadState) {
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

      const currentQuest = questRef.current;
      // starting at level defined on the quest
      const state = {
        highestAchievedLevel: currentQuest.getStoryVariable('highestAchievedLevel'),
        availableLevels: currentQuest.getStoryVariable('availableLevels'),
        levelParameters: [],
      };
      app.contentWindow.loadState(state);

      setLastDialog(currentQuest.dialogueId);
    };

    // Creates a proxy to track iframe globalParameters
    proxyApp('globalParameters', changeCallback);
    loadState();

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

    focusApp();

    return store.subscribe(handleChange);
  }, [dispatch, setCurrentChoice]);

  // Update the app when the quest changes some variable
  useEffect(() => {
    const currentQuest = questRef.current;

    // If the quest doesn't changed we shouldn't update the variables to avoid
    // race condition with app updating the quest variables.
    // Variables in the quest can only change if the quest advances.
    if (currentQuest.dialogueId === lastDialog) {
      return;
    }

    setLastDialog(currentQuest.dialogueId);

    const params = {
      startLevel: currentQuest.getStoryVariable('startLevel'),
      highestAchievedLevel: currentQuest.getStoryVariable('highestAchievedLevel'),
      availableLevels: currentQuest.getStoryVariable('availableLevels'),
      controlsCutscene: currentQuest.getStoryVariable('controlsCutscene'),
      escapeCutscene: currentQuest.getStoryVariable('escapeCutscene'),
    };
    updateApp('globalParameters', params);

    setAttractFTH(Boolean(currentQuest.getStoryVariable('attractFTH')));
    setHasLockKey(Boolean(currentQuest.getStoryVariable('hasLockKey')));

    focusApp();
  }, [lastDialog, dialogue]);

  const onUnlock = () => {
    setIsLocked(false);
    questRef.current.updateStoryVariable('isLocked', false);
    setCurrentChoice(undefined);
  };

  const toolbox = (
    <LockScreen
      screen="lock.sidetrack.1"
      locked={isLocked}
      hasKey={hasLockKey}
      onUnlock={onUnlock}
    >
      <Toolbox />
    </LockScreen>
  );

  const canvas = (
    <iframe
      id="app"
      ref={appRef}
      title="Fizzics App"
      className={classes.frame}
      src="/apps/hack-toy-apps/com.hack_computer.Sidetrack/app/index.html"
      sandbox="allow-same-origin allow-scripts"
    />
  );

  const restartApp = () => {
    const { originalHackableApp } = store.getState();
    const { startLevel, highestAchievedLevel } = originalHackableApp;
    const app = appRef.current.contentWindow;

    app.globalParameters.highestAchievedLevel = highestAchievedLevel;
    const level = app[`globalLevel${startLevel}Parameters`];
    app.game.scene.start('Game', level);
  };

  const onRestartSelected = () => {
    restartQuest();
    restartApp();
    focusApp();
  };

  const onFlipped = (f) => {
    quest.updateStoryVariable('flipped', f);
    setCurrentChoice(undefined);
    focusApp();
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

  const toggleMute = () => {
    const app = appRef.current;
    if (!app) {
      return;
    }

    // mute/unmute all sounds
    SidetrackSounds.forEach((s) => {
      const audio = app.contentDocument.getElementById(s);
      audio.muted = !mute;
    });

    setMute(!mute);
    focusApp();
  };

  const controls = (
    <Box m={1}>
      <Fab
        color="primary"
        aria-label="Mute volume"
        edge="end"
        size="medium"
        onClick={toggleMute}
      >
        { mute ? <VolumeOff /> : <VolumeUp /> }
      </Fab>
    </Box>
  );

  return (
    <TestWrapper>
      <QuestFTHView
        toolbox={toolbox}
        canvas={canvas}
        sidebar={sidebar}
        title={card.name}
        subtitle={card.subtitle}
        attractFTH={attractFTH}
        onFlipped={onFlipped}
        controls={controls}
        hideControls={false}
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
