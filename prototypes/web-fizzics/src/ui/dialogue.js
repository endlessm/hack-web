import React, { useEffect, useRef } from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

import Quest from '../libquest/main';

const useStyles = makeStyles(theme => ({
    dialogue: {
        height: '100%',
        overflowY: 'scroll',
    },
    but: {
        textAlign: 'center',  
    },
}));

const debugQuest = false || true;

export default function Dialogue(props) {

    /* useEffect(() => {
     *     // Update the document title using the browser API
     *     if (window === undefined) return;
     *     if (window.globalParameters === undefined) return;
     *     if (window.manuqsetup === undefined) {
     *         console.log('WINDOW SETUP');
     *         window.manuqsetup = true;
     *         window.globalParameters._listeners.push((prop, val) => {
     *             if (prop == 'currentLevel') {
     *                 console.log('LEVEL CHANGED', prop, val);
     *             }
     *         });
     *     }
     * }, []);
     */

    const onToyAppChanged = (prop, value) => {
        // console.log('CHANGED', prop, value);
        if (prop == 'currentLevel') {
            const questValue = value + 1;
            if (quest.story.variablesState['current_level'] != questValue) {
                quest.story.variablesState['current_level'] = questValue;
                jumpStory();
            }
        }
    };

    const onLoad = function () {
        // Go to level 7
        window.globalParameters.preset = 6;

        // Connect to game changes
        window.globalParameters._listeners.push(onToyAppChanged);

        const gui = new dat.GUI({ autoPlace: false });

        const guiContainer = document.getElementById('toolbox-container');
        guiContainer.appendChild(gui.domElement);

        for (let i = 0; i <=4; i++) {
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

    window.addEventListener('load', () => {

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

    });

    const classes = useStyles();
    const [quest, setQuest] = React.useState();
    const [dialogues, setDialogues] = React.useState([]);
    const [choices, setChoices] = React.useState([]);
    const [currentChoice, setCurrentChoice] = React.useState(null);
    
    let messagesEnd;

    const setDialogueChoices = (q = quest) => {
        const {dialogues, choices} = q.continueStory();
        setDialogues(oldDialogues => [...oldDialogues, ...dialogues]);
        setChoices(choices);
    };

    useEffect(() => {
        console.log('quest changed');
        async function setupQuest() {
            console.log('quest setup');
            const quest = new Quest('fizzics1.ink.json');
            await quest.setup();
            setQuest(quest);
            quest.story.ObserveVariable("current_level", (varName, newValue) => {
                console.log(`${varName} changed to: ${newValue}`);
                window.globalParameters.preset = newValue-1;
            });
            quest.story.ObserveVariable("flipped", (varName, newValue) => {
                console.log(`${varName} changed to: ${newValue}`);
                props.handleFlip(newValue);
            });

            // FIXME
            // window.globalParameters.currentLevel

            // FIXME make debug a state, or parent state and pass it in props
            const debugQuestInt = debugQuest ? 1 : 0;
            if (quest.story.variablesState['debug'] != debugQuestInt) {
                quest.story.variablesState['debug'] = debugQuestInt;
            }
            setDialogueChoices(quest);
        };
        setupQuest();
    }, []);

    useEffect(() => {
        if (currentChoice === null) {
            return;
        }
        console.log('choice changed');
        quest.choose(choices[currentChoice.index]);
        setDialogueChoices();
        setCurrentChoice(null);
    }, [currentChoice]);

    const scrollToBottom = () => {
        messagesEnd.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [dialogues]);

    const jumpStory = () => {
        quest.story.ChoosePathString("check_level");
        setDialogueChoices();
        setCurrentChoice(null);
    };

    useEffect(() => {
        if (quest == undefined) {
            return;
        }
        const newValue = props.flipped ? 1 : 0;
        if (quest.story.variablesState['flipped'] != newValue) {
            quest.story.variablesState['flipped'] = newValue;
            jumpStory();
        }
    }, [props.flipped]);

    return (
        <>
            <List className={classes.dialogue}>
                {dialogues.map((d, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            secondary={d.character}
                            primary={d.text}
                            primaryTypographyProps={{
                                variant: "body2",
                            }}
                        ></ListItemText>
                    </ListItem>
                ))}
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { messagesEnd = el; }}>
                </div>
            </List>
            <Divider />
            <List>
                {choices.map((choice, index) => (
                    <ListItem
                        button
                        key={choice.index}
                        onClick={() => setCurrentChoice(choice)}
                    >
                        <ListItemText
                            className={classes.but}
                            primary={choice.text}
                            primaryTypographyProps={{
                                color: "primary",
                            }}
                        ></ListItemText>
                    </ListItem>
                ))}
            </List>
        </>
    )
}
