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
    expect(Object.keys(quest.waitFor).length).toEqual(2);
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
    expect(dialogue[0].text).toEqual('something changed! radius: 30 flipped: 1\n');

    // Now we go back to the same step, to test the other variable:
    quest.story.ChoosePathString('step_a');
    quest.continueStory();
    quest.updateStoryVariable('radius', 85);
    expect(spyOnChoose).toHaveBeenCalledTimes(2);
    const { dialogue: newDialogue } = quest.continueStory();
    expect(newDialogue[0].text).toEqual('something changed! radius: 85 flipped: 1\n');

    spyOnChoose.mockRestore();
  });
});
