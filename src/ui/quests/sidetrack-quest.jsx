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

import { hot } from 'react-hot-loader';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Fab,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReactGA from 'react-ga';

import {
  VolumeOff,
  VolumeUp,
} from '@material-ui/icons';

import TestWrapper from './test-wrapper';
import Dialogue, { useQuest } from '../dialogue';
import { useCard } from '../hack-card';
import QuestFTHView from '../quest-fth-view';
import ReloadButton from '../reload-button';
import questContent from './sidetrack-quest.ink';

import store, { actions, setGameState } from '../../store';
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

  useEffect(() => {
    const now = new Date();
    setGameState('quest.Sidetrack/last_launch_date', `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`);
  }, []);

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

  // FIXME, this is a copy of the same state as in the FlipToHack
  // component. In the future we should have two kind of controls: one
  // for the canvas and one for the toolbox.
  const [isFlipped, setFlipped] = useState(false);

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
        // Record the level completed event in metrics
        if (!params.playing && params.success) {
          ReactGA.event({
            category: 'User',
            action: 'Sidetrack level completed',
            value: params.currentLevel,
            label: `Sidetrack level completed: ${params.currentLevel}`,
          });
        }
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
        bgSound: null,
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
          if (app.contentWindow.Sounds.bgSound) {
            app.contentWindow.Sounds.stop(app.contentWindow.Sounds.bgSound);
          }
          app.contentWindow.Sounds.bgSound = sound;

          const audio = app.contentWindow.Sounds.getSound(sound);
          audio.setAttribute('loop', 'true');
          audio.currentTime = 0;
          audio.play();
        },
      };

      // fake pauseToyApp
      app.contentWindow.sleepScenes = () => {};
      app.contentWindow.needHackScreen = () => {};
      app.contentWindow.hideNeedHackScreen = () => {};
      if (app.contentWindow.game) {
        app.contentWindow.clearSleepTimer(app.contentWindow.game.pauseToyAppTimeout);
      }
      // force a call to wakeScenes to ensure that the game was not paused
      // before the function override
      app.contentWindow.wakeScenes();

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

      updateApp(`globalLevel${params.currentLevel}Parameters`, currentLevel, () => {
        changeCallback(params);
      });
    };

    focusApp();

    const unsubscribe = store.subscribe(handleChange);
    return () => {
      unsubscribe();
      // Reset hackableApp state on umount
      dispatch(actions.resetHackableApp());
    };
  }, [dispatch, setCurrentChoice]);

  // Update the app when the quest changes some variable
  useEffect(() => {
    const currentQuest = questRef.current;
    const app = appRef.current;

    // If the quest doesn't changed we shouldn't update the variables to avoid
    // race condition with app updating the quest variables.
    // Variables in the quest can only change if the quest advances.
    if (currentQuest.dialogueId === lastDialog) {
      return;
    }

    setLastDialog(currentQuest.dialogueId);

    const params = {
      availableLevels: currentQuest.getStoryVariable('availableLevels'),
      controlsCutscene: currentQuest.getStoryVariable('controlsCutscene'),
      escapeCutscene: currentQuest.getStoryVariable('escapeCutscene'),
    };

    // Only update startLevel if it's not 0 and if it's different from the current one
    const startLevel = currentQuest.getStoryVariable('startLevel');
    if (app) {
      const gp = app.contentWindow.globalParameters;
      if (startLevel !== 0
          && startLevel !== gp.startLevel
          && startLevel !== gp.currentLevel) {
        params.startLevel = startLevel;
        params.highestAchievedLevel = startLevel;
      }
    }

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

  const resetAllLevels = () => {
    const app = appRef.current.contentWindow;
    Array.from({ length: app.globalParameters.highestAchievedLevel + 1 })
      .forEach((v, i) => {
        const level = app.defaultLevelParameters.find((l) => l.level === i);
        if (level) {
          app[`globalLevel${i}Parameters`].instructionCode = level.instructionCode;
          app[`globalLevel${i}Parameters`].levelCode = level.levelCode;
        }
      });
  };

  const restartApp = () => {
    const { originalHackableApp } = store.getState();
    const { startLevel, highestAchievedLevel } = originalHackableApp;
    const app = appRef.current.contentWindow;

    resetAllLevels();
    app.globalParameters.highestAchievedLevel = highestAchievedLevel;
    app.globalParameters.startLevel = startLevel;
  };

  const onRestartSelected = () => {
    restartQuest();
    restartApp();
    focusApp();
  };

  const resetToolbox = () => {
    const app = appRef.current.contentWindow;
    const { currentLevel } = app.globalParameters;
    const level = app.defaultLevelParameters.find((l) => l.level === currentLevel);
    if (level) {
      dispatch(actions.hackableAppSetParam('instructionCode', level.instructionCode));
      dispatch(actions.hackableAppSetParam('levelCode', level.levelCode));
    }
  };

  const onFlipped = (f) => {
    setFlipped(f);
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
    <>
      {!isFlipped && (
        <Box m={1}>
          <Fab
            color="secondary"
            aria-label="Mute volume"
            edge="end"
            size="medium"
            disabled={isFlipped}
            onClick={toggleMute}
          >
            { mute ? <VolumeOff /> : <VolumeUp /> }
          </Fab>
        </Box>
      )}
      {isFlipped && !isLocked && (
        <Box m={1}>
          <ReloadButton onClick={resetToolbox} />
        </Box>
      )}
    </>
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
