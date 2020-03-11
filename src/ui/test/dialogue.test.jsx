import { hot } from 'react-hot-loader';
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Switch,
} from '@material-ui/core';

import TestWrapper from './test-wrapper';
import Dialogue from '../dialogue';
import QuestFTHView from '../quest-fth-view';
import Quest from '../../libquest';
import questContent from './my-quest.ink';

const App = () => {
  const [quest] = useState(new Quest(questContent));

  const [dialogue, setDialogue] = useState([]);
  const [choices, setChoices] = useState([]);
  const [currentChoice, setCurrentChoice] = useState(null);

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

  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
  });

  useEffect(() => {
    const goalReached = (state.checkedA && state.checkedB) ? 1 : 0;
    quest.updateStoryVariable('goal_reached', goalReached);
  }, [state, quest]);

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleFlipped = (flipped) => {
    quest.updateStoryVariable('flipped', flipped);
    setCurrentChoice(undefined);
  };

  const handleChoiceSelected = (choice) => {
    setCurrentChoice(choice);
  };

  const toolbox = (
    <div>
      <Typography variant="h4">This is the toolbox</Typography>
      <Switch
        checked={state.checkedA}
        onChange={handleChange('checkedA')}
        value="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      <Switch
        checked={state.checkedB}
        onChange={handleChange('checkedB')}
        value="checkedB"
        color="primary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </div>
  );

  const sidebar = (
    <Dialogue
      dialogue={dialogue}
      choices={choices}
      onChoiceSelected={handleChoiceSelected}
    />
  );

  return (
    <TestWrapper>
      <QuestFTHView
        toolbox={toolbox}
        canvas={<div style={{ backgroundColor: '#0ff', width: '100%', height: '100%' }} />}
        sidebar={sidebar}
        onFlipped={handleFlipped}
      />
    </TestWrapper>
  );
};

export default hot(module)(App);
