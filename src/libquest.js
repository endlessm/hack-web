import { Story } from 'inkjs';
import { getGameState, setGameState } from './store';

const defaultCharacter = 'ada';
const userCharacter = 'user';
const mainCharacterRegex = /main character: (.*)/;
const lineCharacterRegex = /character: (.*)/;
const codeSnippetLanguageRegex = /language: (.*)/;

const extractInfoFromTags = (tags, regex, defaultValue = null) => {
  if (!tags) return defaultValue;
  const tag = tags.find((t) => regex.test(t));
  if (!tag) return defaultValue;
  return tag.match(regex)[1];
};

const extractMainCharacter = (globalTags) => (
  extractInfoFromTags(globalTags, mainCharacterRegex, defaultCharacter)
);

const extractLineCharacter = (currentTags) => (
  extractInfoFromTags(currentTags, lineCharacterRegex, null)
);

const extractChoiceModifiers = (choice) => {
  const choiceModified = { ...choice, modifiers: { attracting: false } };
  const match = choice.text.match(/attracting: (.*)/);
  if (match) {
    choiceModified.modifiers.attracting = true;
    [, choiceModified.text] = match;
  }

  return choiceModified;
};

const extractWaitForVariables = (choiceText) => {
  const result = choiceText.match(/\(wait for: (.*)\)/);
  if (!result) return [];

  const checks = [
    {
      // wait for: code not contains "test"
      match: /^([^ ]+) not contains "(.*)"$/,
      fn: (variable, str) => !variable.includes(str),
    },
    {
      // wait for: code not icontains "test"
      match: /^([^ ]+) not icontains "(.*)"$/,
      fn: (variable, str) => !variable.toUpperCase().includes(str.toUpperCase()),
    },
    {
      // wait for: code contains "test"
      match: /^([^ ]+) contains "(.*)"$/,
      fn: (variable, str) => variable.includes(str),
    },
    {
      // wait for: code icontains "test"
      match: /^([^ ]+) icontains "(.*)"$/,
      fn: (variable, str) => variable.toUpperCase().includes(str.toUpperCase()),
    },
    {
      // wait for: code is not 12
      match: /^([^ ]+) is not (.*)$/,
      fn: (variable, value) => {
        if (value === 'true') {
          return !variable;
        }
        if (value === 'false') {
          return Boolean(variable);
        }

        return String(variable) !== value;
      },
    },
    {
      // wait for: code is 12
      match: /^([^ ]+) is (.*)$/,
      fn: (variable, value) => {
        if (value === 'true') {
          return Boolean(variable);
        }
        if (value === 'false') {
          return !variable;
        }

        return String(variable) === value;
      },
    },
  ];

  // eslint-disable-next-line no-restricted-syntax
  for (const c of checks) {
    const match = result[1].match(c.match);
    if (match) {
      return [{ name: match[1], fn: c.fn, params: match.slice(2) }];
    }
  }

  return result[1].split(' ').map((r) => ({ name: r }));
};

const extractCodeSnippetLanguage = (currentTags) => (
  extractInfoFromTags(currentTags, codeSnippetLanguageRegex, null)
);

export default class Quest {
  constructor(questContent) {
    this.story = new Story(questContent);
    this.mainCharacter = extractMainCharacter(this.story.globalTags);
    this.dialogueId = 0;
    this.waitFor = {};

    this.story.BindExternalFunction('get_game_state', getGameState);
    this.story.BindExternalFunction('set_game_state', setGameState);
  }

  codeSnippetBegins() {
    const snippet = Boolean(this.story.state.currentPathString && /^snippet_.*$/.test(this.story.state.currentPathString));
    // One line snippets doesn't create a different currentPathString so we
    // should check if the currentTags has "language" to detect oneline snippets
    return snippet || Boolean(extractCodeSnippetLanguage(this.story.currentTags));
  }

  stepBegins() {
    return this.story.state.currentPathString !== null;
  }

  getCodeSnippet() {
    const codeSnippet = {
      language: extractCodeSnippetLanguage(this.story.currentTags),
      text: '',
    };
    codeSnippet.text += this.story.currentText;
    while (this.story.canContinue && (!(this.stepBegins()) || this.codeSnippetBegins())) {
      this.story.Continue();
      codeSnippet.text += this.story.currentText;
    }

    return codeSnippet;
  }

  getDialogue(character = null) {
    const text = this.story.currentText;

    if (text.trim()) {
      return {
        id: this.dialogueId,
        text: `<p>${text.trim()}</p>`,
        character: character
                || extractLineCharacter(this.story.currentTags)
                || this.mainCharacter,
      };
    }
    return null;
  }

  getDialogueOrSnippet(character = null) {
    return this.codeSnippetBegins() ? this.getCodeSnippet() : this.getDialogue(character);
  }

  continueStory() {
    let dialogue = [];

    // We assume that the next text is the user answer (except for
    // the very first one):
    if (this.dialogueId !== 0 && this.story.canContinue) {
      this.story.Continue();
      const d = this.getDialogue(userCharacter);
      if (d) {
        dialogue = [...dialogue, d];
        this.dialogueId += 1;
      }
    }

    while (this.story.canContinue) {
      this.story.Continue();
      const d = this.getDialogueOrSnippet();
      if (d) {
        if (d.language) {
          // It's a code snippet, append it to the previous dialogue:
          dialogue[dialogue.length - 1].codeSnippet = d;
        } else if (dialogue.length > 0
                   && d.character === dialogue[dialogue.length - 1].character) {
          // It's dialogue coming from the same character:
          dialogue[dialogue.length - 1].text += `</p><p>${d.text}`;
        } else {
          // It's a new dialogue:
          dialogue = [...dialogue, d];
          this.dialogueId += 1;
        }
      }
    }

    let choices = [];
    this.waitFor = {};
    this.story.currentChoices.forEach((c) => {
      const waitForVariables = extractWaitForVariables(c.text);
      waitForVariables.forEach((variable) => {
        const waitForContext = {
          choice: c,
          variable,
        };
        if (variable.name in this.waitFor) {
          this.waitFor = {
            ...this.waitFor,
            [variable.name]: [...this.waitFor[variable.name], waitForContext],
          };
        } else {
          this.waitFor = {
            ...this.waitFor,
            [variable.name]: [waitForContext],
          };
        }
      });

      if (!waitForVariables.length) {
        const choiceModified = extractChoiceModifiers(c);
        choices = [...choices, choiceModified];
      }
    });
    return { dialogue, choices };
  }

  choose(choice) {
    this.story.ChooseChoiceIndex(choice.index);
  }

  get hasEnded() {
    return !this.story.canContinue && !this.story.currentChoices.length;
  }

  restart() {
    this.dialogueId = 0;
    this.story.ResetState();
  }

  doUpdateStoryVariable(name, newValue) {
    this.story.variablesState[name] = newValue;
    if (name in this.waitFor) {
      // eslint-disable-next-line no-restricted-syntax
      for (const { choice, variable } of this.waitFor[name]) {
        const fn = variable.fn || (() => true);
        const params = variable.params || [];
        if (fn.apply(null, [newValue, ...params])) {
          this.choose(choice);
        }
      }
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

  getStoryVariable(name) {
    return this.story.variablesState[name];
  }
}
