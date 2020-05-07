=== level2 ===
- Good choice. I like playing as well. We can hack that thing later. Help me get to the exit again.
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
