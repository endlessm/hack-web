# Bundling Fizzics side-by-side with dialogue

Goal: Bundle a toy app (Fizzics) without modifications. This prototype
is about figuring out how modularization and bundling can work on web.

## Setup:

    yarn install

Also make sure the git submodules have been initialized. This is the
way we reuse the toy app:

    git submodule init
    git submodule update --remote

## Run in the web browser:

    yarn start

Then navigate to http://localhost:8082/ .
