# Hacking hack-web

## Setup

    yarn install

### Installing NodeJS in Endless OS:

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

### Installing Yarn in Endless OS

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

## Develop

To run the app locally in development mode:

    yarn start

The page will refresh itself when the code changes.

To build:

    yarn build

To run the linter only:

    yarn lint

You can also fix linting problems with:

    yarn lint --fix

To run the test suite:

    yarn test
