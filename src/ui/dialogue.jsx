import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Box,
  makeStyles,
  Fade,
  useTheme,
  SvgIcon,
} from '@material-ui/core';

import {
  Home, Refresh,
} from '@material-ui/icons';

import ThumbsUpIcon from './icons/hack-thumbsup-symbolic.svg';
import ThumbsDownIcon from './icons/hack-thumbsdown-symbolic.svg';
import NextIcon from './icons/hack-next-symbolic.svg';
import PreviousIcon from './icons/hack-previous-symbolic.svg';

import { actions } from '../store';
import { cardType } from './types';
import Quest from '../libquest';
import ChatMessage from './chat-message';
import SidePanel from './side-panel';
import {
  MainButton, MainIconButton,
} from './main-button';

const iconsByEmoji = {
  '❯': NextIcon,
  '❮': PreviousIcon,
  '👍': ThumbsUpIcon,
  '👎': ThumbsDownIcon,
};

const useStyles = makeStyles(({ spacing }) => ({
  scrollRef: {
    float: 'left',
    clear: 'both',
  },
  button: {
    margin: spacing(0.5),
  },
}));

const Dialogue = ({
  dialogue, choices, onChoiceSelected, onRestartSelected, hasEnded, card,
}) => {
  const classes = useStyles();
  const scrollTimeout = useRef(null);
  const [bubbleAnimationCount, setBubbleAnimationCount] = useState(0);
  const bubbleAnimationInterval = useRef(null);
  const messagesEndRef = useRef(null);

  const theme = useTheme();

  useEffect(() => {
    // Scroll down when the dialogue changes.
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, theme.transitions.duration.bubbleAnimation);

    return () => {
      clearTimeout(scrollTimeout.current);
    };
  }, [dialogue, theme.transitions.duration.bubbleAnimation]);

  useEffect(() => {
    // Run the animation for dialogue bubbles appearing:
    clearInterval(bubbleAnimationInterval.current);
    bubbleAnimationInterval.current = setInterval(() => {
      if (bubbleAnimationCount <= dialogue.length) {
        setBubbleAnimationCount(bubbleAnimationCount + 1);
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, theme.transitions.duration.bubbleAnimation);

    return () => {
      clearInterval(bubbleAnimationInterval.current);
    };
  }, [dialogue, bubbleAnimationCount, theme.transitions.duration.bubbleAnimation]);

  const getChoiceButton = (choice) => {
    if (choice.text in iconsByEmoji) {
      return (
        <MainIconButton
          key={choice.index}
          size="medium"
          attracting={choice.modifiers.attracting}
          className={classes.button}
          onClick={() => onChoiceSelected(choice)}
        >
          <SvgIcon component={iconsByEmoji[choice.text]} viewBox="0 0 16 16" />
        </MainIconButton>
      );
    }

    return (
      <MainButton
        key={choice.index}
        variant="contained"
        size="large"
        className={classes.button}
        onClick={() => onChoiceSelected(choice)}
      >
        {choice.text}
      </MainButton>
    );
  };

  const endChoices = (
    <>
      <MainIconButton
        size="medium"
        className={classes.button}
        component={RouterLink}
        to="/"
      >
        <Home />
      </MainIconButton>
      <MainIconButton
        size="medium"
        className={classes.button}
        onClick={onRestartSelected}
      >
        <Refresh />
      </MainIconButton>
    </>
  );

  const chatMessages = dialogue.map((d, i) => (
    <Fade
      key={d.id}
      in={i < bubbleAnimationCount}
      timeout={theme.transitions.duration.bubbleAnimation}
    >
      <ChatMessage
        side={d.character === 'user' ? 'right' : 'left'}
        avatar={`/assets/avatars/${d.character}.svg`}
        messages={[d]}
        typing={d.character !== 'user' && i >= (bubbleAnimationCount - 1)}
      />
    </Fade>
  )).slice(0, bubbleAnimationCount);


  const content = (
    <>
      <div
        style={{ marginTop: 'auto' }}
      />
      <Box width="100%">
        {chatMessages}
      </Box>
      <div
        className={classes.scrollRef}
        ref={messagesEndRef}
      />
    </>
  );

  const buttons = hasEnded ? endChoices : (
    <>
      {(bubbleAnimationCount <= dialogue.length) ? null : (
        choices.map((choice) => getChoiceButton(choice))
      )}
    </>
  );

  return <SidePanel content={content} buttons={buttons} card={card} />;
};

Dialogue.propTypes = {
  dialogue: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
  })).isRequired,
  choices: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.number,
    text: PropTypes.string,
  })).isRequired,
  onChoiceSelected: PropTypes.func,
  onRestartSelected: PropTypes.func,
  hasEnded: PropTypes.bool,
  card: cardType,
};

Dialogue.defaultProps = {
  onChoiceSelected: null,
  onRestartSelected: null,
  hasEnded: false,
  card: null,
};

function useQuest(questContent) {
  const [quest] = useState(new Quest(questContent));
  const [dialogue, setDialogue] = useState([]);
  const [choices, setChoices] = useState([]);
  const [currentChoice, setCurrentChoice] = useState(null);
  const [hasEnded, setHasEnded] = useState(false);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const updateDialogueChoices = () => {
    const { dialogue: dia, choices: cho } = quest.continueStory();
    setDialogue((oldDialogue) => [...oldDialogue, ...dia]);
    setChoices(cho);
    if (quest.hasEnded()) {
      setHasEnded(true);
    }
    dispatch(actions.sidePanelSetOpen());
  };

  useEffect(() => {
    if (quest === undefined) return;
    // Update language global variable if needed:
    if (quest.getStoryVariable('language')) {
      quest.updateStoryVariable('language', i18n.language);
    }
    // Initial setup of dialogue and choices:
    updateDialogueChoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quest]);

  useEffect(() => {
    // Update dialogue and choices when a choice is selected.

    if (quest === undefined) return;
    if (currentChoice === null) return;

    if (currentChoice !== undefined) {
      quest.choose(currentChoice);
    }

    updateDialogueChoices();
    setCurrentChoice(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quest, choices, currentChoice]);

  const restartQuest = () => {
    quest.restart();
    setDialogue([]);
    setChoices([]);
    setCurrentChoice(null);
    setHasEnded(false);
    updateDialogueChoices();
  };

  return {
    quest, dialogue, choices, setCurrentChoice, hasEnded, restartQuest,
  };
}

export { Dialogue as default, useQuest };
