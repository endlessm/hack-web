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

  const resetToolbox = () => {
    const { originalHackableApp } = store.getState();
    dispatch(actions.hackableAppSet(originalHackableApp));
  };

  const controls = (
    <Box m={1}>
      <ReloadButton onClick={resetToolbox} />
    </Box>
  );

  const toolbox = <Toolbox onErrors={setErrors} controls={controls} />;

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

  return (
    <QuestFTHView
      toolbox={toolbox}
      canvas={canvas}
      sidebar={sidebar}
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
