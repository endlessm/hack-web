# main character: ada

INCLUDE common.ink

// Variables relevant to this demo:
VAR flipped = 0
VAR currentLevel = -1
VAR success = 1
VAR codeErrors = 0

// Other variables needed by the quest, but not relevant to this demo:
VAR startLevel = 0
VAR highestAchievedLevel = 1
VAR availableLevels = 2
VAR playing = 1
VAR controlsCutscene = 0
VAR escapeCutscene = 0
VAR skip = 0
VAR hasLockKey = 1
VAR isLocked = 0
VAR attractFTH = 0

// Before we begin, let's wait for the app to update all the read-only
// variables. We do that by waiting for one of them, currentLevel.
+ [(wait for: currentLevel is 1)] -> begin

=== begin ===
Hello, {get_user_name()}! Let's see if you can pass this level.
-> playing_level

=== playing_level ===
/*
We display a different message, depending on where the flow is coming
from (the previous level, level restarted, etc).
*/
~ temp at_level = currentLevel
{came_from(-> player_died): Let's try again.}
{came_from(-> at_toolbox): Let's see if we can pass the level now, with those changes.}
{came_from(-> reach_level): OK, we are back at level {currentLevel}.}
{came_from(-> level_succeed): OK, we are now at level {currentLevel}.}
+ [(wait for: currentLevel success flipped)]
  {
    - not success:
      Player died.
      -> player_died
    - flipped:
      App flipped!
      -> at_toolbox
    - currentLevel < at_level:
      Previous level selected
      -> reach_level(at_level)
    - currentLevel > at_level:
      Level complete!
      -> level_succeed(at_level)
  }
+ [Ok, enough.]
  -> END
- -> playing_level

=== level_succeed(level) ===
Yay! you beated level {level}!
-> playing_level

=== player_died ===
/*
Wait until the player clicks Restart in the "game over" screen. We
need to consider that the player can flip the app in this screen too.
*/
Ouch! Something went wrong.
+ [(wait for: flipped success)]
  {
    - success:
      Restarting...
      -> playing_level
    - flipped:
      App flipped!
      -> at_toolbox
  }

=== at_toolbox ===
Here we are at the toolbox{at_toolbox != 1: again}.
// After the first visit, Faber appears to give hints:
{at_toolbox == 2: Try changing X this time.} # character: faber
{at_toolbox == 3: What about doing Y?} # character: faber
+ [(wait for: flipped)] Flipped back!
// If the player left any errors in the editor, Saniel appears to rant:
{codeErrors > 0: Hmm... {print_errors(codeErrors)} in that code editor.} # character: saniel
- -> playing_level

=== reach_level(desired_level) ===
/*
At this point, it doesn't matter if the player flips the app, plays or
dies. All we want is that they go back to the level in question.
*/
Hey! We are not done yet! Come back to level {desired_level}!
+ [(wait for: currentLevel is {desired_level})] Back at level {desired_level}
- -> playing_level

=== function came_from(-> x) ===
~ return TURNS_SINCE(x) == 1

=== function print_errors(x) ===
{
  - x == 1:
    there was one error
  - else:
    there were multiple errors
}
