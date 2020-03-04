import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Box,
  Button,


  Divider,
} from '@material-ui/core';

import ChatMessage from './chat-message';

const useStyles = makeStyles(() => ({
  dialogue: {
    height: '100%',
    backgroundColor: '#eee',
    overflowY: 'scroll',
  },
  choiceButton: {
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

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll down when the dialogue changes.
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [dialogue]);

  const pathwayByCharacter = {
    ada: 'games',
    riley: 'web',
    saniel: 'os',
    faber: 'maker',
  };

  return (
    <>
      <Box className={classes.dialogue} p={2}>
        {/* <ChatMessage
            avatar={''}
            messages={[
            'Hi Jenny, How r u today?',
            'Did you train yesterday',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.',
            ]}
            />
            <ChatMessage
            side={'right'}
            messages={[
            "Great! What's about you?",
            'Of course I did. Speaking of which check this out',
            ]}
            />
            <ChatMessage avatar={''} messages={['Im good.', 'See u later.']} /> */}
        {dialogue.map((d) => (
          <ChatMessage
            side={d.character === 'user' ? 'right' : 'left'}
            key={d.id}
            avatar={`/assets/pathways/${pathwayByCharacter[d.character]}-card-media.png`}
            messages={[d.text]}
          />
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
