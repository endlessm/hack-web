import { hot } from 'react-hot-loader';
import React, {
  useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import {
  Box,
  CssBaseline,
  Divider,
  Fab,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core';

import {
  Fullscreen,
  FullscreenExit,
  ZoomIn,
  ZoomOut,
} from '@material-ui/icons';

import { Document, Page } from 'react-pdf';

import '../app.css';
import 'typeface-roboto';
import Dialogue from '../dialogue';
import QuestFTHView from '../quest-fth-view';
import Quest from '../../libquest';
import theme from '../theme';

// eslint-disable-next-line import/newline-after-import
import questContent from './maker-make-change.ink';
const questName = 'maker-make-change';

const useStyles = makeStyles(({ palette, shadows, spacing }) => ({
  documentContainer: {
    height: '100%',
    overflowY: 'scroll',
    backgroundColor: palette.grey[500],
    '& .react-pdf__Page canvas': {
      margin: `${spacing(1)}px auto`,
      boxShadow: shadows[12],
    },
  },
}));

const App = () => {
  const classes = useStyles();

  const [quest] = useState(new Quest(questContent));

  const [dialogue, setDialogue] = useState([]);
  const [choices, setChoices] = useState([]);
  const [currentChoice, setCurrentChoice] = useState(null);

  const [state, setState] = useState({
    scale: null,
    width: null,
    height: null,
    numPages: null,
    fullscreen: false,
    originalWidth: 0,
    originalHeight: 0,
    // FIXME remove these from state? I'm now passing them always from the ref
    availableWidth: 0,
    availableHeight: 0,
  });

  const ref = useRef(null);

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

  const fitPageToCanvas = ({ availableHeight }) => ({
    // FIXME: use originalWidth originalHeight
    // For now just fit to page height (it should fit to max(width, height).
    width: null, height: availableHeight, scale: 1,
  });

  const fitWidthToCanvas = ({ availableWidth }) => ({
    width: availableWidth, height: null, scale: 1,
  });

  const getRefDimentions = () => ({
    availableWidth: ref.current.clientWidth,
    availableHeight: ref.current.clientHeight - theme.spacing(2),
  });

  useLayoutEffect(() => {
    const dimentions = getRefDimentions();
    setState((oldState) => ({
      ...oldState,
      ...dimentions,
      ...fitPageToCanvas(dimentions),
    }));
  }, []);

  const handleFlipped = (flipped) => {
    quest.updateStoryVariable('flipped', flipped);
    setCurrentChoice(undefined);
  };

  const handleChoiceSelected = (choice) => {
    setCurrentChoice(choice);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setState((oldState) => ({ ...oldState, numPages }));
  };

  const onPageLoadSuccess = ({ pageIndex, originalWidth, originalHeight }) => {
    if (pageIndex !== 0) return;
    setState((oldState) => ({ ...oldState, originalWidth, originalHeight }));
  };

  const onZoomIn = () => {
    setState((oldState) => ({ ...oldState, scale: oldState.scale * 1.1 }));
  };

  const onZoomOut = () => {
    setState((oldState) => ({ ...oldState, scale: oldState.scale * 0.9 }));
  };

  const onSwitchFullscreen = () => {
    const dimentions = getRefDimentions();
    setState((oldState) => {
      const scaleInfo = oldState.fullscreen
        ? fitPageToCanvas(dimentions)
        : fitWidthToCanvas(dimentions);
      return { ...oldState, fullscreen: !oldState.fullscreen, ...scaleInfo };
    });
  };

  const sidebar = (
    <Dialogue
      dialogue={dialogue}
      choices={choices}
      onChoiceSelected={handleChoiceSelected}
    />
  );

  const canvas = (
    <Box ref={ref} className={classes.documentContainer}>
      <Document
        file={`/assets/covid-demo/${questName}.pdf`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(
          new Array(state.numPages),
          (el, index) => (
            <Page
              key={`page_${index + 1}`}
              scale={state.scale}
              width={state.width}
              height={state.height}
              onLoadSuccess={onPageLoadSuccess}
              pageNumber={index + 1}
            />
          ),
        )}
      </Document>
    </Box>
  );

  const controls = (
    <>
      <Box m={1}>
        <Fab
          color="secondary"
          aria-label="switch fullscreen"
          edge="end"
          size="medium"
          onClick={onSwitchFullscreen}
        >
          {state.fullscreen ? <FullscreenExit /> : <Fullscreen />}
        </Fab>
      </Box>
      <Divider />
      <Box m={1}>
        <Fab
          color="secondary"
          aria-label="zoom out"
          edge="end"
          size="medium"
          onClick={onZoomOut}
        >
          <ZoomOut />
        </Fab>
      </Box>
      <Box m={1}>
        <Fab
          color="secondary"
          aria-label="zoom in"
          edge="end"
          size="medium"
          onClick={onZoomIn}
        >
          <ZoomIn />
        </Fab>
      </Box>
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QuestFTHView
        canvas={canvas}
        sidebar={sidebar}
        controls={controls}
        onFlipped={handleFlipped}
      />
    </ThemeProvider>
  );
};

export default hot(module)(App);
