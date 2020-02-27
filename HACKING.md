# Hacking hack-web
## Development
### Setup

    yarn install

#### Installing NodeJS in Endless OS:

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

#### Installing Yarn in Endless OS

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

### Run, test, build

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

### Settings for Development Mode

You can pass environment variables to `yarn start` to try different
things.

Testing login:

    TEST_AUTH=true yarn start

### Tip: working with multiple branches

If you switch branches often, you will find that the `node_modules/`
directory gets inconsistent, and you have to run `yarn install` over
and over again. Luckily, git has a feature that supports this use
case, called `git worktree`. It allows you to have multiple checkouts
in different directories (called working trees). For instance, at one
point you could have:

    hack-web/        # the main working tree, in master
    hack-web-wip/    # a linked working tree with a WIP branch
    hack-web-T29373/ # a linked working tree for testing the remote branch T29373

To add a working tree, pass the new directory name and the branch
name. For example, this will create a working tree for testing the
remote branch `origin/T29373`:

    git worktree add ../hack-web-T29373 origin/T29373
    cd ../hack-web-T29373
    yarn install

With working trees, you can even run two versions of the app in
parallel, passing the port to `yarn start`:

    cd ../hack-web-T29373
    yarn start --port 5001

Once you are done with the linked working tree, you can remove it
with:

    cd ../hack-web
    git worktree remove -f ../hack-web-T29373

The `-f` is because we use git submodules, and by default git prevents
removing worktrees with submodules inside.

## Styling

We rely on the theme as much as possible for styling the UI. Please
see the [material-ui](https://material-ui.com/) documentation for
further information. Here is a quick check-list:

- [ ] Use `theme.pallete` for [colors](https://material-ui.com/customization/color/#color).
- [ ] Use `theme.transitions` for [transitions](https://material-ui.com/components/transitions/#transitions).
- [ ] Use `theme.spacing` for [spacing](https://material-ui.com/system/spacing/#spacing).
- [ ] Use `theme.palette.common` for Hack-specific colors.
- [ ] Use `theme.custom` for other Hack-specific values.
