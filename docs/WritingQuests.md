# Writing Quests

This document explains the conventions added to Ink stories to support
Hack quests. See the [Ink
documentation](https://www.inklestudios.com/ink/) for how to actually
write Ink stories. This document assumes that you know about Ink
already.

## Defining characters

To define the main talking character of the story, set a global tag at
the top of your `.ink` file:

    # main character: saniel

If you don't set it, the main character will fallback to Ada.

All the dialogue will be narrated by the main character, unless you
specify a different character. This can be set per line of dialogue,
again using a tag:

    === some_step ===
    Hello
    Hey there! # character: riley

In the case above, the main character will say "Hello", and Riley will
say "Hey there!".

## Using emojis in choices

You can use the following Unicode emojis in choices. They will be
displayed as icon buttons:

    === emojis_test ===
    * [❮] -> END
    * [❯] -> END
    * [👍] -> END
    * [👎] -> END

## Waiting for variable changes

You can add a special kind of choice to wait for variables. For
example:

    === step_playing ===
    OK! Now play the level.
    + [Give me a hint] -> hint
    + [(wait for: flipped level_completed)] -> something_changed

In this case, only the "Give me a hint" choice will be displayed. The
other one will be hidden to the user, and will be automatically chosen
when either the `flipped` or the `level_completed` variables change.
## Recommendations

- You should use at most 3 choices. The UI is optimized for that.
- Emoji choices should go after "normal text" choices.
