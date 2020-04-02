import fs from 'fs';
import Quest from '../src/libquest';

describe('libquest', () => {
  const path = './test/quest.ink.json';
  const questContent = fs.readFileSync(path, 'UTF-8')
    .replace(/^\uFEFF/, ''); // strip the BOM

  it('should load the story', () => {
    const quest = new Quest(questContent);
    expect(quest.story).not.toBe(undefined);
  });

  it('has unique identifiers per line of dialogue', () => {
    const quest = new Quest(questContent);
    const { dialogue } = quest.continueStory();
    expect(dialogue.length).toEqual(2);
    expect(dialogue[0].id).toEqual(0);
    expect(dialogue[1].id).toEqual(1);
  });

  it('should fallback to a default character', () => {
    const noCharacterPath = './test/quest-no-character.ink.json';
    const noCharacterContent = fs.readFileSync(noCharacterPath, 'UTF-8')
      .replace(/^\uFEFF/, '');
    const quest = new Quest(noCharacterContent);
    expect(quest.mainCharacter).toEqual('ada');
  });

  it('can define the main character', () => {
    const quest = new Quest(questContent);
    expect(quest.mainCharacter).toEqual('saniel');
  });

  it('can define character per line of dialogue', () => {
    const quest = new Quest(questContent);
    const { dialogue } = quest.continueStory();
    expect(dialogue[0].character).toEqual('saniel');
    expect(dialogue[1].character).toEqual('riley');
  });

  it('can update story variables', () => {
    const quest = new Quest(questContent);
    const name = 'radius';
    expect(quest.story.variablesState[name]).toEqual(30);
    quest.updateStoryVariable(name, 55);
    expect(quest.story.variablesState[name]).toEqual(55);
  });

  it('throws trying to update an undefined story variable', () => {
    const quest = new Quest(questContent);
    expect(() => {
      quest.updateStoryVariable('wrong_var', 123);
    }).toThrow();
  });

  it('converts booleans when updating story variables', () => {
    const spyOnUpdate = jest.spyOn(Quest.prototype, 'doUpdateStoryVariable');
    const quest = new Quest(questContent);
    const name = 'flipped';

    // The initial value is 0, which means false. So it shouldn't be
    // updated:
    quest.updateStoryVariable(name, false);
    expect(spyOnUpdate).toHaveBeenCalledTimes(0);
    expect(quest.story.variablesState[name]).toEqual(0);

    quest.updateStoryVariable(name, true);
    expect(spyOnUpdate).toHaveBeenCalledTimes(1);
    expect(quest.story.variablesState[name]).toEqual(1);

    // Already in 1 (true), it shouldn't be updated:
    quest.updateStoryVariable(name, true);
    expect(spyOnUpdate).toHaveBeenCalledTimes(1);
    expect(quest.story.variablesState[name]).toEqual(1);

    spyOnUpdate.mockRestore();
  });

  it('can choose automatically when a variable changes', () => {
    const spyOnChoose = jest.spyOn(Quest.prototype, 'choose');
    const quest = new Quest(questContent);

    expect(Object.keys(quest.waitFor).length).toEqual(0);
    const { choices } = quest.continueStory();
    expect(choices.length).toEqual(1);
    expect(Object.keys(quest.waitFor).length).toEqual(9);
    expect('flipped' in quest.waitFor).toBe(true);
    expect('radius' in quest.waitFor).toBe(true);
    expect('wrong_variable' in quest.waitFor).toBe(false);

    quest.updateStoryVariable('flipped', false);
    expect(spyOnChoose).toHaveBeenCalledTimes(0);

    quest.updateStoryVariable('flipped', true);
    expect(spyOnChoose).toHaveBeenCalledTimes(1);

    const { dialogue } = quest.continueStory();
    expect(dialogue.length).toEqual(1);
    expect(Object.keys(quest.waitFor).length).toEqual(0);
    expect(dialogue[0].text).toEqual('<p>something changed! radius: 30 flipped: 1</p>');

    // Now we go back to the same step, to test the other variable:
    quest.story.ChoosePathString('step_a');
    quest.continueStory();
    quest.updateStoryVariable('radius', 85);
    expect(spyOnChoose).toHaveBeenCalledTimes(2);
    let { dialogue: newDialogue } = quest.continueStory();
    expect(newDialogue[0].text).toEqual('<p>something changed! radius: 85 flipped: 1</p>');

    // Now we go back to the same step, to test contains:
    quest.story.ChoosePathString('step_a');
    quest.continueStory();
    quest.updateStoryVariable('filter', 'this is a test filter string');
    expect(spyOnChoose).toHaveBeenCalledTimes(3);
    ({ dialogue: newDialogue } = quest.continueStory());
    expect(newDialogue[0].text).toEqual('<p>something changed! filter: this is a test filter string filter2: sample text</p>');
    quest.updateStoryVariable('filter', 'sample text');

    quest.story.ChoosePathString('step_a');
    quest.continueStory();
    quest.updateStoryVariable('filter2', 'real text');
    expect(spyOnChoose).toHaveBeenCalledTimes(4);
    ({ dialogue: newDialogue } = quest.continueStory());
    expect(newDialogue[0].text).toEqual('<p>something changed! filter: sample text filter2: real text</p>');
    quest.updateStoryVariable('filter2', 'sample text');

    // Now we go back to the same step, to test is:
    quest.story.ChoosePathString('step_a');
    quest.continueStory();
    quest.updateStoryVariable('number', 27);
    expect(spyOnChoose).toHaveBeenCalledTimes(4);
    quest.updateStoryVariable('number', 28);
    expect(spyOnChoose).toHaveBeenCalledTimes(5);
    ({ dialogue: newDialogue } = quest.continueStory());
    expect(newDialogue[0].text).toEqual('<p>something changed! number: 28 number2: 0</p>');
    quest.updateStoryVariable('number', 0);

    quest.story.ChoosePathString('step_a');
    quest.continueStory();
    quest.updateStoryVariable('number2', 28);
    expect(spyOnChoose).toHaveBeenCalledTimes(6);
    ({ dialogue: newDialogue } = quest.continueStory());
    expect(newDialogue[0].text).toEqual('<p>something changed! number: 0 number2: 28</p>');
    quest.updateStoryVariable('number2', 0);

    quest.story.ChoosePathString('step_a');
    quest.continueStory();
    quest.updateStoryVariable('finished', false);
    expect(spyOnChoose).toHaveBeenCalledTimes(6);
    quest.updateStoryVariable('finished', true);
    expect(spyOnChoose).toHaveBeenCalledTimes(7);
    ({ dialogue: newDialogue } = quest.continueStory());
    expect(newDialogue[0].text).toEqual('<p>something changed! finished: 1</p>');
    quest.updateStoryVariable('finished', false);

    quest.story.ChoosePathString('step_a');
    quest.continueStory();
    quest.updateStoryVariable('filter3', 'should iGNore Case');
    expect(spyOnChoose).toHaveBeenCalledTimes(8);
    ({ dialogue: newDialogue } = quest.continueStory());
    expect(newDialogue[0].text).toEqual('<p>something changed! filter3: should iGNore Case filter4: SaMpLe TeXt</p>');
    quest.updateStoryVariable('filter3', 'sample text');

    quest.story.ChoosePathString('step_a');
    quest.continueStory();
    quest.updateStoryVariable('filter4', 'should iGNore Case');
    expect(spyOnChoose).toHaveBeenCalledTimes(9);
    ({ dialogue: newDialogue } = quest.continueStory());
    expect(newDialogue[0].text).toEqual('<p>something changed! filter3: sample text filter4: should iGNore Case</p>');

    spyOnChoose.mockRestore();
  });

  it('can choose option and identify user answer', () => {
    const quest = new Quest(questContent);
    quest.continueStory();
    const { choices } = quest.continueStory();
    expect(choices.length).toEqual(1);
    quest.choose(choices[0]);
    const { dialogue } = quest.continueStory();
    expect(dialogue[0].character).toEqual('user');
  });

  it('can get snippet', () => {
    const quest = new Quest(questContent);

    // This one doesn't have a code snippet:
    quest.story.ChoosePathString('step_a');
    const { dialogue: dialogueWithout } = quest.continueStory();
    expect(dialogueWithout[0].codeSnippet).toBeUndefined();

    // This one does have a code snippet:
    quest.story.ChoosePathString('say_snippet');
    const { dialogue } = quest.continueStory();
    expect(dialogue.length).toEqual(1);
    expect(dialogue[0].text).toEqual('<p>Check this out:</p>');
    expect(dialogue[0].codeSnippet.language).toEqual('html');
    expect(dialogue[0].codeSnippet.text).toMatch(/^<h1>This is a header<\/h1>/);
  });

  it('groups messages by character', () => {
    const quest = new Quest(questContent);

    quest.story.ChoosePathString('all_said_by_the_same_character');
    const { dialogue } = quest.continueStory();
    expect(dialogue.length).toEqual(1);

    quest.story.ChoosePathString('another_character_in_between');
    const { dialogue: newDialogue } = quest.continueStory();
    expect(newDialogue.length).toEqual(3);
  });
});
