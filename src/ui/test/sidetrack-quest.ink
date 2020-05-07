INCLUDE common.ink

# Global vars declarations:
VAR flipped = 0
# The start level should be 0 by default, modifying this
# will change the currentLevel
# The starting level will be the highestAchievedLevel
VAR startLevel = 0
VAR currentLevel = 1
VAR highestAchievedLevel = 1
VAR availableLevels = 2
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
# character: riley
- You've got a choice here: Do you want to keep playing, or jump straight ahead to hacking the game?
* [Keep Playing!] I'll keep going, I want to play all the way through.
~ startLevel = 3
~ availableLevels = 23
-> level3
* [Let's get Hacking!] I can't wait to get a look inside!
~ availableLevels = 28
~ startLevel = 22
-> transition

=== transition ===

# character: riley
- OK, a quick rundown of what we're doing here: See that little copy of me on the left? You're trying to get me to the exit, over on the right.
# character: riley
- You need to drag and drop the tiles with arrows on them so that when I follow them, I'll get to the exit safely!
# character: riley
- If there's a Pit, I'll need to jump over it, and if there's a Wall, I need to go around it.
# character: riley
- Once you have the instructions arranged how you want, press the Play button to start - and no more changing instructions until I either win or lose!
# character: riley
- If I fail, you'll need to rearrange the instructions until we get it right.
-> level22
