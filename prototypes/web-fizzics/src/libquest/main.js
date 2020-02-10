const inkjs = require('inkjs');

export default class Quest {
    constructor(filename) {
        this._filename = filename;
        this._story = null;
    }
    async setup() {
        const response = await fetch(this._filename);
        const storyContent = await response.text();
        this._story = new inkjs.Story(storyContent)
        return this;
    }
    get story () {
        return this._story;
    }
    continueStory () {
        let dialogues = [];
        while (this.story.canContinue) {
            const d = {
                text: this.story.Continue(),
                character: 'Ada',
            };
            dialogues = [...dialogues, d];
        }
        return {dialogues: dialogues, choices: this.story.currentChoices}
    }
    choose (choice) {
        this.story.ChooseChoiceIndex(choice.index);
    }
}
