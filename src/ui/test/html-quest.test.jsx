import { hot } from 'react-hot-loader';
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
} from '@material-ui/core';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-monokai';

import TestWrapper from './test-wrapper';
import Dialogue from '../dialogue';
import QuestFTHView from '../quest-fth-view';
import Quest from '../../libquest';
import questContent from './html1-quest.ink';

const HtmlQuest = () => {
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

  const [state, setState] = useState(`
<html> <!-- This tag tells the browser that this is an HTML document. That's a fancy way of saying it's a web page. -->
  <head> <!-- The <head> element is the header of the page. It contains everything that shows up at the very beginning of the page, like the page number and chapter name in a book. -->
  <title>This is a Test Web Page!</title>
  </head>
  <body> <!-- The <body> tag is what most people think of as the 'web page'.  <body> contains all the content you normally see, like text, links, and images. -->
  <h1>Welcome to my test website!</h1>
  <p>Hello, world!</p>
  </body> <!-- This is the closing tag for <body>. -->
</html> <!-- This is the closing tag for <html>, which means this is the end of the webpage. -->
`);

  useEffect(() => {
    quest.updateStoryVariable('code', state);
    setCurrentChoice(undefined);
  }, [state, quest]);

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
    </div>
  );

  const sidebar = (
    <Dialogue
      dialogue={dialogue}
      choices={choices}
      onChoiceSelected={handleChoiceSelected}
    />
  );

  const style = {
    width: '100%',
    height: '100vh',
    border: 0,
  };

  const canvas = (
    <Grid container>
      <Grid item xs={6}>
        <AceEditor
          width="100%"
          height="98vh"
          mode="html"
          theme="terminal"
          value={state}
          onChange={setState}
          name="editor"
          editorProps={{ $blockScrolling: true }}
        />
      </Grid>
      <Grid item xs={6}>
        <iframe srcDoc={state} style={style} title="html" />
      </Grid>
    </Grid>
  );


  return (
    <QuestFTHView
      toolbox={toolbox}
      canvas={canvas}
      sidebar={sidebar}
      onFlipped={handleFlipped}
    />
  );
};

const WrappedQuest = () => (
  <TestWrapper>
    <HtmlQuest />
  </TestWrapper>
);

const App = hot(module)(WrappedQuest);

export { App as default, HtmlQuest };
