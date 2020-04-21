import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
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
  dialogue, choices, onChoiceSelected, onRestartSelected, hasEnded,
}) => {
  const classes = useStyles();
  const [previousMessageLength, setPreviousMessageLength] = useState(dialogue.length);
  const [newMessagesLength, setNewMessagesLength] = useState(0);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll down when the dialogue changes.
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });

    // Store how many dialogue bubbles were added, for fading:
    setPreviousMessageLength(dialogue.length);
    setNewMessagesLength(dialogue.length - previousMessageLength);

  // FIXME, useReducer?
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogue]);

  const theme = useTheme();
  const getTimeout = (i) => (
    theme.transitions.duration.complex * (i - dialogue.length + newMessagesLength + 1)
  );

  const getChoiceButton = (choice) => {
    if (choice.text in iconsByEmoji) {
      return (
        <MainIconButton
          key={choice.index}
          size="medium"
          onClick={() => onChoiceSelected(choice)}
        >
          <SvgIcon component={iconsByEmoji[choice.text]} viewBox="0 0 16 16" />
        </MainIconButton>
      );
    }

    // FIXME refactor ChoiceButton NOW
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
      in
      timeout={getTimeout(i)}
    >
      <ChatMessage
        side={d.character === 'user' ? 'right' : 'left'}
        avatar={`/assets/avatars/${d.character}.png`}
        messages={[d]}
      />
    </Fade>
  ));

  const content = (
    <>
      <div
        style={{ marginTop: 'auto' }}
      />
      {chatMessages}
      <div
        className={classes.scrollRef}
        ref={messagesEndRef}
      />
    </>
  );

  const buttons = hasEnded ? endChoices : choices.map((choice) => getChoiceButton(choice));

  return <SidePanel content={content} buttons={buttons} />;
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
};

Dialogue.defaultProps = {
  onChoiceSelected: null,
  onRestartSelected: null,
  hasEnded: false,
};

function useQuest(questContent) {
  const [quest] = useState(new Quest(questContent));
  const [dialogue, setDialogue] = useState([]);
  const [choices, setChoices] = useState([]);
  const [currentChoice, setCurrentChoice] = useState(null);
  const [hasEnded, setHasEnded] = useState(false);
  const dispatch = useDispatch();

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
    // Initial setup of dialogue and choices.
    if (quest === undefined) return;
    updateDialogueChoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quest]);

  useEffect(() => {
    // Update dialogue and choices when a choice is selected.

    if (quest === undefined) return;
    if (currentChoice === null) return;

    if (currentChoice !== undefined) {
      quest.choose(choices[currentChoice.index]);
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
