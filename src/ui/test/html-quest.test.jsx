import { hot } from 'react-hot-loader';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  makeStyles,
} from '@material-ui/core';

import TestWrapper from './test-wrapper';
import Dialogue from '../dialogue';
import QuestFTHView from '../quest-fth-view';
import Quest from '../../libquest';
import questContent from './html1-quest.ink';

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
  const [quest] = useState(new Quest(questContent));
  const [firstTimeCode, setFirstTimeCode] = useState(true);

  const [dialogue, setDialogue] = useState([]);
  const [choices, setChoices] = useState([]);
  const [currentChoice, setCurrentChoice] = useState(null);

  useEffect(() => {
    // Initial setup of dialogue and choices.

    if (quest === undefined) return;

    const { dialogue: dia, choices: cho } = quest.continueStory();
    setDialogue((oldDialogue) => [...oldDialogue, ...dia]);
    setChoices(cho);
  }, [quest]);

  useEffect(() => {
    // Update dialogue and choices when a choice is selected.

    if (quest === undefined) return;
    if (currentChoice === null) return;

    if (currentChoice !== undefined) {
      quest.choose(choices[currentChoice.index]);
    }

    // FIXME this is duplicated
    const { dialogue: dia, choices: cho } = quest.continueStory();
    setDialogue((oldDialogue) => [...oldDialogue, ...dia]);
    setChoices(cho);

    setCurrentChoice(null);
  }, [quest, choices, currentChoice]);

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
  }, [firstTimeCode, dispatch, quest]);

  const handleChoiceSelected = (choice) => {
    setCurrentChoice(choice);
  };

  const toolbox = <Toolbox />;

  const sidebar = (
    <Dialogue
      dialogue={dialogue}
      choices={choices}
      onChoiceSelected={handleChoiceSelected}
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
