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
import { useSelector } from 'react-redux';
import React, {
  useLayoutEffect, useRef, useState, useEffect,
} from 'react';
import {
  Box,
  CircularProgress,
  Divider,
  makeStyles,
  useTheme,
} from '@material-ui/core';

import {
  Fullscreen,
  ZoomIn,
  ZoomOut,
} from '@material-ui/icons';

import { Document, Page } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';

import { setGameState } from '../../store';
import TestWrapper from './test-wrapper';
import Dialogue, { useQuest } from '../dialogue';
import { useCard } from '../hack-card';
import QuestFTHView from '../quest-fth-view';
import SecondaryIconButton from '../secondary-icon-button';
import questContent from './pdf-quest.ink';

const questName = 'maker-make-change';

const useStyles = makeStyles(({ custom, palette, shadows }) => ({
  documentContainer: {
    height: `calc(100vh - ${custom.appBarHeight}px)`,
    overflowY: 'scroll',
    backgroundColor: palette.grey[500],
    '& .react-pdf__Page canvas': {
      margin: '0 auto',
      boxShadow: shadows[12],
    },
  },
  spinnerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
}));

const PdfQuest = () => {
  const classes = useStyles();
  const card = useCard();

  useEffect(() => {
    const now = new Date();
    setGameState('quest.PDF/last_launch_date', `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`);
  }, []);

  const {
    quest, dialogue, choices, setCurrentChoice, hasEnded, restartQuest,
  } = useQuest(questContent);

  const open = useSelector((state) => state.ui.sidePanelOpen);

  const [state, setState] = useState({
    scale: null,
    width: null,
    height: null,
    numPages: null,
    fullscreen: true,
    originalWidth: 0,
    originalHeight: 0,
  });

  const ref = useRef(null);

  const fitWidthToCanvas = ({ availableWidth }) => ({
    width: availableWidth, height: null, scale: 1,
  });

  const getRefDimentions = () => ({
    availableWidth: ref.current.clientWidth,
    availableHeight: ref.current.clientHeight,
  });

  const { transitions } = useTheme();

  useLayoutEffect(() => {
    if (!state.fullscreen) {
      return;
    }
    setTimeout(() => {
      const dimentions = getRefDimentions();
      const scaleInfo = fitWidthToCanvas(dimentions);
      setState((oldState) => ({ ...oldState, ...scaleInfo }));
    }, transitions.duration.enteringScreen);
  }, [open, state.fullscreen, transitions.duration.enteringScreen]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    quest.updateStoryVariable('loaded', true);
    setCurrentChoice(undefined);
    setState((oldState) => ({ ...oldState, numPages }));
  };

  const onPageLoadSuccess = ({ pageIndex, originalWidth, originalHeight }) => {
    if (pageIndex !== 0) return;
    setState((oldState) => ({ ...oldState, originalWidth, originalHeight }));
  };

  const onZoomIn = () => {
    setState((oldState) => ({ ...oldState, fullscreen: false, scale: oldState.scale * 1.1 }));
  };

  const onZoomOut = () => {
    setState((oldState) => ({ ...oldState, fullscreen: false, scale: oldState.scale * 0.9 }));
  };

  const onSwitchFullscreen = () => {
    const dimentions = getRefDimentions();
    const scaleInfo = fitWidthToCanvas(dimentions);
    setState((oldState) => ({ ...oldState, fullscreen: true, ...scaleInfo }));
  };

  const onRestartSelected = () => {
    restartQuest();
    quest.updateStoryVariable('loaded', true);
    setCurrentChoice(undefined);
    // scroll to the top
    ref.current.scrollTop = 0;
    onSwitchFullscreen();
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

  const spinner = (
    <Box className={classes.spinnerContainer}>
      <CircularProgress />
    </Box>
  );

  const canvas = (
    <Box ref={ref} className={classes.documentContainer}>
      <Document
        loading={spinner}
        file={`assets/articles/${questName}.pdf`}
        onLoadSuccess={onDocumentLoadSuccess}
        externalLinkTarget="_blank"
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
        <SecondaryIconButton
          color="secondary"
          aria-label="switch fullscreen"
          size="medium"
          onClick={onSwitchFullscreen}
          disabled={state.fullscreen}
        >
          <Fullscreen />
        </SecondaryIconButton>
      </Box>
      <Divider />
      <Box m={1}>
        <SecondaryIconButton
          color="secondary"
          aria-label="zoom out"
          size="medium"
          onClick={onZoomOut}
        >
          <ZoomOut />
        </SecondaryIconButton>
      </Box>
      <Box m={1}>
        <SecondaryIconButton
          color="secondary"
          aria-label="zoom in"
          size="medium"
          onClick={onZoomIn}
        >
          <ZoomIn />
        </SecondaryIconButton>
      </Box>
    </>
  );

  return (
    <QuestFTHView
      canvas={canvas}
      sidebar={sidebar}
      controls={controls}
      title={card.name}
      subtitle={card.subtitle}
    />
  );
};

const WrappedQuest = () => (
  <TestWrapper>
    <PdfQuest />
  </TestWrapper>
);

const App = hot(module)(WrappedQuest);

export { App as default, PdfQuest };
