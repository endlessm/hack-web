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

The available character codes are:

- ada
- estelle
- faber
- felix
- riley
- saniel

## Using emojis in choices

You can use the following Unicode emojis in choices. They will be
displayed as icon buttons:

    === emojis_test ===
    * [❮] -> END
    * [❯] -> END
    * [👍] -> END
    * [👎] -> END

## User answer

The UI mimics a chat box. It's a conversation between the Hack
characters and the user. By convention, the text right after a choice
is the user answer, and will be presented as such.

In the following example, the user answer will be "App Flipped!" when
the choice is selected. The choice will be automatically selected when
the user flips the app:

    === flip_step ===
    Try to flip the app...
    + [(wait for: flipped)] App Flipped!
    - Ok let's continue.

This will produce the following chat:

      Try to flip the app
    __/

                  App Flipped!
                             \__

      Ok let's continue
    __/


Currently there is a workaround to skip the user answer: add an empty
tag to the choice. In the next example, there won't be any user
answer:

    === flip_step ===
    Try to flip the app...
    + [(wait for: flipped)] #
    - Ok let's continue.

Which will produce the following chat:

      Try to flip the app
    __/

      Ok let's continue
    __/

However this quest flow is discouraged. There should always be a user
answer after a choice, to keep the chat box readable as a
conversation.

## Rich text formatting

The following HTML tags are allowed:

    === markup_test_step ===
    - We have <b>bold</b>, <i>italics</i>, <s>strikethrough</s>, <tt>inline code</tt> and <u>underline</u>.
    - And here is a <a href="https:\/\/hack-computer.com\/">test link</a>.

Note: As you can see in the example above, the `/` in hyperlinks have
to be escaped in Ink as: `\/`.

Note: The markup is parsed as HTML directly (and limited to the HTML
tags described above). So you should use HTML character literals if
you want to add special characters. For example, use `&lt;` for `<`:

    - Tags come in pairs - an <tt>&lt;opening tag&gt;</tt>, and a <tt>&lt;/closing tag&gt;</tt>.

Note: Inline code is OK for small text like referencing variable names
or language keywords. For more featured code, use [code
snippets](#adding-code-snippets).

## Adding code snippets

You can add code snippets by defining Ink functions with only text,
and then calling them from steps. Example:

```
-> say

=== function snippet_css ===
# language: css
<style>
p \{ color: pink \}
b \{ color: blue \}
u \{ color: "umber" \}
</style>

=== function snippet_html ===
# language: html
<h1>This is a header</h1>
<p>And <b>this</b> is a paragraph.</p>

=== say ===
- See this CSS snippet:
- {snippet_css()}
* [❯] -> say_more

=== say_more ===
- See also this HTML snippet:
- {snippet_html()}
* [❯] -> END
```

The convention to identify the function as a code snippet is:
- The function name must start with `snippet_`.
- It should have a `# language: LANG` tag to enable syntax
  highlighting. Available languages are:
  * javascript
  * html
  * css
  * xml

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

You can also wait for and check for a variable value with the following syntax:

  * `wait for: VARIABLE contains "text"`
  * `wait for: VARIABLE not contains "text"`
  * `wait for: VARIABLE icontains "text"`: Like `contains` but ignoring case.
  * `wait for: VARIABLE not icontains "text"`: Like `not contains` but ignoring case.
  * `wait for: VARIABLE is value`
  * `wait for: VARIABLE is not value`

For example:

    === step_playing ===
    OK! Now play the level.
    + [Give me a hint] -> hint
    + [(wait for: code contains "console.log")] -> something_changed1
    + [(wait for: code not contains "bug")] -> something_changed2
    + [(wait for: level is 24)] -> something_changed3

## Attract user attention to an option

You can activate the glow effect on a option just adding the `attracting: `
prefix like this:

```
* [attracting: 👍] Let's keep moving!  -> p5_21
* [👎] I'm going to stay here and keep experimenting! -> END
```

## Translating Quests

To support translations, the UI can pass the current language to the
quest through a variable. You should define the following global
variable:

    VAR language = "en"

the UI will set this variable to the current language before playing
the story. Is up to the quest to use this variable in any way. A good
option is to have different versions of the quest in separate files,
one per language, include these files, and divert at the very begin:

```
INCLUDE my-quest-es.ink
INCLUDE my-quest-de.ink

// The UI will set this variable:
VAR language = "en"

{
- language == "es":
  -> begin_es
- language == "de":
  -> begin_de
- else:
  -> begin
}

=== begin ===
- Hello in English!
- -> DONE
```

Content of `my-quest-es.ink`:
```
=== begin_es ===
- Hola en español!
- -> DONE
```

Content of `my-quest-de.ink`:
```
=== begin_de ===
- Hallo auf deutsch!
- -> DONE
```

## Recommendations

- You should use at most 3 choices. The UI is optimized for that.

- Emoji choices should go after "normal text" choices.

- Make it interactive! Add a choice once in a while, even if the quest
  is linear, one message after the other. Otherwise the text will
  scroll to the last message, leaving the first one out of sight.
