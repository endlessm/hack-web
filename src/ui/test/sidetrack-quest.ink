INCLUDE common.ink

# Global vars declarations:
VAR flipped = 0
# The start level should be 0 by default, modifying this
# will change the currentLevel
# The starting level will be the highestAchievedLevel
VAR startLevel = 0
VAR currentLevel = 1
VAR highestAchievedLevel = 1
VAR availableLevels = 28
# will change to 0 on death
VAR success = 1
VAR playing = 1
# Changing this to 1 plays the Felix cut scene
# Value changes to 0 at cutscene end
VAR controlsCutscene = 0
# same but for the ending cutscene
VAR escapeCutscene = 0
# Ending a level early makes this >0
# and shows all the remaining dialogue for the level
VAR skip = 0
# Flip to Hack
VAR hasLockKey = 0
VAR isLocked = 1
VAR attractFTH = 0
VAR codeErrors = 0

INCLUDE sidetrack-1-quest.ink
INCLUDE sidetrack-2-quest.ink

-> begin

=== begin ===
-> level1_1

=== level1_1 ===
# character: ada
-Last summer, we decided to try something new - All the students here, at The Academy, had to build a game.
# character: ada
-Each student needed to own the project and manage it themselves, but they could ask anyone around The Academy for help.
# character: ada
-You've probably guessed whose project this is already - our star student, Riley!
* [❯] ❯
-> level1_2
* [(wait for: currentLevel is 2)] Level {currentLevel -1 } Complete!
-> level1_2

=== level1_2 ===
# character: riley
-Oh, jeez... I didn't do everything, I mean, Ada helped with design, and Saniel helped me with the code, and Felix--
{ currentLevel == 2:
    -> level1_3
- else:
    * [❯] ❯
    -> level1_3
    * [(wait for: currentLevel is 2)] Level {currentLevel -1 } Complete!
    -> level1_3
}

=== level1_3 ===
# character: faber
-Don't sell yourself short, Riley! It takes a lot of skill and talent to put something like this together.
{ currentLevel == 2:
    -> level1_4
- else:
    * [❯] ❯
    -> level1_4
    * [(wait for: currentLevel is 2)] Level {currentLevel -1 } Complete!
    -> level1_4
}

=== level1_4 ===
# character: saniel
-Let's dim the lights, shall we? Riley, the room is yours.
{ currentLevel == 2:
    -> level1_5
- else:
    * [❯] ❯
    -> level1_5
    * [(wait for: currentLevel is 2)] Level {currentLevel -1 } Complete!
    -> level1_5
}

=== level1_5 ===
# character: riley
-Woohoo! Here we are! See that <b>Exit</b> on the far side of the screen? That's our goal! Let's get there! Use the FORWARD, UP, and DOWN <b>Instructions</b> to move through these obstacles, but watch out for those <b>Walls</b>!
{ currentLevel == 2:
    - Great job on that level!
    -> the_choice
}
* [(wait for: currentLevel is 2)] Level {currentLevel -1 } Complete!
-> the_choice

=== the_choice ===
# character: riley
- Haha, another level! What, you thought I'd just let you go after the exit? Nope, this is only the beginning!
- Do you want to continue playing the game or follow me hacking it?
* [Keep on playing] I just started playing. Let me continue.
-> level2
* [Let\'s hack it!] Can\'t wait to take this apart.
~ startLevel = 23
-> level23
