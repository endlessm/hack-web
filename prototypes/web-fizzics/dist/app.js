
const onLoad = function () {
    const gui = new dat.GUI({ autoPlace: false });

    const guiContainer = document.getElementById('toolbox-container');
    guiContainer.appendChild(gui.domElement);

    for (i = 0; i <=4; i++) {
        var folder = gui.addFolder(`Ball ${i}`);

        folder.add(window.globalParameters, `radius_${i}`, window.globalParameters.minRadius, window.globalParameters.maxRadius).listen();
        folder.add(window.globalParameters, `gravity_${i}`, window.globalParameters.minGravity, window.globalParameters.maxGravity).listen();
        folder.add(window.globalParameters, `collision_${i}`, window.globalParameters.minCollision, window.globalParameters.maxCollision).listen();
        folder.add(window.globalParameters, `friction_${i}`, window.globalParameters.minFriction, window.globalParameters.maxFriction).listen();
        folder.add(window.globalParameters, `usePhysics_${i}`);
    }

    // minSocialForce: -30.0,
    // maxSocialForce: 30.0,

    // socialForce_0_0
    // socialForce_0_1
    // socialForce_0_2
    // socialForce_0_3
    // socialForce_0_4

    // touchDeath_0_0
    // touchDeath_0_1
    // touchDeath_0_2
    // touchDeath_0_3
    // touchDeath_0_4
    // deathVisualGood_0
    // deathVisualBad_0
    // deathSoundGood_0
    // deathSoundBad_0
    // imageIndex_0
}

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
        onLoad();
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
