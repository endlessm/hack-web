# Flatpak wrapper of the Ink compiler (inklekate)

Why? To run the Ink compiler in flatpak-managed systems like Endless
OS. The compiler needs the mono runtime, which is available in flathub
as an SDK extension.

# How to build, play, and compile

Build the flatpak:

    ./build.sh

Play a `.ink` file in the command line:

    ./play.sh TheIntercept.ink

Convert a `.ink` file to the JSON bytecode-like format, suitable for
loading it with an engine (like the inkjs web engine):

    ./convert.sh TheIntercept.ink

It will output a `TheIntercept.ink.json` file.
