# main character: ada

VAR currentLevel = 1
VAR startLevel = 1
VAR highestAchievedLevel = 28
VAR availableLevels = 28

# will change to 0 on death
VAR success = 1
VAR playing = 1

# Changing this to 1 will play the cut scene and the value will change to 0 at
# cutscene ends.
VAR controlsCutscene = 0
VAR escapeCutscene = 0

-> begin

=== begin ===
- Wait for five seconds and then chooose a level to go
+ [Level 14!] -> level14
+ [Level 23!] -> level23

== level23 ==
- Going to level 23
~ startLevel = 23
-> wait_for_finish

== level14 ==
- Going to level 14
~ startLevel = 14
~ controlsCutscene = 1
* [(wait for: controlsCutscene is 0)](Done)
-> wait_for_finish

== wait_for_finish ==
* [(wait for: playing is 0)](Done)
-> check_success

=== check_success ===
{
- success == 1: -> go_to_end
- else: ->->
}

=== go_to_end ===
Yes! You did it!
-> END
