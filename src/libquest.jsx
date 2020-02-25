import { Story } from 'inkjs';

const defaultCharacter = 'ada';

const extractMainCharacter = (globalTags) => {
  if (!globalTags) return defaultCharacter;
  for (let i = 0; i < globalTags.length; i += 1) {
    const tag = globalTags[i];
    const result = tag.match(/main character: (.*)/);
    if (result) {
      return result[1];
    }
  }
  return defaultCharacter;
};

const extractLineCharacter = (currentTags) => {
  for (let i = 0; i < currentTags.length; i += 1) {
    const tag = currentTags[i];
    const result = tag.match(/character: (.*)/);
    if (result) {
      return result[1];
    }
  }
  return null;
};

const extractWaitForVariables = (choiceText) => {
  const result = choiceText.match(/\(wait for: (.*)\)/);
  if (!result) return [];
  return result[1].split(' ');
};

export default class Quest {
  constructor(questContent) {
    this.story = new Story(questContent);
    this.mainCharacter = extractMainCharacter(this.story.globalTags);
    this.dialogueId = 0;
    this.waitFor = {};
  }

  continueStory() {
    let dialogue = [];
    while (this.story.canContinue) {
      const d = {
        id: this.dialogueId,
        text: this.story.Continue(),
        character: extractLineCharacter(this.story.currentTags) || this.mainCharacter,
      };

      // avoid empty dialogue messages
      if (d.text.trim()) {
        dialogue = [...dialogue, d];
        this.dialogueId += 1;
      }
    }

    let choices = [];
    this.waitFor = {};
    this.story.currentChoices.forEach((c) => {
      const waitForVariables = extractWaitForVariables(c.text);
      if (!waitForVariables.length) {
        choices = [...choices, c];
      }
      waitForVariables.forEach((variable) => {
        this.waitFor = { ...this.waitFor, ...{ [variable]: c } };
      });
    });

    return { dialogue, choices };
  }

  choose(choice) {
    this.story.ChooseChoiceIndex(choice.index);
  }

  doUpdateStoryVariable(name, newValue) {
    this.story.variablesState[name] = newValue;
    if (name in this.waitFor) {
      this.choose(this.waitFor[name]);
    }
  }

  updateStoryVariable(name, newValue) {
    let convertedValue = newValue;

    // Ink stores booleans as 0 (false) / 1 (true). So we convert
    // boolean to int:
    if (typeof newValue === 'boolean') {
      convertedValue = newValue ? 1 : 0;
    }

    if (this.story.variablesState[name] !== convertedValue) {
      this.doUpdateStoryVariable(name, convertedValue);
    }
  }
}
