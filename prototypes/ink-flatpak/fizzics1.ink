// Define quest properties:
VAR main_character = "ada"
VAR debug = true

// These are actually changed by the game:
VAR current_level = 7
VAR flipped = false
VAR ball_dropped = false

-> begin
// -> test

=== test ===
{ The first one | The 2nd one | The last one }
+ (next) [NEXT] -> test
+ {next > 1} [DONE] -> END

=== debug_and_hack(-> return_to) ===
{ debug:
  + [🐛] -> debug_variables -> return_to
}

=== debug_variables ===
{*I feel a hacker today.*|}
You are at level: {current_level}
The app is: {flipped: | not} flipped.
The ball is: {ball_dropped: | not} dropped.
+ [Set next level]
  ~ current_level++
  ~ ball_dropped = false
+ {current_level != 8} [Set level 8]
  ~ current_level = 8
  ~ ball_dropped = false
+ {current_level == 8} [Set previous level]
  ~ current_level = 5
  ~ ball_dropped = false
+ [{not flipped:Flip|Flip back}]
  ~ flipped = not flipped
+ [{not ball_dropped:Drop ball|Reset level}]
  ~ ball_dropped = not ball_dropped
+ [Cancel]
- ->->

=== begin ===
Can't wait to see if someone can finally get to my level in Fizzics!
<- debug_and_hack(-> begin)
+ [Start] -> check_level

=== check_level ===
{
- current_level > 8:
  -> success
- current_level == 8:
  {
    - flipped: -> flip
    - else:
       // Here "flip" checks if the "flip" knot was ever reached,
       // not if the app is currently flipped. For that we have the "flipped" variable.
       {
      - flip: {ball_dropped: -> with_ball_dropped} -> level_8_again
      - else: {ball_dropped: -> with_ball_dropped} -> level_8
     }
  }
- else:
  -> previous_level
}

=== previous_level ===
{
- level_8:
  {No, wait, go|Go} back to Level 8.
  <> You'll need to get through that one before going further.
- else:
  {Great. Now get|Get} to Level 8. That's where it really gets fun.
}
<- debug_and_hack(-> check_level)
+ [Give me a hint]
  These work just like the others: fling the orange ball at the target.
  ++ [What was my goal?]-> check_level

=== level_8 ===
{ Level 8! You made it! Okay, so give it a shot ;) | Something's wrong with this level, how can you pass it? }
<- debug_and_hack(-> check_level)
+ [Give me a hint]
  You're gonna need to hack the game to beat it.
  <> Press the Flip button.
  ++ [What was my goal?]-> check_level

=== flip ===
{ Amazing! You're in. Now just see | See }
<> what changes you need to make to beat the level.
<- debug_and_hack(-> check_level)
+ (hint) [Give me a hint]
  {&Try making the radius really small.|Play around with the gravity and see what happens!}
  ++ [Give me another hint]-> hint
  ++ [What was my goal?]-> check_level

=== level_8_again ===
{Okay, see if you can beat the level now.|}
<- debug_and_hack(-> check_level)
+ [Give me a hint]
  You're gonna need to hack the game to beat it.
  <> Maybe you need to press the Flip button again? -> check_level

=== with_ball_dropped ===
{Oh no!|} One of your balls exploded.
<> You're not going to be able to beat the level now, so press the Reset button.
<- debug_and_hack(-> check_level)
+ [Give me a hint]
  See that button at the top with an arrow? That's the Reset button. -> check_level
- ->->

=== success ===
{
- level_8:
  Slayyy! I knew you'd ace that. # character:riley # animation:hurray # sound:success // We can pass dialogue options this way.
- else:
  Hold on! You already beat Level 8? Brilliant.
}
<> See you at the Clubhouse!
-> END

=== abort ===
Check ya later! Come find me in the Clubhouse if you want to play again soon!
-> END
