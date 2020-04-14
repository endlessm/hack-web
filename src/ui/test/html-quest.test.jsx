import { hot } from 'react-hot-loader';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  makeStyles,
} from '@material-ui/core';

import TestWrapper from './test-wrapper';
import Dialogue, { useQuest } from '../dialogue';
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

  const [firstTimeCode, setFirstTimeCode] = useState(true);

  const {
    quest, dialogue, choices, setCurrentChoice,
  } = useQuest(questContent);

  useEffect(() => {
    const changeCallback = (params, firstTime = false) => {
      window.hack = store;
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

          quest.updateStoryVariable('code', value);
          setCurrentChoice(undefined);
        }
      });
    };
    return store.subscribe(handleChange);
  }, [firstTimeCode, dispatch, quest, setCurrentChoice]);

  const toolbox = <Toolbox />;

  const sidebar = (
    <Dialogue
      dialogue={dialogue}
      choices={choices}
      onChoiceSelected={setCurrentChoice}
    />
  );

  const canvas = (
    <iframe
      id="app"
      title="HTML sandbox"
      className={classes.frame}
      src="/apps/html/index.html"
      sandbox
    />
  );

  return (
    <QuestFTHView
      toolbox={toolbox}
      canvas={canvas}
      sidebar={sidebar}
      sideBySide
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
