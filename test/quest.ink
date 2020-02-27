# main character: saniel

VAR radius = 30
VAR flipped = false

-> step_a

== step_a
This is the first line
This is the second line # character: riley
+ [Bye] -> END
+ [(wait for: flipped radius)] -> variables_changed

== variables_changed
something changed! radius: {radius} flipped: {flipped}
-> END
