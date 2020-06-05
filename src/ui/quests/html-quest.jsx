import { hot } from 'react-hot-loader';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import {
  Box,
  makeStyles,
} from '@material-ui/core';

import TestWrapper from './test-wrapper';
import Dialogue, { useQuest } from '../dialogue';
import { useCard } from '../hack-card';
import QuestFTHView from '../quest-fth-view';
import ReloadButton from '../reload-button';
import questContent from './html-quest.ink';

import store, { actions, setGameState } from '../../store';
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

  const {
    quest, dialogue, choices, setCurrentChoice, hasEnded, restartQuest,
  } = useQuest(questContent);

  const errorsRef = useRef(null);
  const setErrors = (e) => {
    errorsRef.current = e;
  };

  useEffect(() => {
    const now = new Date();
    setGameState('quest.Web/last_launch_date', `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`);
  }, []);

  useEffect(() => {
    const changeCallback = (params, firstTime = false) => {
      if (firstTime) {
        // only update the toolbox code editor the first time
        dispatch(actions.hackableAppSet(params));
        dispatch(actions.originalHackableAppSet(params));
      }
    };

    // Creates a proxy to track iframe globalParameters
    proxyApp('globalParameters', changeCallback);

    const handleChange = () => {
      if (errorsRef.current && errorsRef.current.length) {
        // Do not update the app when there are errors in the code!
        return;
      }

      updateApp('globalParameters', store.getState().hackableApp, (prop, value) => {
        if (prop === 'html' || prop === 'css') {
          const app = document.querySelector('#app');
          app.contentWindow.reload();

          quest.updateStoryVariable(prop, value);
          setCurrentChoice(undefined);
        }
      });
    };

    const unsubscribe = store.subscribe(handleChange);
    return () => {
      unsubscribe();
      // Reset hackableApp state on umount
      dispatch(actions.resetHackableApp());
    };
  }, [dispatch, quest, setCurrentChoice]);

  const toolbox = <Toolbox onErrors={setErrors} />;

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
      <ReloadButton onClick={resetToolbox} />
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
