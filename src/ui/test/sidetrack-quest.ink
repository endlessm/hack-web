INCLUDE common.ink
VAR flipped = 0
VAR attractFTH = 0
VAR codeErrors = 0

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

VAR hasLockKey = 0
VAR isLocked = 1

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
    -> level2
}
* [(wait for: currentLevel is 2)] Level {currentLevel -1 } Complete!
-> level2


=== level2 ===
# character: riley
- Haha, another level! What, you thought I'd just let you go after the exit? Nope, this is only the beginning!
* [(wait for: currentLevel is 3)] Level {currentLevel -1 } Complete!
-> level3


=== level3 ===
# character: faber
- Nice job on the music, Riley. Looks like all our jam sessions paid off!
* [(wait for: currentLevel is 4)] Level {currentLevel -1 } Complete!
-> level4


=== level4 ===
# character: saniel
-Oh ho! <b>Pits</b>, eh? I wonder how you'll cross those...
* [❯] ❯
-> level4_1
* [(wait for: currentLevel is 5)] Level {currentLevel -1 } Complete!
-> level4_1


=== level4_1 ===
# character: riley
-You need to use the <b>Jump</b> instruction to cross <b>Pits</b>! There's a trick to it, though. <b>Jump</b> can only cross a <b>pit</b> if it's <b>directly</b> in front of you.
{ currentLevel == 5:
    - Great job on that level!
    -> level5
}
* [(wait for: currentLevel is 5)] Level {currentLevel -1 } Complete!
-> level5


=== level5 ===
* [(wait for: currentLevel is 6)] Level {currentLevel -1 } Complete!
-> level6


=== level6 ===
# character: riley
-BTW, those pits weren't easy to draw... it's tough trying to get that feeling of a deep, black hole, but only using colors.
* [❯] ❯
-> level6_1
* [(wait for: currentLevel is 7)] Level {currentLevel -1 } Complete!
-> level6_1


=== level6_1 ===
# character: ada
-Riley, you did extremely well. I wish every student had your drive!
{ currentLevel == 7:
    - Great job on that level!
    -> level7
}
* [(wait for: currentLevel is 7)] Level {currentLevel -1 } Complete!
-> level7


=== level7 ===
# character: faber
-Hey Riley, I think your game has some <b>bugs</b>, LOL! What a cool bunch of robots. `Beep. Boop. Hello. Faber. I. Am. A. Bugbot.`
* [❯] ❯
-> level7_1
* [(wait for: currentLevel is 8)] Level {currentLevel -1 } Complete!
-> level7_1



=== level7_1 ===
# character: riley
-I knew you'd like that one, Faber :D
{ currentLevel == 8:
    -> level7_2
- else:
    * [❯] ❯
    -> level7_2
    * [(wait for: currentLevel is 8)] Level {currentLevel -1 } Complete!
    -> level7_2
}



=== level7_2===
# character: estelle
-Stay alert, {get_user_name()}! The bugbots move when you do, so you'll have to plan out your moves carefully.
-Watch how the bugbots move and where they go, and think about the spaces they open up when they move.
{ currentLevel == 8:
    -> level7_3
- else:
    * [❯] ❯
    -> level7_3
    * [(wait for: currentLevel is 8)] Level {currentLevel -1 } Complete!
    -> level7_3
}


=== level7_3 ===
# character: riley
-These bugbots <b>only move down</b>, never left or right, so that might let you find a... bug... in their behavior.
Oh, and when they walk off the bottom, they reappear at the top! So keep your eye out for that!
{ currentLevel == 8:
    - Great job on that level!
    -> level8
}
* [(wait for: currentLevel is 8)] Level {currentLevel -1 } Complete!
-> level8


=== level8 ===
* [(wait for: currentLevel is 9)] Level {currentLevel -1 } Complete!
-> level9


=== level9 ===
* [(wait for: currentLevel is 10)] Level {currentLevel -1 } Complete!
-> level10


=== level10 ===
# character: riley
-Time for new bugbots! This new type <b>only moves up</b>, just like the first <b>only moves down</b>. Be sure to note which way they're facing...
* [(wait for: currentLevel is 11)] Level {currentLevel -1 } Complete!
-> level11


=== level11 ===
* [(wait for: currentLevel is 12)] Level {currentLevel -1 } Complete!
-> level12


=== level12 ===
* [(wait for: currentLevel is 13)] Level {currentLevel -1 } Complete!
-> level13


=== level13 ===
# charcter: ada
-Bugbots, pits... Riley, you've done a great job here.
* [(wait for: currentLevel is 14)] Level {currentLevel -1 } Complete!
-> level14


=== level14 ===
# character: felix
- <i>mjau ^ = ^ mjav \/\/\\\\ ngiyaw \/\\ ^  miav, meow!</i>
~ controlsCutscene = 1
* [(wait for: controlsCutscene is 0)](???)
-> level14_postcs


=== level14_postcs ===
# character: faber
-What was <b>that</b>? Riley?
{ currentLevel == 15:
    -> level14_postcs_2
- else:
    * [❯] ❯
    -> level14_postcs_2
    * [(wait for: currentLevel is 15)] Level {currentLevel -1 } Complete!
    -> level14_postcs_2
}


=== level14_postcs_2 ===
# character: ada
-I think we have a problem! Riley, it looks like the manual controls for your maze just disappeared. Any ideas?
{ currentLevel == 15:
    -> level14_postcs_3
- else:
    * [❯] ❯
    -> level14_postcs_3
    * [(wait for: currentLevel is 15)] Level {currentLevel -1 } Complete!
    -> level14_postcs_3
}


=== level14_postcs_3 ===
# character: riley
-I was wondering when Felix would show up. For once, he's on time and doing exactly what I asked him to. <b>Now</b> things are going to get interesting!
{ currentLevel == 15:
    -> level14_postcs_4
- else:
    * [❯] ❯
    -> level14_postcs_4
    * [(wait for: currentLevel is 15)] Level {currentLevel -1 } Complete!
    -> level14_postcs_4
}


=== level14_postcs_4 ===
# character: estelle
-Look, {get_user_name()} - there's a pre-made set of instructions already here.
{ currentLevel == 15:
    -> level14_postcs_5
- else:
    * [❯] ❯
    -> level14_postcs_5
    * [(wait for: currentLevel is 15)] Level {currentLevel -1 } Complete!
    -> level14_postcs_5
}


=== level14_postcs_5 ===
# character: riley
-And now, we enter hard-mode! See that <b>Play</b> button? Try pushing it.
{ currentLevel == 15:
    - Great job on that level!
    -> level15
}
* [(wait for: currentLevel is 15)] Level {currentLevel -1 } Complete!
-> level15


=== level15 ===
# character: riley
-In this mode, we can still move around the level, but you'll have to plan all your moves in advance. Just think it through, and you'll pass these levels in no time.
Once your instructions are laid out in the order you want them, press <b>play</b> to start our journey through the maze.
* [(wait for: currentLevel is 16)] Level {currentLevel -1 } Complete!
-> level16


=== level16 ===
# character: saniel
-Hmm, there's just no way this set of instructions could finish this level. You'll have to re-order them.
* [❯] ❯
-> level16_2
* [(wait for: currentLevel is 17)] Level {currentLevel -1 } Complete!
-> level16_2


=== level16_2 ===
# character: riley
-Drag and drop instructions to re-order them, and press <b>Play</b> to start your run! Oh yeah, and once you press play... no changing instructions around until you succeed or fail!
{ currentLevel == 17:
    - Great job on that level!
    -> level17
}
* [(wait for: currentLevel is 17)] Level {currentLevel -1 } Complete!
-> level17


=== level17 ===
# character: saniel
-Fantastic work, you practically sailed through that level, {get_user_name()}. Excellent planning!
* [❯] ❯
-> level17_2
* [(wait for: currentLevel is 18)] Level {currentLevel -1 } Complete!
-> level17_2


=== level17_2 ===
# character: saniel
-Riley, I can see the progression from puzzle-solving to strategic planning in this game, and I'm impressed.
{ currentLevel == 18:
    -> level17_3
- else:
    * [❯] ❯
    -> level17_3
    * [(wait for: currentLevel is 18)] Level {currentLevel -1 } Complete!
    -> level17_3
}


=== level17_3 ===
# character: riley
-Woah. T-thanks, Saniel! That means a lot to me.
{ currentLevel == 18:
    - Great job on that level!
    -> level18
}
* [(wait for: currentLevel is 18)] Level {currentLevel -1 } Complete!
-> level18


=== level18 ===
# character: faber
-Hey Riley, how's your maze going?
* [❯] ❯
-> level18_2
* [(wait for: currentLevel is 19)] Level {currentLevel -1 } Complete!
-> level18_2


=== level18_2 ===
# character: riley
-It's pretty... a-maze-ing! :D Seriously, {get_user_name()} I hope you're having as much fun as we are. It's so cool to see someone play something I helped build!
{ currentLevel == 19:
    -> level18_3
- else:
    * [❯] ❯
    -> level18_3
    * [(wait for: currentLevel is 18)] Level {currentLevel -1 } Complete!
    -> level18_3
}


=== level18_3 ===
# characte: ada
-Ah hah, look at your instructions carefully. You've only got one jump, so use it well - you might need other ways of getting around the pits.
{ currentLevel == 19:
    - Great job on that level!
    -> level19
}
* [(wait for: currentLevel is 19)] Level {currentLevel -1 } Complete!
-> level19


=== level19 ===
# character: riley
-Let's turn the heat up - now you've got 2 Jumps.
* [❯] ❯
-> level19_2
* [(wait for: currentLevel is 20)] Level {currentLevel -1 } Complete!
-> level19_2


=== level19_2 ===
# character: ada
-It might look easier, but now you only have a single forward instruction. I'm pretty sure there's only one spot in this level that you absolutely <b>must</b> move forward, and not down or up. Can you find it?
{ currentLevel == 20:
    - Great job on that level!
    -> level20
}
* [(wait for: currentLevel is 20)] Level {currentLevel -1 } Complete!
-> level20


=== level20 ===
# character: faber
I'd say something about this level bringing me <b>down</b>, but this game is too cool for that. How are you supposed to move forward when all you can do is go down, though? Might as well give it a shot!
* [(wait for: currentLevel is 21)] Level {currentLevel -1 } Complete!
-> level21


=== level21 ===
# character: ada
-You know, you don't have to have a pit in front of you to use a jump instruction. Maybe you could use jump to go forward? You never know when that will come in handy!
* [(wait for: currentLevel is 22)] Level {currentLevel -1 } Complete!
-> level22


=== level22 ===
# characer: ada
-This looks... familliar.
* [❯] ❯
-> level22_2
* [(wait for: currentLevel is 23)] Level {currentLevel -1 } Complete!
-> level22_2


=== level22_2 ===
# character: faber
-With a twist, though. Let's get to it!
{ currentLevel == 23:
    - Great job on that level!
    -> level23
}
* [(wait for: currentLevel is 23)] Level {currentLevel -1 } Complete!
-> level23


=== level23 ===
# character: ada
-Interesting, I wonder what happens if we just press Play and try to forge ahead?
-There's no way forward unless we at least try!
# wait for the player to die, as they cannot pass this level
* [(wait for: success is 0)](Level {currentLevel -1 } Failed!)
-> quest_successful


=== quest_successful ===
# character: saniel
- Well, at least we've proved that there's clearly an error. We’ll need to see the code to debug it, though.
* [❯] ❯
-> qs2


=== qs2 ===
# character: ada
Yes, I see where this is going - I think we've reached a good point to take a break, I'm sure we could all use it.
* [❯] ❯
-> qs3


=== qs3 ===
# character: faber
Congrats, Riley - This is an awesome project you've pulled together. We'll meet back up here later to keep going, and debug that broken instruction. See you in the next activity!
-> END
