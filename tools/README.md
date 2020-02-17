# Tools

Some tools require git submodules. Make sure they have been
initialized:

    git submodule init
    git submodule update --remote

## inklecate

This tool can compile and play `.ink` files.

To compile the `.ink` file to the JSON bytecode-like format:

    tools/inklecate TheIntercept.ink

To play the `.ink` file in the command line:

    tools/inklecate -p TheIntercept.ink
