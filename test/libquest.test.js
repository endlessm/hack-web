/* Copyright © 2020 Endless OS LLC
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import fs from 'fs';
import i18next from 'i18next';
import Quest from '../src/libquest';
import store from '../src/store';

describe('libquest', () => {
  const path = './test/quest.ink.json';
  const questContent = fs.readFileSync(path, 'UTF-8')
    .replace(/^\uFEFF/, ''); // strip the BOM

  it('should load the story, knows when it ended', () => {
    const quest = new Quest(questContent);
    expect(quest.story).not.toBe(undefined);
    expect(quest.hasEnded).toBe(false);
    const { choices } = quest.continueStory();
    expect(quest.hasEnded).toBe(false);
    quest.choose(choices[0]);
    expect(quest.hasEnded).toBe(false);
    quest.continueStory();
    expect(quest.hasEnded).toBe(true);
  });

  it('can restart the story', () => {
    const quest = new Quest(questContent);
    const { dialogue: firstDialogue, choices } = quest.continueStory();
    const name = 'radius';
    quest.choose(choices[0]);
    expect(quest.getStoryVariable(name)).toEqual(30);
    quest.continueStory();
    expect(quest.hasEnded).toBe(true);
    quest.updateStoryVariable(name, 55);
    expect(quest.getStoryVariable(name)).toEqual(55);
    quest.restart();
    expect(quest.getStoryVariable(name)).toEqual(30);
    const { dialogue: secondDialogue } = quest.continueStory();
    expect(secondDialogue).toEqual(firstDialogue);
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
    expect(quest.getStoryVariable(name)).toEqual(30);
    quest.updateStoryVariable(name, 55);
    expect(quest.getStoryVariable(name)).toEqual(55);
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
    expect(quest.getStoryVariable(name)).toEqual(0);

    quest.updateStoryVariable(name, true);
    expect(spyOnUpdate).toHaveBeenCalledTimes(1);
    expect(quest.getStoryVariable(name)).toEqual(1);

    // Already in 1 (true), it shouldn't be updated:
    quest.updateStoryVariable(name, true);
    expect(spyOnUpdate).toHaveBeenCalledTimes(1);
    expect(quest.getStoryVariable(name)).toEqual(1);

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

  it('can auto-choose with multiple checks for the same variable', () => {
    const spyOnChoose = jest.spyOn(Quest.prototype, 'choose');
    const quest = new Quest(questContent);
    ['A', 'B', 'C'].forEach((matchWord, i) => {
      quest.story.ChoosePathString('multiple_checks');
      quest.continueStory();
      quest.updateStoryVariable('filter', matchWord);
      expect(spyOnChoose).toHaveBeenCalledTimes(i + 1);
    });
    spyOnChoose.mockRestore();
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

  it('can get oneline snippet', () => {
    const quest = new Quest(questContent);

    // This one does have a code snippet:
    quest.story.ChoosePathString('say_snippet_oneline');
    const { dialogue } = quest.continueStory();
    expect(dialogue.length).toEqual(1);
    expect(dialogue[0].text).toEqual('<p>Check this out:</p>');
    expect(dialogue[0].codeSnippet.language).toEqual('html');
    expect(dialogue[0].codeSnippet.text).toMatch(/^<h1 style="color:purple">/);
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

  it('works with hints', () => {
    const quest = new Quest(questContent);

    quest.story.ChoosePathString('test_hints');
    const { choices } = quest.continueStory();
    quest.choose(choices[0]);
    expect(() => {
      quest.continueStory();
    }).not.toThrow();
  });

  it('choice modifiers', () => {
    const quest = new Quest(questContent);

    quest.story.ChoosePathString('test_mods');
    const { choices } = quest.continueStory();
    expect(choices.length).toEqual(3);

    const [first, second, attractChoice] = choices;
    expect(first.text).toEqual('First option');
    expect(second.text).toEqual('option with brackets');
    expect(attractChoice.text).toEqual('❯');

    expect(first.modifiers).toEqual({ attracting: false });
    expect(second.modifiers).toEqual({ attracting: false });
    expect(attractChoice.modifiers).toEqual({ attracting: true });

    quest.choose(choices[0]);
    expect(() => {
      quest.continueStory();
    }).not.toThrow();
  });

  it('can get and set game state', () => {
    const quest = new Quest(questContent);

    quest.story.ChoosePathString('test_game_state');
    const { choices, dialogue } = quest.continueStory();
    expect(choices.length).toEqual(1);
    expect(store.getState().gameState['test.value']).toEqual('test');
    expect(store.getState().gameState['test.val']).toEqual({
      with: {
        deep: 'test2',
      },
    });

    expect(dialogue[0].text).toEqual('<p>This is a test for game state: test, test2</p>');

    expect(() => {
      quest.continueStory();
    }).not.toThrow();
  });

  it('reads achievements', () => {
    i18next.init({
      lng: 'en',
      debug: true,
    }, () => {
      const quest = new Quest(questContent);

      quest.story.ChoosePathString('test_achievement');
      const { choices, dialogue } = quest.continueStory();
      expect(choices.length).toEqual(1);
      expect(store.getState().gameState['quests.achievements']).toEqual({ custom: 1 });
      expect(dialogue[0].text).toEqual('<p>This is a dialogue</p>');
      expect(dialogue[1].text).toEqual('<p>Conglatulations! New achievement reached: <b>custom</b></p><img src="/assets/badges/custom.svg" alt="custom"/>');

      expect(() => {
        quest.continueStory();
      }).not.toThrow();
    });
  });
});
