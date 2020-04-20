import { hot } from 'react-hot-loader';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Fab,
  makeStyles,
} from '@material-ui/core';

import {
  SettingsBackupRestore,
} from '@material-ui/icons';

import TestWrapper from './test-wrapper';
import Dialogue, { useQuest } from '../dialogue';
import { useCardInfo } from '../hack-card';
import QuestFTHView from '../quest-fth-view';
import questContent from './p5-quest.ink';

import store, { actions } from '../../store';
import { proxyApp, updateApp } from '../toolbox/tools';
import Toolbox from '../toolbox/p5';

const useStyles = makeStyles({
  root: {
  },
  frame: {
    width: '100%',
    height: '100vh',
    border: 'none',
  },
});

const P5Quest = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { title } = useCardInfo();

  const [firstTimeCode, setFirstTimeCode] = useState(true);

  const {
    quest, dialogue, choices, setCurrentChoice, hasEnded, restartQuest,
  } = useQuest(questContent);

  const updateQuestCode = (value) => {
    quest.updateStoryVariable('code', value);
    setCurrentChoice(undefined);
  };

  useEffect(() => {
    const changeCallback = (params, firstTime = false) => {
      dispatch(actions.hackableAppSet(params));
      if (firstTime && firstTimeCode) {
        dispatch(actions.originalHackableAppSet(params));
        setFirstTimeCode(false);
      }
    };

    // Creates a proxy to track iframe globalParameters
    proxyApp('globalParameters', changeCallback);

    const handleChange = () => {
      updateApp('globalParameters', store.getState().hackableApp, (prop, value) => {
        if (prop === 'code') {
          const app = document.querySelector('#app');
          app.contentWindow.reload();

          updateQuestCode(value);
        }
      });
    };
    return store.subscribe(handleChange);
  });

  const resetToolbox = () => {
    const { originalHackableApp } = store.getState();
    dispatch(actions.hackableAppSet(originalHackableApp));
  };

  const toolbox = <Toolbox />;

  const canvas = (
    <iframe
      id="app"
      title="P5.js sandbox"
      className={classes.frame}
      src="/apps/p5/index.html"
      sandbox
    />
  );

  const onRestartSelected = () => {
    resetToolbox();
    restartQuest();
  };

  const sidebar = (
    <Dialogue
      dialogue={dialogue}
      choices={choices}
      onChoiceSelected={setCurrentChoice}
      onRestartSelected={onRestartSelected}
      hasEnded={hasEnded}
    />
  );

  const controls = (
    <Box m={1}>
      <Fab
        color="secondary"
        aria-label="Reset toolbox"
        edge="end"
        size="medium"
        onClick={resetToolbox}
      >
        <SettingsBackupRestore />
      </Fab>
    </Box>
  );

  /* p5.js captures all movements so we need to avoid to hide controls to make it visible */
  return (
    <QuestFTHView
      toolbox={toolbox}
      canvas={canvas}
      sidebar={sidebar}
      controls={controls}
      hideControls={false}
      sideBySide
      title={title}
    />
  );
};

const WrappedQuest = () => (
  <TestWrapper>
    <P5Quest />
  </TestWrapper>
);

const App = hot(module)(WrappedQuest);

export { App as default, P5Quest };
