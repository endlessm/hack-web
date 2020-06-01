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
# repurposed for level skip to 22
VAR skip = 0
# Flip to Hack
VAR hasLockKey = 0
VAR isLocked = 1
VAR attractFTH = 0
VAR codeErrors = 0

INCLUDE sidetrack-1-quest.ink
INCLUDE sidetrack-2-quest.ink

-> begin

=== mid_level_check(desiredlevel)
{
    - currentLevel == desiredlevel:
        ->->
    - else:
        + {mid_level_check < 2} [attracting: ❯] ❯
        ->->
        + {mid_level_check >= 2} ❯
        ->->
        + [(wait for: currentLevel is {desiredlevel})] #
        ->->
}

=== end_level_check(desiredLevel)
{
    - currentLevel == desiredLevel:
        # character: user
        Level {currentLevel -1 } Complete!
        ->->
    - else:
        + [(wait for: currentLevel is {desiredLevel})] Level {currentLevel -1 } Complete!
        ->->
}

=== begin ===
-> level1_5

=== level1_5 ===
# character: riley
-Hey, {get_user_name()}, welcome to Sidetrack! See that <b>Exit</b> on the far side of the screen? That's our goal! Use the FORWARD, UP, and DOWN <b>Instructions</b> to move through these obstacles, but watch out for the <b>Walls</b>!
-> end_level_check(2) -> the_choice

=== the_choice ===
# character: riley
- Oh, there's way more than one level here. This is only the beginning!
# character: riley
- You've got a choice here: Do you want to keep playing normally, or jump straight ahead to hacking the game?
* [Keep Playing!] I'll keep going, I want to play all the way through.
~ availableLevels = 28
-> level2
* [Let's get Hacking!] I can't wait to get a look inside!
~ availableLevels = 28
~ startLevel = 22
-> transition

=== transition ===
# character: riley
- OK, a quick rundown of what we're doing here: You need to drag and drop the tiles with arrows on them so that when I follow them, I'll get to the exit safely!
# character: riley
- If there's a Pit, I'll need to jump over it, and if there's a Wall, I need to go around it.
# character: riley
- Once you have the instructions arranged how you want, press the Play button to start - and no more changing instructions until I either win or lose!
# character: riley
- If I fail, you'll need to rearrange the instructions until we get it right.
~ skip = 1
-> level22
