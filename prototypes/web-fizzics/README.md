# Bundling Fizzics side-by-side with dialogue

Goal: Bundle a toy app (Fizzics) without (or with minimal)
modifications. This prototype is about figuring out how modularization
and bundling can work on the web.

- **material-ui** as UI framework. It uses React and implements
  Material Design.

- **dat.GUI** for quick-and-dirty toolbox.

## Setup:

    yarn install

Also make sure the git submodules have been initialized. This is the
way we reuse the toy app:

    git submodule init
    git submodule update --remote

## Run in the web browser:

    yarn start

Then navigate to http://localhost:8082/ .

## Development

Get Ink variable from javascript:

    quest.story.variablesState['current_level'];

Set Ink variable from javascript:

    quest.story.variablesState['current_level'] = 2;

Observe Ink variable from javascript:

    quest.story.ObserveVariable("current_level", (varName, newValue) => {
        console.log(`${varName} changed to: ${newValue}`);
    });

Jump to Ink knot:

    quest.story.ChoosePathString("check_level");
    quest.story.Continue();
