=== level23 ===
# character: riley
- Hey, check out that instruction in the middle. That's not a good symbol!
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
- Hmm. I think we have 2 problems - First, that instruction seems to be an error of some kind. Second, even if you put it somewhere else, we need a <b>jump()</b> to cross those pits.
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
- Ahem. A line of pits, an invalid instruction... It <b>appears</b> we're stuck. But I don't think so! Riley, is there a way for us to look into the code and debug that instruction?
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
- You got it, Dr. Rowe! That's exactly what the next step is. Do you see that button on the <b>left side</b> of the screen, Hacker? That's the <b>Flip to Hack</b> button! You can use it to go behind the scenes and take a tour under the hood of the game with the <b>Toolbox</b>. Let's go!
{ flipped:
	-> level23_cont_8
}
* [(wait for: flipped)]  Flipped!
-> level23_cont_8


=== level23_cont_8 ===
~ attractFTH = 0
~ hasLockKey = 1
# character: riley
- Here's the key, Hacker! Click the lock to open it, and you'll be able to see the <b>Instructions</b>. They're the code version of the icons you used on the front side of Sidetrack.
* [(wait for: isLocked is 0)]  Unlocked!
-> level23_cont_10
* [(wait for: currentLevel is 24)] Level {currentLevel -1} Complete!
-> level24


=== level23_cont_10 ===
# character: riley
- Let's take a close look at the instructions. When you write code, it has to be <b>exactly</b> how the computer expects... So, you see anything weird?
* [👍] I see it!
-> level23_cont_11
* [👎] I'm a little lost.
-> level23_cont_12
* [(wait for: codeErrors is 0)] Fixed it!
-> level23_flip


=== level23_cont_12 ===
# character: ada
- Look at that middle instruction, Hacker. I'm pretty sure <b>jumpp</b> isn't a real word - and I'm positive it's not a correct <b>instruction</b>, either! Fix that, <b>flip</b> back to the front of Sidetrack, and press the <b>Play</b> button!
* [(wait for: currentLevel is 24)] Level {currentLevel -1 } Complete!
-> level24
* [(wait for: codeErrors is 0)] Fixed it!
-> level23_flip

=== level23_cont_11 ===
# character: riley
- Awesome! Fix the problem and <b>flip</b> back to the front of Sidetrack.
* [(wait for: codeErrors is 0)] Fixed it!
-> level23_flip

=== level23_flip ===
~ attractFTH = 1
# character: riley
- Awesome! You fixed it. Now <b>flip</b> back to the front of Sidetrack.
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
Wow, looks like this level has 2 errors! Time to head to the <b>Instructions</b> again by <b>flipping</b> the app!
* [(wait for: flipped)] Flipped!
-> level24_3
* [(wait for: currentLevel is 25)] Level {currentLevel -1} Complete!
-> level25


=== level24_3 ===
~ attractFTH = 0
# character: riley
I think I can see the problem here!
* [Hint] (Hint)
-> level24_3_hints
* [(wait for: codeErrors is 0)] Fixed it!
-> level24_flip
* [(wait for: currentLevel is 25)] Level {currentLevel -1} Complete!
-> level25


=== level24_flip ===
~ attractFTH = 1
# character: saniel
- Awesome! No errors anymore. Now <b>flip</b> back to the front of Sidetrack and check if you can get through the maze. If not you might need different instructions.
* [(wait for: flipped)]  Flipped back!
-> level24_play


=== level24_play ===
~ attractFTH = 0
# character: estelle
- Ok, let's give it a shot! Press the <b>Play</b> button.
* [(wait for: currentLevel is 25)] Level {currentLevel -1} Complete!
-> level25


=== level24_3_hints ===
# character: estelle
- Look for <b>Instructions</b> that might be spelled wrong, or that don't make any sense.
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
- Nice work. You got it. Although this has already been said, flip back and check if you can get through the maze. If not you might need different instructions.
* [(wait for: currentLevel is 26)] Level {currentLevel -1} Complete!
-> level26


=== level26 ===
# character: ada
- I'm not so sure this is a mistake. Every instruction in this set is wrong! Statistically, the probability of that occurring is quite low.
* [❯] ❯
-> level26_2
* [(wait for: currentLevel is 27)] Level {currentLevel -1} Complete!
-> level26_2


=== level26_2 ===
# character: riley
- Now you're getting it! Head to the <b>Instructions</b> again by <b>flipping</b>!
* [(wait for: flipped)] Flipped!
-> level26_3
* [(wait for: currentLevel is 27)] Level {currentLevel -1} Complete!
-> level27


=== level26_3 ===
# character: ada
- Once you've fixed any errors, you still might need to re-order the instructions in order to beat this level.
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
- Nice work. You got it!
* [(wait for: currentLevel is 28)] Level {currentLevel -1} Complete!
-> level28


=== level28 ===
# character: faber
- Uh... That's a big wall. Can we jump a wall? Does that work?
* [❯] ❯
-> level28_2


=== level28_2 ===
# character: saniel
- You can experiment with that if you like, but judging from previous levels... probably not. I think we'll need a new tool to solve this puzzle.
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
