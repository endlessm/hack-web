VAR workingLevel = 0

=== bad_level(desiredLevel)
# character: riley
- Oops! We need to go back to Level {desiredLevel}!
+ [(wait for: currentLevel)] #
{
    - currentLevel == desiredLevel:
    ->->
    - else:
    -> bad_level(desiredLevel)
}

=== bad_state(desiredLevel)
# character: riley
- Oops! We need to get back to the code in Level {desiredLevel}!
+ [(wait for: flipped currentLevel)] #
{
    - (flipped == true) && (currentLevel == desiredLevel):
    ->->
    - else:
    -> bad_state(desiredLevel)
}

=== function came_from(-> x)
~ return TURNS_SINCE(x) == 1



=== level23 ===
~ workingLevel = 23
{ not came_from(-> bad_level):
    # character: riley
    Hey, check out that instruction in the middle of the set. That's not a good symbol!
    # character: ada
    I suppose we should try out the level anyway, just to see what happens...
}
+ [(wait for: currentLevel)] #
{
    - currentLevel < workingLevel:
	-> bad_level(workingLevel) -> level23
}
+ [(wait for: success is 0)] Level {currentLevel} Failed!
    -> level23_3
+ [(wait for: flipped)] Flipped!
    -> level23_3


=== level23_3 ===
{ not came_from(-> bad_level):
    # character: estelle
    I think we actually have 2 problems - First, the middle instruction looks like an error. Second, even if you put that error somewhere else, we still need a <b>jump()</b> instruction to cross those pits!
}
{ flipped:
	-> level23_4
}
+ [(wait for: currentLevel)] #
{
    - currentLevel < workingLevel:
	-> bad_level(workingLevel) -> level23_3
}
* ❯
    -> level23_4
+ [(wait for: flipped)] Flipped!
    -> level23_4


=== level23_4 ===
{ not came_from(-> bad_level):
    # character: estelle
    Good thing I know just the person to help! Saniel, are you there?
}
{ flipped:
	-> level23_5
}
+ [(wait for: currentLevel)] #
{
    - currentLevel < workingLevel:
	-> bad_level(workingLevel) -> level23_4
}
* ❯
    -> level23_5
+ [(wait for: flipped)] Flipped!
    -> level23_5


=== level23_5 ===
{ not came_from(-> bad_level):
    # character: saniel
    What? Yes, yes, I am here. I was... <i>inemuri</i>, as the Japanese say. Sleeping while present, if you will.
}
{ flipped:
	-> level23_6
}
+ [(wait for: currentLevel)] #
{
    - currentLevel < workingLevel:
	-> bad_level(workingLevel) -> level23_5
}
* ❯
-> level23_6
+ [(wait for: flipped)] Flipped!
-> level23_6


=== level23_6 ===
{ not came_from(-> bad_level):
    # character: saniel
    Ahem. Now, what do we have? A line of pits, an invalid instruction... It <b>appears</b> we're stuck, but we won't be defeated this easily! Riley, is there a way for us to look into the code and debug that instruction?
}
{ flipped:
	-> level23_7
}
+ [(wait for: currentLevel)] #
{
    - currentLevel < workingLevel:
	-> bad_level(workingLevel) -> level23_6
}
* ❯
    -> level23_7
+ [(wait for: flipped)] Flipped!
    -> level23_7


=== level23_7 ===
~ attractFTH = 1
{ not came_from(-> bad_level):
    # character: riley
    Exactly, Dr. Rowe! That's what the next step is - debug the broken code! Do you see that button on the <b>left side</b> of the screen, {get_user_name()}? That's the <b>Flip to Hack</b> button! You can use it to go behind the scenes and hack the game with the <b>Toolbox</b>. Let's go!
}
{ flipped:
	-> level23_8
}
+ [(wait for: currentLevel)] #
{
    - currentLevel < workingLevel:
	-> bad_level(workingLevel) -> level23_7
}
+ [(wait for: flipped)] Flipped!
    -> level23_8



=== level23_8 ===
~ attractFTH = 0
{
	- not hasLockKey:
	# character: riley
	There's a lock here, but never fear, {get_user_name()}, here's the key! Click the lock to open it, and you'll be able to see the <b>Instructions</b>. They're the code version of the icons you dragged around on the front side of Sidetrack.
}
~ hasLockKey = 1
+ [(wait for: flipped)] #
    -> bad_state(workingLevel) -> level23_8
+ [(wait for: isLocked is 0)] Unlocked!
    -> level23_9

=== level23_9 ===
{ not came_from(-> bad_state):
    # character: riley
    Take a close look at the instructions. If you see anything weird, try and fix it.
    You can always Undo any mistakes you make (<b>Ctrl + Z</b>), and if everything get really bad, you can always reset the code by clicking the <b>Reload</b> button in the upper right. Got it?
}
+ [(wait for: flipped is 0)] #
    -> bad_state(workingLevel) -> level23_9
+ [Hint] I'm a little lost...
    -> level23_10
+ [(wait for: codeErrors is 0)] Fixed!
    -> level23_flip


=== level23_10 ===
{ not came_from(-> bad_state):
    # character: ada
    Look at that middle instruction, {get_user_name()}. I'm pretty sure <b>jumpp</b> isn't a real word - and I'm positive it's not a correct <b>instruction</b>, either!
}
+ [(wait for: flipped is 0)] #
    -> bad_state(workingLevel) -> level23_10
+ [(wait for: codeErrors is 0)] Fixed!
    -> level23_flip


=== level23_flip ===
~ attractFTH = 1
# character: riley
- Now <b>flip</b> back to the front of Sidetrack.
{ flipped == false:
	-> level23_play
}
// we know the player is in the toolbox, so their state can only unflip, which is what we want
+ [(wait for: flipped is 0)] Flipped!
-> level23_play


=== level23_play ===
~ attractFTH = 0
{ not came_from(-> bad_level):
    # character: riley
    Ok, press the <b>Play</b> button!
}
+ [(wait for: currentLevel)] #
{
    - currentLevel < workingLevel:
    -> bad_level(workingLevel) -> level23_play
    - currentLevel > workingLevel:
    # character: user
    Level {currentLevel -1} Complete!
    -> level24
}



=== level24 ===
~ workingLevel = 24
~ attractFTH = 1
{ not came_from(-> bad_level):
    # character: faber
    Wow, looks like this level has 2 errors! Time to <b>flip</b> the app and get to the <b>Instructions</b> again!
}
+ [(wait for: flipped)] Flipped!
    -> level24_2
+ [(wait for: currentLevel)] #
{
    - currentLevel < workingLevel:
    -> bad_level(workingLevel) -> level24
    - currentLevel > workingLevel:
    # character: saniel
    Gibbering heffalumps! That's quite a gambit, {get_user_name()}! I think I might say... how does it go... that "you're the man now, dog!"
    # character: user
    Level {currentLevel -1} Complete!
    -> level25
}


=== level24_2 ===
~ attractFTH = 0
{ not came_from(-> bad_state):
    # character: riley
    I think I can see the problem here!
}
+ [Hint] (Can I have a hint?)
-> level24_hints
+ [(wait for: flipped is 0)] #
    -> bad_state(workingLevel) -> level24_2
+ [(wait for: codeErrors is 0)] Fixed it!
    -> level24_3


=== level24_3 ===
~ attractFTH = 1
# character: saniel
- Good. You've corrected the errors, now <b>flip</b> back to the front of Sidetrack.
{ flipped == false:
	-> level24_4
}
// again, the only thing possible here is to unflip, so that's fine.
+ [(wait for: flipped)] Flipped!
-> level24_4


=== level24_4 ===
~ attractFTH = 0
{ not came_from(-> bad_level):
    # character: estelle
    Ok, let's give it a shot. Press the <b>Play</b> button! If you don't make it through, you might need different instructions, or a different order of instructions.
}
+ [(wait for: currentLevel)] #
{
    - currentLevel < workingLevel:
    -> bad_level(workingLevel) -> level24_4
    - currentLevel > workingLevel:
    # character: user
    Level {currentLevel -1} Complete!
    -> level25
}


=== level24_hints ===
{ not came_from(-> bad_state):
    # character: estelle
    Look for <b>Instructions</b> that might be spelled wrong, or that don't make any sense. Remember, if you accidentally create any new errors, you can always Undo your mistakes (<b>Ctrl + Z</b>) or reset the code by clicking the <b>Reload</b> button in the upper right.
}
+ [Hint] (Can I have a hint?)
-> level24_hints_2
+ [(wait for: flipped is 0)] #
    -> bad_state(workingLevel) -> level24_hints
+ [(wait for: codeErrors is 0)] Fixed it!
    -> level24_3


=== level24_hints_2 ===
{ not came_from(-> bad_state):
    # character: estelle
    Do you see where it says <tt>riley.fooorward();</tt>? I don't think that's correct..
}
+ [Hint] (Can I have a hint?)
    -> level24_hints_final
+ [(wait for: flipped is 0)] #
    -> bad_state(workingLevel) -> level24_hints_2
+ [(wait for: codeErrors is 0)] Fixed it!
    -> level24_3


=== level24_hints_final ===
{ not came_from(-> bad_state):
    # character: faber
    Oh, hey, I think I see another problem. Look at the capitalization in the code. I think it should be <tt>riley.jump()</tt>, not <tt>riley.<b>J</b>ump()</tt>!
}
+ [(wait for: flipped is 0)] #
    -> bad_state(workingLevel) -> level24_hints_final
+ [(wait for: codeErrors is 0)] Fixed it!
    -> level24_3


=== level25 ===
~ workingLevel = 25
{ not came_from(-> bad_level):
    # character: estelle
    Riley, did you remember to test your code? We've hit quite a lot of errors!
    # character: riley
    What makes you think they're accidents, Dr. Hart? *_^
    Let's <b>flip</b> and fix the code, {get_user_name()}!
}
+ [(wait for: codeErrors is 0)] #
{
    - currentLevel == workingLevel:
    # character: user
    Fixed it!
    -> level25_fix
}
+ [(wait for: currentLevel)] #
{
    - currentLevel < workingLevel:
    -> bad_level(workingLevel) -> level25
    - currentLevel > workingLevel:
    # character: user
    Level {currentLevel -1} Complete!
    -> level26
}


=== level25_fix ===
{ not came_from(-> bad_level):
    # character: saniel
    Well done, you've fixed the errors. Now, <b>flip</b> back and see if you can complete the level.
    Don't forget that you might still need to re-order or change in instructions to get through.
}
+ [(wait for: currentLevel)] #
{
    - currentLevel < workingLevel:
    -> bad_level(workingLevel) -> level25_fix
    - currentLevel > workingLevel:
    # character: user
    Level {currentLevel -1} Complete!
    -> level26
}



=== level26 ===
~ workingLevel = 26
{ not came_from(-> bad_level):
    # character: ada
    I don't think these errors are a mistake! Every instruction in this set is wrong, and statistically, that's very unlikely.
    # character: riley
    I think you're be on to something, Ada. :D
}
* ❯
    -> level26_2
+ [(wait for: flipped)]  Flipped!
    -> level26_2
+ [(wait for: currentLevel)] #
{
    - currentLevel < workingLevel:
    -> bad_level(workingLevel) -> level26
}


=== level26_2 ===
{ not came_from(-> bad_level):
    # character: riley
    Hey {get_user_name()}, you know the drill now! <b>Flip</b> and hack!
}
{ flipped == true:
	-> level26_3
}
+ [(wait for: flipped)] Flipped!
    -> level26_3
+ [(wait for: currentLevel)] #
{
    - currentLevel < workingLevel:
    -> bad_level(workingLevel) -> level26_2
}


=== level26_3 ===
+ [(wait for: flipped is 0)] #
    -> bad_state(workingLevel) -> level26_3
+ [(wait for: codeErrors is 0)] Fixed!
    -> level26_fix


=== level26_fix ===
{ not came_from(-> bad_level):
    # character: faber
    Just because you fixed the errors doesn't mean the instructions are correct, you'll probably have to re-order them... or maybe even re-write them completely!
}
+ [(wait for: currentLevel)] #
{
    - currentLevel < workingLevel:
    -> bad_level(workingLevel) -> level26_fix
    - currentLevel > workingLevel:
    # character: user
    Level {currentLevel -1} Complete!
    -> level27
}



=== level27 ===
~ workingLevel = 27
{ not came_from(-> bad_level):
    # character: ada
    It looks like this level has only two incorrect instructions - that's an improvement.
}
+ [(wait for: currentLevel)] #
{
    - currentLevel < workingLevel:
    -> bad_level(workingLevel) -> level27
    - currentLevel > workingLevel:
    # character: user
    Level {currentLevel -1} Complete!
    -> level28
}


=== level28 ===
~ workingLevel = 28
# character: faber
- Uh... That's a big wall. Can we jump a wall? Does that work?
* ❯
-> level28_2


=== level28_2 ===
# character: saniel
- You can experiment with that if you like, Faber, but judging from previous levels... probably not. I think we'll need a new tool to solve this puzzle.
* ❯
-> level28_3


=== level28_3 ===
# character: faber
- Darn. Well, do we have that tool?
* ❯
-> level28_4


=== level28_4 ===
# character: riley
- Not yet, Faber! I haven't finished getting everything into the web version of Sidetrack, yet. If you want to solve this puzzle right now, you'll have to go into Endless OS and check out Sidetrack there!
* ❯
-> level28_5


=== level28_5 ===
# character: saniel
{set_game_state("quest.Sidetrack2/complete", true)}
{set_game_state("quests.achievements/sidetrack2-complete", true)}
- Ahem. I think I speak for all of us, here, when I say that we've had a great time with you, {get_user_name()}. I hope we'll see you soon in Endless OS!
-> END
