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
import questContent from './html-quest.ink';

import store, { actions } from '../../store';
import { proxyApp, updateApp } from '../toolbox/tools';
import Toolbox from '../toolbox/html';

const useStyles = makeStyles({
  root: {
  },
  frame: {
    width: '100%',
    height: '100vh',
    border: 'none',
  },
});

const HtmlQuest = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const card = useCard();

  const [firstTimeCode, setFirstTimeCode] = useState(true);

  const {
    quest, dialogue, choices, setCurrentChoice, hasEnded, restartQuest,
  } = useQuest(questContent);

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

          quest.updateStoryVariable('code', value);
          setCurrentChoice(undefined);
        }
      });
    };
    return store.subscribe(handleChange);
  }, [firstTimeCode, dispatch, quest, setCurrentChoice]);

  const toolbox = <Toolbox />;

  const resetToolbox = () => {
    const { originalHackableApp } = store.getState();
    dispatch(actions.hackableAppSet(originalHackableApp));
  };

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

  const canvas = (
    <iframe
      id="app"
      title="HTML sandbox"
      className={classes.frame}
      src="/apps/html/index.html"
      sandbox="allow-same-origin allow-scripts"
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
    <HtmlQuest />
  </TestWrapper>
);

const App = hot(module)(WrappedQuest);

export { App as default, HtmlQuest };
