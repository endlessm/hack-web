import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Box,
  Button,
  Divider,
  Fade,
  useTheme,
} from '@material-ui/core';

import ChatMessage from './chat-message';

const useStyles = makeStyles(({ spacing, palette }) => ({
  dialogue: {
    height: '100%',
    backgroundColor: palette.background.default,
    overflowY: 'scroll',
  },
  choiceButton: {
    borderRadius: spacing(3),
  },
  scrollRef: {
    float: 'left',
    clear: 'both',
  },
}));

const Dialogue = ({
  dialogue, choices, onChoiceSelected,
}) => {
  const classes = useStyles();
  const [previousMessageLength, setPreviousMessageLength] = React.useState(dialogue.length);
  const [newMessagesLength, setNewMessagesLength] = React.useState(0);
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

  return (
    <>
      <Box className={classes.dialogue} p={2}>
        {dialogue.map((d, i) => (
          <Fade key={d.id} in timeout={getTimeout(i)}>
            <ChatMessage
              side={d.character === 'user' ? 'right' : 'left'}
              avatar={`/assets/pathways/${pathwayByCharacter[d.character]}-card-media.png`}
              messages={[d.text]}
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
        p={1}
        display="flex"
        bgcolor="secondary.main"
        justifyContent="center"
      >
        {choices.map((choice) => (
          <Button
            style={{ textTransform: 'none' }}
            key={choice.index}
            variant="contained"
            size="large"
            color="primary"
            className={classes.choiceButton}
            onClick={() => onChoiceSelected(choice)}
          >
            {choice.text}
          </Button>
        ))}
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
};

Dialogue.defaultProps = {
  onChoiceSelected: null,
};

export default Dialogue;
