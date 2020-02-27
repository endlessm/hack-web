# main character: ada

VAR goal_reached = false
VAR flipped = false

-> begin
// -> in_toolbox

=== begin ===
Hi Riley.
Hey Ada! # character: riley
-> in_canvas

=== in_toolbox ===
{
- in_toolbox == 1: { stopping:
  - Great, you are in the toolbox now. You can hack the app from here.
  - See the two engines? You have to activate them.
  - Activate the engines, then flip back.
  }
- else: { stopping:
  - At the toolbox again. We should try something else.
  - See the two engines? You have to activate them.
  - Activate the engines, then flip back.
  }
}
+ (hint) {hint < 2} [Give me {a|another} hint] -> in_toolbox
+ [(wait for: flipped foo)] -> check_success -> in_canvas
-> success

=== in_canvas ===
{
- in_canvas == 1: { stopping:
  - To win, activate the two engines.
  - You will have to hack the app.
  - Use the button on the left to Flip the app.
  }
- else: { stopping:
  - Hmm that didn't quite work. You will need to hack the app again.
  - Use the button on the left to Flip the app.
  - Then activate the engines and flip back.
  }
}
+ (hint) {hint < 2} [Give me a{|nother} hint] -> in_canvas
+ [(wait for: flipped)] -> in_toolbox

=== check_success ===
{
- goal_reached: -> success
- else: ->->
}

=== success ===
Yes! You did it!
-> END
