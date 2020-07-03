=== play ===
- Let's go! Remember, my objective is to get to the exit, and try to avoid the walls!
-> end_level_check(3) -> level3_1


=== level3_1 ===
# character: ada
- Hey, {get_user_name()}, did you know that Riley actually made this game?
-> mid_level_check(4) -> level3_2

=== level3_2 ===
- Well, I didn't do everything... You helped with design, Ada, and Saniel helped me with the code, and Felix--
-> mid_level_check(4) -> level3_3

=== level3_3 ===
# character: faber
- Don't put yourself down, Riley! It takes a lot of skill to put something like this together.
-> mid_level_check(4) -> level3_4

=== level3_4 ===
# character: ada
- It does! Riley made this as one of her projects at The Academy - She had to own the project and manage it herself, but anyone around The Academy could help. I think it's easy to see why she's our star student!
-> mid_level_check(4) -> level3_5

=== level3_5 ===
- Aw, come on...don't make such a big deal out of it, it's embarassing -_-;;
- Um, let's concentrate on beating this level, {get_user_name()}!
-> end_level_check(4) -> level4


=== level4 ===
# character: saniel
- Oh ho! <b>Pits</b>, eh? I wonder how you'll cross those...
-> mid_level_check(5) -> level4_1

=== level4_1 ===
- You need to use the <b>Jump</b> instruction to cross <b>Pits</b>! There's a trick to it, though. <b>Jump</b> can only cross a <b>pit</b> if it's <b>directly</b> in front of you.
-> end_level_check(5) -> level5


=== level5 ===
-> end_level_check(6) -> level6


=== level6 ===
- BTW, those pits weren't easy to draw... it's tough trying to get that feeling of a deep, black hole, but only using colors.
-> mid_level_check(7) -> level6_1

=== level6_1 ===
# character: ada
- Riley, you did extremely well. I wish every student had your drive!
-> end_level_check(7) -> level7


=== level7 ===
# character: faber
- Hey Riley, I think your game has some <b>bugs</b>, LOL! What a cool bunch of robots. <tt>Beep. Boop. Hello. Faber. I. Am. A. Bugbot.</tt>
-> mid_level_check(8) -> level7_1

=== level7_1 ===
- I knew you'd like that one, Faber :D
-> mid_level_check(8) -> level7_2

=== level7_2===
# character: estelle
- Stay alert, {get_user_name()}! The bugbots move when you do, so you'll have to plan out your moves carefully.
# character: estelle
- Watch how the bugbots move and where they go, and think about the spaces they open up when they move.
-> mid_level_check(8) -> level7_3

=== level7_3 ===
- These bugbots <b>only move down</b>, never left or right, so that might let you find a... bug... in their behavior. ^_^
- Oh yeah, when they walk off the bottom, they reappear at the top! So, keep your eye out for that!
-> end_level_check(8) -> level8


=== level8 ===
-> end_level_check(9) -> level9


=== level9 ===
-> end_level_check(10) -> level10


=== level10 ===
- Time for new bugbots! This new type <b>only moves up</b>, just like the first <b>only moves down</b>. Pay attention to which way they're facing!
-> end_level_check(11) -> level11


=== level11 ===
-> end_level_check(12) -> level12


=== level12 ===
-> end_level_check(13) -> level13


=== level13 ===
# character: ada
- Bugbots, pits... Riley, you've done a great job here.
-> end_level_check(14) -> level14


=== level14 ===
# character: felix
- <b><i>mjau ^ = ^ mjav \/\/\\\\ ngiyaw \/\\ ^  miav, meow!</i></b>
~ controlsCutscene = 1
* [(wait for: controlsCutscene is 0)](???)
-> level14_postcs


=== level14_postcs ===
# character: faber
- What was <b>that</b>? Riley?
-> mid_level_check(15) -> level14_postcs_2

=== level14_postcs_2 ===
# character: ada
- I think we have a problem! Riley, it looks like the controls just disappeared. Any ideas?
-> mid_level_check(15) -> level14_postcs_3

=== level14_postcs_3 ===
- I was wondering when Felix would show up! For once, he's on time, and doing exactly what I asked him to. <b>Now</b> things are going to get interesting!
-> mid_level_check(15) -> level14_postcs_4

=== level14_postcs_4 ===
# character: estelle
- Look, {get_user_name()} - there's a pre-made set of instructions already here.
-> mid_level_check(15) -> level14_postcs_5

=== level14_postcs_5 ===
- And now, we're in hard-mode! See that <b>Play</b> button on the left? Try pushing it.
-> end_level_check(15) -> level15


=== level15 ===
- In this mode, you have to plan all your moves around the level in advance. Drag the instructions into the order you want, then press <b>play</b> to start our journey through the maze. If you think it through, you'll pass these levels in no time.
-> end_level_check(16) -> level16


=== level16 ===
# character: saniel
- Hmm, there's no way these instructions could finish this level in this order! You'll have to re-order them to get through.
-> mid_level_check(17) -> level16_2

=== level16_2 ===
- Drag and drop the instructions to re-order them, and press <b>Play</b> to start your run! Oh yeah, and once you press play... no changing instructions around until you succeed or fail!
-> end_level_check(17) -> level17


=== level17 ===
# character: saniel
- Fantastic work, you practically sailed through that level, {get_user_name()}. Excellent planning!
-> mid_level_check(18) -> level17_2

=== level17_2 ===
# character: saniel
- Riley, I can see the progression from puzzle-solving to strategic planning in this game, and I'm impressed.
-> mid_level_check(18) -> level17_3

=== level17_3 ===
- Woah, t-thanks, Saniel! That means a lot to me.
-> end_level_check(18) -> level18


=== level18 ===
# character: faber
- Hey Riley, how's your maze going?
-> mid_level_check(19) -> level18_2

=== level18_2 ===
- It's pretty... a-maze-ing! :D Seriously, {get_user_name()}, I hope you're having as much fun as we are. It's so cool to see someone play something I helped build!
-> mid_level_check(19) -> level18_3

=== level18_3 ===
# character: ada
- Look at your instructions carefully! You've only got one jump, so use it well - you might need to use a different way of getting around the pits.
-> end_level_check(19) -> level19


=== level19 ===
- Let's turn up the heat - now you've got 2 Jumps.
-> mid_level_check(20) -> level19_2

=== level19_2 ===
# character: ada
- This level might look easier, but now you only have a single forward instruction. I think there's only one spot in this level that you absolutely <b>must</b> move forward, and not down or up. Can you find it?
-> end_level_check(20) -> level20


=== level20 ===
# character: faber
- I'd say something about this level bringing me <b>down</b>, but this game is too cool for that! Still, how are you supposed to move forward when all you can do is go down? I guess we can't do anything else but try it out!
-> end_level_check(21) -> level21


=== level21 ===
# character: ada
- You know, you don't have to have a pit in front of you to use a <b>jump</b> instruction. Maybe you could use a <b>jump</b> to go forward? You never know when that will come in handy!
-> end_level_check(22) ->
- Wow, fantastic job, {get_user_name()}! That's 21 levels solved! Let's celebrate your progress with a Badge!
~ set_game_state("quests.achievements/sidetrack1-complete", true)
~ set_game_state("quest.Sidetrack1/complete", true)
* ❯
  -> hack
