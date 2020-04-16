import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import {
  makeStyles,
  Box,
  Button,
  Divider,
  Fade,
  IconButton,
  SvgIcon,
  useTheme,
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

const iconsByEmoji = {
  '❯': NextIcon,
  '❮': PreviousIcon,
  '👍': ThumbsUpIcon,
  '👎': ThumbsDownIcon,
};

const useStyles = makeStyles(({
  custom, shadows, spacing, palette, transitions,
}) => ({
  dialogue: {
    height: '100%',
    backgroundColor: palette.background.default,
    overflowY: 'scroll',
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
  },
  choiceButton: {
    color: palette.common.white,
    background: `linear-gradient(to right, ${palette.common.hackGreen}, ${palette.common.hackGreenGradient})`,
    margin: spacing(0.5),
  },
  choiceButtonRoot: {
    borderRadius: spacing(3),
    whiteSpace: 'nowrap',
  },
  choiceButtonLabel: {
    textTransform: 'none',
    textShadow: custom.hackButtonTextShadow,
  },
  choiceButtonIcon: {
    boxShadow: shadows[2],
    transition: `box-shadow ${transitions.duration.short}ms ${transitions.easing.easeInOut} 0ms`,
    '&:hover': {
      boxShadow: shadows[4],
    },
  },
  choiceButtonIconSvg: {
    filter: `drop-shadow(${custom.hackButtonTextShadow})`,
  },
  scrollRef: {
    float: 'left',
    clear: 'both',
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

  // FIXME, this is to reuse the character assets for avatars. These
  // are just placeholders for now:
  const pathwayByCharacter = {
    ada: 'games',
    riley: 'web',
    saniel: 'os',
    faber: 'maker',
  };

  const theme = useTheme();
  const getTimeout = (i) => (
    theme.transitions.duration.complex * (i - dialogue.length + newMessagesLength + 1)
  );

  const getChoiceButton = (choice) => {
    if (choice.text in iconsByEmoji) {
      return (
        <IconButton
          key={choice.index}
          size="medium"
          className={clsx(classes.choiceButton, classes.choiceButtonIcon)}
          onClick={() => onChoiceSelected(choice)}
        >
          <SvgIcon component={iconsByEmoji[choice.text]} className={classes.choiceButtonIconSvg} viewBox="0 0 16 16" />
        </IconButton>
      );
    }

    return (
      <Button
        key={choice.index}
        variant="contained"
        size="large"
        className={classes.choiceButton}
        classes={{
          root: classes.choiceButtonRoot,
          label: classes.choiceButtonLabel,
        }}
        onClick={() => onChoiceSelected(choice)}
      >
        {choice.text}
      </Button>
    );
  };

  const endChoices = (
    <>
      <IconButton
        size="medium"
        className={clsx(classes.choiceButton, classes.choiceButtonIcon)}
        component={RouterLink}
        to="/"
      >
        <Home />
      </IconButton>
      <IconButton
        size="medium"
        className={clsx(classes.choiceButton, classes.choiceButtonIcon)}
        onClick={onRestartSelected}
      >
        <Refresh />
      </IconButton>
    </>
  );

  return (
    <>
      <Box className={classes.dialogue} px={1} py={2}>
        <div
          style={{ marginTop: 'auto' }}
        />
        {dialogue.map((d, i) => (
          <Fade
            key={d.id}
            in
            timeout={getTimeout(i)}
          >
            <ChatMessage
              side={d.character === 'user' ? 'right' : 'left'}
              avatar={`/assets/pathways/${pathwayByCharacter[d.character]}-card-media.png`}
              messages={[d]}
            />
          </Fade>
        ))}
        <div
          className={classes.scrollRef}
          ref={messagesEndRef}
        />
      </Box>
      <Divider />
      <Box
        m={1}
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-end"
      >
        {hasEnded ? (
          endChoices
        ) : (
          choices.map((choice) => getChoiceButton(choice))
        )}
      </Box>
    </>
  );
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
