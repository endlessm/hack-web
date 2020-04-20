# main character: ada

VAR currentLevel = 14
VAR startLevel = 14
VAR highestAchievedLevel = 14
VAR availableLevels = 23

# will change to 0 on death
VAR success = 1

# Changing this to 1 will play the cut scene and the value will change to 0 at
# cutscene ends.
VAR controlsCutscene = 0
VAR escapeCutscene = 0

-> begin

=== begin ===
- This is a placeholder quest. Fix me!
+ Ok! -> play_cut_scene

== play_cut_scene ==
- The controls should dissapear!
~ controlsCutscene = 1
* [(wait for: controlsCutscene is 0)](Done)
-> END
