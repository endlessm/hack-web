# main character: saniel

VAR radius = 30
VAR flipped = false
VAR filter = "sample text"
VAR number = 0
VAR filter2 = "sample text"
VAR number2 = 0
VAR finished = false

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

== variables_changed
something changed! radius: {radius} flipped: {flipped}
-> END

== filter_changed
something changed! filter: {filter} filter2: {filter2}
-> END

== number_changed
something changed! number: {number} number2: {number2}
-> END

== finished_changed
something changed! finished: {finished}
-> END

== step_end
Bye! -> END
