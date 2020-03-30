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

  * wait for: VARIABLE contains "text"
  * wait for: VARIABLE not contains "text"
  * wait for: VARIABLE is value
  * wait for: VARIABLE is not value

for example:

    === step_playing ===
    OK! Now play the level.
    + [Give me a hint] -> hint
    + [(wait for: code contains "console.log")] -> something_changed1
    + [(wait for: code not contains "bug")] -> something_changed2
    + [(wait for: level is 24)] -> something_changed3

## Recommendations

- You should use at most 3 choices. The UI is optimized for that.
- Emoji choices should go after "normal text" choices.
