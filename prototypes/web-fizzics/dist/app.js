console.log('hello wor');

window.ToyApp = {
    isHackMode: false,
    runningQuest: '',

    hideToolbox() {
        // FIXME
    },

    requestState() {
        // FIXME
    },

    loadNotify() {
        // FIXME
    },

    setHackable(state) {
        // FIXME
    },

    setAspectRatio(ratio) {
        // FIXME
    },

    saveState(state) {
        var string = JSON.stringify(state, (key, value) => {
        }, 2);
        // FIXME
    },

    quit(msFadeOut = 0) {
        // FIXME
    },

    showClubhouse(characterName = 'ada') {
        // FIXME
    },
};

window.Sounds = {
    play(id) {
        // FIXME
        console.log(`Sounds.play(${id})`);
    },

    playLoop(id) {
        // FIXME
        console.log(`Sounds.playLoop(${id})`);
    },

    updateSound(id, time_ms, props) {
        // FIXME
        console.log(`Sounds.updateSound(${id}, ${time_ms}, ${props})`);
    },

    stop(id) {
        // FIXME
        console.log(`Sounds.stop(${id})`);
    },

    terminate(id) {
        // FIXME
        console.log(`Sounds.terminate(${id})`);
    },
};
