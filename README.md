# hack-web

This is the web version of Hack.

## Setup

    yarn install
    git submodule init
    git submodule update
    flatpak install org.freedesktop.Sdk.Extension.mono5//18.08

You will need the following dependencies: NodeJS and Yarn. See tips
below for installing [NodeJS](#tip-installing-nodejs-in-endless-os)
and [Yarn](#tip-installing-yarn-in-endless-os) on Endless OS.

## Building

To build the app, call:

    yarn build

You can find the built app inside the `build/` folder. You can also
call `yarn` in multiple ways while developing. See [the development
doc](./HACKING.md#run-test-build) for the available options.

## Project maintenance

Sometimes you need to perform actions after you sync your checked-out
version of the project with master. There are 2 cases:

Each time dependencies change in the `package.json` file, you should
run again:

    yarn install

Each time the submodules get updated in the remote, you'll see a diff
in the `apps/` folder. You should run:

    git submodule update

## Target Devices

Here are the target devices we support:

- Medium and large screens. Specifically, 960 pixels wide and above.
- Landscape view (not portrait).
- "Modern" browsers. Specifically, those having:
  - [Material-UI support](https://material-ui.com/getting-started/supported-platforms/#browser)
  - [CSS Flexible Box Layout Module](https://caniuse.com/#feat=flexbox)
  - [Video element](https://caniuse.com/#feat=video)

## Authoring Content

We use the Ink DSL for user instructions in quests. See
[WritingQuests](docs/WritingQuests.md) for the conventions added on
top of Ink stories to support Hack quests.

See [Translating](./docs/Translating.md) for how to contribute
translations.

## Development

See [HACKING.md](./HACKING.md) for general tips and instructions.

See [Toolbox](./docs/Toolbox.md) for information about defining a
toolbox and hooking it to a hackable app.

## Tip: Installing NodeJS in Endless OS

Go to [the NodeJS download page](https://nodejs.org/en/download/) and
download the correct "Linux Binaries" package for your system. Most
likely, you will want the "64-bit" package. Create a `.local` folder
in your home directory and unzip the downloaded package there:

    mkdir -p ~/.local
    tar -C ~/.local -xJf node-v12.14.1-linux-x64.tar.xz --strip-components=1

Check if `~/.local/bin` is in your path (`echo $PATH`) and if not, add
the following line to your `~/.bashrc` file:

    export PATH="$HOME/.local/bin:$PATH"

In the terminal, log in and log out for the changes to take effect.

## Tip: Installing Yarn in Endless OS

Download the Yarn package:

    wget https://yarnpkg.com/latest.tar.gz

Verify the package:

    wget -qO- https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --import
    wget https://yarnpkg.com/latest.tar.gz.asc
    gpg --verify latest.tar.gz.asc

Extract the package in your home directory:

    mkdir -p ~/.yarn
    tar zvxf latest.tar.gz -C ~/.yarn --strip-components 1

Edit your `~/.bashrc` profile to add the following path:

    export PATH="$HOME/.yarn/bin:$PATH"

In the terminal, log in and log out for the changes to take effect.
