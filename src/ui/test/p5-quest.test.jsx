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
import { useCard } from '../hack-card';
import QuestFTHView from '../quest-fth-view';
import questContent from './p5-quest.ink';

import store, { actions } from '../../store';
import { proxyApp, updateApp } from '../toolbox/tools';
import Toolbox from '../toolbox/p5';

const useStyles = makeStyles(({ custom, palette }) => ({
  frame: {
    width: '100%',
    // Top bar size
    height: `calc(100vh - ${custom.appBarHeight}px)`,
    border: 'none',
    backgroundColor: palette.grey[500],
  },
}));

const P5Quest = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const card = useCard();

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
      if (firstTime && firstTimeCode) {
        // only update the toolbox code editor the first time
        dispatch(actions.hackableAppSet(params));
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
      sandbox="allow-same-origin allow-scripts"
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
      card={card}
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
      title={card.name}
      subtitle={card.subtitle}
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
