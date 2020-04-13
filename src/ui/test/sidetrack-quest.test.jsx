import { hot } from 'react-hot-loader';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TestWrapper from './test-wrapper';
import QuestFTHView from '../quest-fth-view';

import store, { actions } from '../../store';
import { proxyApp, updateApp } from '../toolbox/tools';
import Toolbox from '../toolbox/sidetrack';

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

  useEffect(() => {
    const app = document.querySelector('#app');

    const changeCallback = (params, firstTime = false) => {
      const level = app.contentWindow[`globalLevel${params.currentLevel}Parameters`];
      const code = {
        instructionCode: level.instructionCode,
        levelCode: level.levelCode,
        robotADirection: level.robotADirection,
        robotBDirection: level.robotBDirection,
      };
      const state = { ...params, ...code };
      dispatch(actions.hackableAppSet(state));
      if (firstTime) {
        dispatch(actions.originalHackableAppSet(state));
      }
    };

    // Creates a proxy to track iframe globalParameters
    proxyApp('globalParameters', changeCallback);

    const loadState = () => {
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

      // fake Sound
      app.contentWindow.Sounds = {
        play: () => {},
        stop: () => {},
        playLoop: () => {},
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

      // starting at level 7, just to show how to do that for the quest
      setTimeout(() => {
        app.contentWindow.globalParameters.highestAchievedLevel = 7;
        app.contentWindow.globalParameters.availableLevels = 23;
        app.contentWindow.globalParameters.startLevel = 7;
      }, 5000);
    };
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
    return store.subscribe(handleChange);
  });

  const toolbox = <Toolbox />;

  const canvas = (
    <iframe
      id="app"
      title="Fizzics App"
      className={classes.frame}
      src="/apps/hack-toy-apps/com.hack_computer.Sidetrack/app/index.html"
    />
  );

  const sidebar = (
    <List>
      <ListItem>
        <ListItemText
          primary="This is a line of dialogue."
          secondary="Ada"
          primaryTypographyProps={{
            variant: 'body2',
          }}
        />
      </ListItem>
    </List>
  );

  return (
    <TestWrapper>
      <QuestFTHView
        toolbox={toolbox}
        canvas={canvas}
        sidebar={sidebar}
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
