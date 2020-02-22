import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  dialogue: {
    height: '100%',
    overflowY: 'scroll',
  },
  choiceButton: {
    textAlign: 'center',
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

  return (
    <>
      <List className={classes.dialogue}>
        {dialogue.map((d) => (
          <ListItem key={d.id}>
            <ListItemText
              secondary={d.character}
              primary={d.text}
              primaryTypographyProps={{
                variant: 'body2',
              }}
            />
          </ListItem>
        ))}
        <div
          className={classes.scrollRef}
          ref={messagesEndRef}
        />
      </List>
      <Divider />
      <List>
        {choices.map((choice) => (
          <ListItem
            button
            key={choice.index}
            onClick={() => onChoiceSelected(choice)}
          >
            <ListItemText
              className={classes.choiceButton}
              primary={choice.text}
              primaryTypographyProps={{
                color: 'secondary',
              }}
            />
          </ListItem>
        ))}
      </List>
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
