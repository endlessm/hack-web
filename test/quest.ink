# main character: saniel

VAR radius = 30
VAR flipped = false
VAR filter = "sample text"
VAR number = 0
VAR filter2 = "sample text"
VAR number2 = 0
VAR finished = false
VAR filter3 = "sample text"
VAR filter4 = "SaMpLe TeXt"

-> step_a

== step_a
This is the first line
This is the second line # character: riley
+ Bye -> step_end
+ [(wait for: flipped radius)] -> variables_changed
+ [(wait for: filter contains "test filter")] -> filter_changed
+ [(wait for: filter2 not contains "sample")] -> filter_changed
+ [(wait for: number is 28)] -> number_changed
+ [(wait for: number2 is not 0)] -> number_changed
+ [(wait for: finished is true)] -> finished_changed
+ [(wait for: filter3 icontains "IGNORE cAsE")] -> icase_changed
+ [(wait for: filter4 not icontains "sample text")] -> icase_changed

== variables_changed
something changed! radius: {radius} flipped: {flipped}
-> END

== filter_changed
something changed! filter: {filter} filter2: {filter2}
-> END

== icase_changed
something changed! filter3: {filter3} filter4: {filter4}
-> END

== number_changed
something changed! number: {number} number2: {number2}
-> END

== finished_changed
something changed! finished: {finished}
-> END

== step_end
Bye! -> END

=== function snippet_webpage ===
# language: html
<h1>This is a header</h1>
<p>And <b>this</b> is a paragraph.</p>

== say_snippet
- Check this out:
- {snippet_webpage()}
-> END

== all_said_by_the_same_character
- a
- b
- c
- d
-> END

== another_character_in_between
- a
- b # character: ada
- c
- d
-> END
