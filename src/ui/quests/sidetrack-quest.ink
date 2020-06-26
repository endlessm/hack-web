# main character: riley
INCLUDE common.ink
INCLUDE sidetrack-quest.es.ink

// Global vars declarations:
VAR language = "en"
VAR flipped = 0
// The start level should be 0 by default, modifying this
// will change the currentLevel
// The starting level will be the highestAchievedLevel
VAR startLevel = 0
VAR currentLevel = -1
VAR highestAchievedLevel = 1
VAR availableLevels = 2
// Will change to 0 on death
VAR success = 1
VAR playing = 1
// Changing this to 1 plays the Felix cut scene
// Value changes to 0 at cutscene end
VAR controlsCutscene = 0
// Same but for the ending cutscene
VAR escapeCutscene = 0
// Repurposed for level skip to 22
VAR skip = 0
// Flip to Hack
VAR hasLockKey = 0
VAR isLocked = 1
VAR attractFTH = 0
VAR codeErrors = 0

INCLUDE sidetrack-1-quest.ink
INCLUDE sidetrack-2-quest.ink

// Before we begin, let's wait for the app to update all the read-only
// variables. We do that by waiting for one of them, currentLevel.
+ [(wait for: currentLevel is 1)]
{ language:
- "es": -> begin_es
- else: -> begin
}

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

=== function say_level_complete
{ language:
  - "es": ¡Nivel {currentLevel - 1 } superado!
  - else: Level {currentLevel - 1 } Complete!
}

=== end_level_check(desiredLevel)
{
    - currentLevel == desiredLevel:
        {say_level_complete()}
        ->->
    - else:
        + [(wait for: currentLevel is {desiredLevel})] {say_level_complete()}
        ->->
}

=== begin ===
-> level1

=== level1 ===
-Hey, {get_user_name()}, welcome to Sidetrack! See that <b>Exit</b> on the far side of the screen? That's our goal! Use the FORWARD, UP, and DOWN <b>Instructions</b> to move through these obstacles, but watch out for the <b>Walls</b>!
-> end_level_check(2) -> the_choice

=== the_choice ===
- Oh, there's way more than one level here. This is only the beginning!
- You've got a choice here: Do you want to keep playing normally, or jump straight ahead to hacking the game?
* [Keep Playing!] I'll keep going, I want to play all the way through.
~ availableLevels = 28
-> play
* [Let's get Hacking!] I can't wait to get a look inside!
~ availableLevels = 28
// We change the level and wait for the app to update:
~ startLevel = 22
-
+ [(wait for: currentLevel is {startLevel})] #
- -> transition

= transition
- OK, a quick rundown of what we're doing here: You need to drag and drop the tiles with arrows on them so that when I follow them, I'll get to the exit safely!
- If there's a Pit, I'll need to jump over it, and if there's a Wall, I need to go around it.
- Once you have the instructions arranged how you want, press the Play button to start - and no more changing instructions until I either win or lose!
- If I fail, you'll need to rearrange the instructions until we get it right.
~ skip = 1
-> hack
