# Projects researching DSL for quests

This is a collection of proof-of-concepts and prototypes to research
DSL for quests. You can read [this project
brief](https://docs.google.com/document/d/1_zLZbd6rDNVLRa2OJoBO4jyIsPspFDIrJ8mLBXVl8rI).

## In this folder:

- [libquest-web-ink](./libquest-web-ink) — Trying the Ink DSL for web quests.
- [libquest-web-yarn](./libquest-web-yarn) — Trying the Yarn DSL for web quests.
- [libquest-web-common](./libquest-web-common) — Common files for the two prototypes above.
- [web-fizzics](./web-fizzics) — Trying modularization and bundling Fizzics side-by-side with dialogue.
- [ink-flatpak](./ink-flatpak) — Flatpak wrapper of the Ink compiler.

## Installing NodeJS in Endless OS:

Go to [the NodeJS download page](https://nodejs.org/en/download/) and
download the correct "Linux Binaries" package for your system. Most
likely, you will want the "64-bit" package. Create a `.local` folder
in your home directory and unzip the downloaded package there:

    mkdir -p ~/.local
    tar -C ~/.local -xJf node-v12.14.1-linux-x64.tar.xz --strip-components=1

Check if `~/.local/bin` is in your path (`echo $PATH`) and if not, add
the following line to your `~/.bashrc` file, then close and reopen the
terminal:

    export PATH="$HOME/.local/bin:$PATH"
