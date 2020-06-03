=== level23 ===
# character: riley
- Hey, check out that instruction in the middle of the set. That's not a good symbol!
* [❯] ❯
-> level23_2
* [(wait for: success is 0)] Level {currentLevel} Failed!
-> level23_fail
* [(wait for: flipped)] Flipped!
-> level23_fail


=== level23_2 ===
# character: ada
- Well, I suppose we should try out the level anyway, just to see what happens...
* [(wait for: success is 0)] Level {currentLevel} Failed!
-> level23_fail
* [(wait for: flipped)] Flipped!
-> level23_fail


=== level23_fail ===
# character: estelle
- I think we actually have 2 problems - First, the middle instruction looks like an error. Second, even if you put that error somewhere else, we still need a <b>jump()</b> to cross those pits!
{ flipped == true:
	-> level23_fail_2
}
* [❯] ❯
-> level23_fail_2
* [(wait for: flipped)] Flipped!
-> level23_fail_2


=== level23_fail_2 ===
# character: estelle
- Good thing I know just the person to help! Saniel, are you there?
{ flipped == true:
	-> level23_cont_3
}
* [❯] ❯
-> level23_cont_3
* [(wait for: flipped)] Flipped!
-> level23_cont_3


=== level23_cont_3 ===
# character: saniel
- What? Yes, yes, I am here. I was... <i>inemuri</i>, as the Japanese say. Sleeping while present, if you will.
{ flipped == true:
	-> level23_cont_4
}
* [❯] ❯
-> level23_cont_4
* [(wait for: flipped)] Flipped!
-> level23_cont_4


=== level23_cont_4 ===
# character: saniel
- Let's see what we have. A line of pits, an invalid instruction... It <b>appears</b> we're stuck, but I don't think so! Riley, is there a way for us to look into the code and debug that instruction?
{ flipped == true:
	-> level23_cont_5
}
* [❯] ❯
-> level23_cont_5
* [(wait for: flipped)] Flipped!
-> level23_cont_5


=== level23_cont_5 ===
~ attractFTH = 1
# character: riley
- You got it, Dr. Rowe! That's exactly what the next step is. Do you see that button on the <b>left side</b> of the screen, {get_user_name()}? That's the <b>Flip to Hack</b> button! You can use it to go behind the scenes and hack the game with the <b>Toolbox</b>. Let's go!
{ flipped:
	-> level23_cont_8
}
* [(wait for: flipped)]  Flipped!
-> level23_cont_8


=== level23_cont_8 ===
~ attractFTH = 0
~ hasLockKey = 1
# character: riley
- There's a lock here, but never fear, {get_user_name()}, here's the key! Click the lock to open it, and you'll be able to see the <b>Instructions</b>. They're the code version of the icons you dragged around on the front side of Sidetrack.
* [(wait for: isLocked is 0)]  Unlocked!
-> level23_cont_10
* [(wait for: currentLevel is 24)] Level {currentLevel -1} Complete!
-> level24


=== level23_cont_10 ===
# character: riley
- Take a close look at the instructions. When you write code, it has to be <b>exactly</b> how the computer expects... So, do you see anything weird? Try and fix any problems you see. You can always Undo any mistakes you make (<b>Ctrl + Z</b>), and if everything get really bad, you can always  reset the code by clicking the <b>Reload</b> button in the upper right.
* [👍] I think I see the problem!
-> level23_cont_11
* [👎] I'm a little lost.
-> level23_cont_12
* [(wait for: codeErrors is 0)] Fixed it!
-> level23_flip


=== level23_cont_12 ===
# character: ada
- Look at that middle instruction, {get_user_name()}. I'm pretty sure <b>jumpp</b> isn't a real word - and I'm positive it's not a correct <b>instruction</b>, either! Fix that, <b>flip</b> back to the front of Sidetrack, and then press the <b>Play</b> button!
* [(wait for: currentLevel is 24)] Level {currentLevel -1 } Complete!
-> level24
* [(wait for: codeErrors is 0)] Fixed it!
-> level23_flip

=== level23_cont_11 ===
# character: riley
- Awesome! Fix the problem, <b>flip</b> back to the front of Sidetrack, and then press the <b>Play</b> button!
* [(wait for: codeErrors is 0)] Fixed it!
-> level23_flip

=== level23_flip ===
~ attractFTH = 1
# character: riley
- Awesome, I think you fixed it! Now <b>flip</b> back to the front of Sidetrack.
* [(wait for: flipped)]  Flipped back!
-> level23_play

=== level23_play ===
~ attractFTH = 0
# character: riley
- Ok, let's give it a shot! Press the <b>Play</b> button.
* [(wait for: currentLevel is 24)] Level {currentLevel -1} Complete!
-> level24

=== level24 ===
~ attractFTH = 1
# character: faber
Wow, looks like this level has 2 errors! Time to <b>flip</b> the app and get to the <b>Instructions</b> again!
* [(wait for: flipped)] Flipped!
-> level24_3
* [(wait for: currentLevel is 25)] Level {currentLevel -1} Complete!
-> level25


=== level24_3 ===
~ attractFTH = 0
# character: riley
- I think I can see the problem here!
* [Hint] (Hint)
-> level24_3_hints
* [(wait for: codeErrors is 0)] Fixed it!
-> level24_flip
* [(wait for: currentLevel is 25)] Level {currentLevel -1} Complete!
-> level25


=== level24_flip ===
~ attractFTH = 1
# character: saniel
- Awesome! No errors anymore. Now <b>flip</b> back to the front of Sidetrack.
* [(wait for: flipped)]  Flipped back!
-> level24_play


=== level24_play ===
~ attractFTH = 0
# character: estelle
- Ok, let's give it a shot. Press the <b>Play</b> button! If you don't make it through, you might need different instructions, or a different order of instructions.
* [(wait for: currentLevel is 25)] Level {currentLevel -1} Complete!
-> level25


=== level24_3_hints ===
# character: estelle
- Look for <b>Instructions</b> that might be spelled wrong, or that don't make any sense. Remember, if you accidentally create any new errors, you can always Undo your mistakes (<b>Ctrl + Z</b>) or reset the code by clicking the <b>Reload</b> button in the upper right.
* [Hint] (Hint)
-> level24_3_hints_2
* [(wait for: currentLevel is 25)] Level {currentLevel -1} Complete!
-> level25
* [(wait for: codeErrors is 0)] Fixed it!
-> level24_flip


=== level24_3_hints_2 ===
# character: estelle
- Do you see where it says <tt>riley.fooorward();</tt>? I don't think that's correct...
* [Hint] (Hint)
-> level24_3_hints_final
* [(wait for: currentLevel is 25)] Level {currentLevel -1} Complete!
-> level25
* [(wait for: codeErrors is 0)] Fixed it!
-> level24_flip


=== level24_3_hints_final ===
# character: faber
- Oh, hey, I think I see another problem. Look at the capitalization in the code. I think it should be <tt>riley.jump()</tt>, not <tt>riley.<b>J</b>ump()</tt>!
* [(wait for: currentLevel is 25)] Level {currentLevel -1} Complete!
-> level25
* [(wait for: codeErrors is 0)] Fixed it!
-> level24_flip


=== level25 ===
# character: estelle
- Riley, did you remember to test your code? We've hit quite a lot of errors!
* [(wait for: codeErrors is 0)] Fixed it!
-> level25_fix
* [(wait for: currentLevel is 26)] Level {currentLevel -1} Complete!
-> level26


=== level25_fix ===
# character: saniel
- Nice work, you fixed it. Remember, now we need to <b>flip</b> back and check if you can get through the maze. If not, you might need different instructions.
* [(wait for: currentLevel is 26)] Level {currentLevel -1} Complete!
-> level26


=== level26 ===
# character: ada
- I'm not so sure these errors are a mistake, every instruction in this set is wrong! Statistically, the probability of that occurring is quite low.
* [❯] ❯
-> level26_2
* [(wait for: currentLevel is 27)] Level {currentLevel -1} Complete!
-> level26_2


=== level26_2 ===
# character: riley
- Now you're getting it! Head to the <b>Instructions</b> again by <b>flipping</b> Sidetrack!
* [(wait for: flipped)] Flipped!
-> level26_3
* [(wait for: currentLevel is 27)] Level {currentLevel -1} Complete!
-> level27


=== level26_3 ===
# character: ada
- Once you've fixed the errors, you still might need to re-order the instructions in order to beat this level.
* [(wait for: codeErrors is 0)] Fixed it!
-> level26_fix
* [(wait for: currentLevel is 27)] Level {currentLevel -1} Complete!
-> level27


=== level26_fix ===
# character: faber
- Excellent!
* [(wait for: currentLevel is 27)] Level {currentLevel -1} Complete!
-> level27
* [(wait for: success is 0)] Level {currentLevel} Failed!
-> level26_reorder


=== level26_reorder ===
# character: faber
- You'll need to rearrange the instructions until you get it right.
* [(wait for: currentLevel is 27)] Level {currentLevel -1} Complete!
-> level27
* [(wait for: success is 0)] Level {currentLevel} Failed!
-> level26_reorder


=== level27 ===
# character: ada
- It looks like this level has only two incorrect instructions - that's an improvement.
* [(wait for: codeErrors is 0)] Fixed it!
-> level27_fix
* [(wait for: currentLevel is 28)] Level {currentLevel -1} Complete!
-> level28


=== level27_fix ===
# character: saniel
- Great work. You've got it!
* [(wait for: currentLevel is 28)] Level {currentLevel -1} Complete!
-> level28


=== level28 ===
# character: faber
- Uh... That's a big wall. Can we jump a wall? Does that work?
* [❯] ❯
-> level28_2


=== level28_2 ===
# character: saniel
- You can experiment with that if you like, Faber, but judging from previous levels... probably not. I think we'll need a new tool to solve this puzzle.
* [❯] ❯
-> level28_3


=== level28_3 ===
# character: faber
- Darn. Well, do we have that tool?
* [❯] ❯
-> level28_4


=== level28_4 ===
# character: riley
- Not yet, Faber! I haven't finished getting everything into this web version of Sidetrack, yet. If you want to solve this puzzle right now, you'll have to go into Endless OS and check out Sidetrack there!
* [❯] ❯
-> level28_5


=== level28_5 ===
# character: saniel
- Ahem. I think I speak for all of us, here, when I say that we've had a great time with you, {get_user_name()}. I hope we'll see you soon in Endless OS!
-> END
