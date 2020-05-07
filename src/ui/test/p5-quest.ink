INCLUDE common.ink
# main character: estelle

VAR code = ""

-> begin

=== begin ===
-> processing_1

=== processing_1 ===
# character: estelle
- Hey {get_user_name()}, I've got something <b>super</b> cool for you!
# character: estelle
- I've been learning a new programming language for making interactive art - I think it's right up your alley!
# character: estelle
- It's called <b>p5.js</b> - The "js" part comes from <b>JavaScript</b> - you've probably heard of it before, it runs a ton of websites.
# character: estelle
- Here's what I've figured out so far: The code is on the left, and the preview is on the right. As you type, the code will constantly try to run, and update the right side.
-> processing_2

=== processing_2 ===
# character: estelle
- Now let's change the code and see what happens. In the Text Editor, let's change the value of the variable “num” on Line 1 from 20 to 10.
+ [Hint] Can I have a hint?
-> processing_3error
+ [(wait for: code icontains "let num = 10;")](Done)
-> processing_3

=== processing_3error ===
# character: estelle
- Hey, no problem, I got so many errors when I first started. Good thing they tell you where the problem is!
You might have forgotten the <tt>;</tt>.
+ [(wait for: code icontains "let num = 10;")](Done)
-> processing_3

=== processing_3 ===
# character: estelle
- Where did all our lines go? Let's set the value of the num variable to 30.
+ [(wait for: code icontains "let num = 30;")](Done)
-> processing_4

=== processing_4 ===
- Next, let's change the space between the arcs. On Line 7, change the “step” command from 22 to 30.
+ [(wait for: code icontains "step = 30;")](Done)
-> processing_5

=== processing_5 ===
- Whoa! We're going to need a bigger window to contain this wave! Let's reduce our number of arcs from 30 to 23 to fit all that arc-y goodness.
+ [(wait for: code icontains "let num = 23;")](Done)
-> processing_6

=== processing_6 ===
# character: estelle
- On line 2, let's also enlarge the window size by changing <tt>createCanvas(600, 400);</tt>  to <tt>createCanvas(700, 500);</tt>.
+ [(wait for: code icontains "createCanvas(700, 500);")](Done)
-> processing_7

=== processing_7 ===
# character: estelle
- Does your wave fit in the window?
* [👍] Fits nicely!
-> processing_8
* [👎] No, not really.
-> processing_7_hint

=== processing_7_hint ===
# character: estelle
- Maybe you have to reduce the number of arcs some more. Or you make the canvas even bigger. Play with the values.
-> processing_8

=== processing_8 ===
# character: estelle
- Now let\'s have some fun with the thickness of the arcs. On line 6, let\'s change the <tt>strokeWeight</tt> from 5 to 25.
+ [(wait for: code icontains "strokeWeight(25);")](Done)
-> processing_9

=== processing_9 ===
# character: estelle
- Look at those crazy arcs! Let’s drop the <tt>strokeWeight</tt> down to 10 and have some fun with colors.
+ [(wait for: code icontains "strokeWeight(10);")](Done)
-> processing_10

=== processing_10 ===
# character: estelle
- Look for the <tt>stroke</tt> function, which is currently being run with 255.
- The stroke function changes the color of the strokes (which could be lines, arcs, ellipses, etc). Let's start by changing the stroke variable to 155.
+ [(wait for: code icontains "stroke(155);")](Done)
-> processing_11

=== processing_11 ===
# character: estelle
- Now your wave should be a grey color. Because we only have one stroke variable, our poor arcs can only be drawn with white, black, or shades of grey. Time for a pop of color!
- Lets add the red, green, and blue variables (aka “RGB”), and make the arcs red.
- Change the stroke variables to: <tt>(255, 0, 0)</tt>.
+ [(wait for: code icontains "stroke(255, 0, 0);")](Done)
-> processing_12

=== processing_12 ===
# character: estelle
- Let’s try out some more colors! Let’s change the stroke variables to (0, 255, 0) for some lucky green waves.
+ [(wait for: code icontains "stroke(0, 255, 0);")](Done)
-> processing_13

=== processing_13 ===
# character: estelle
- Now let’s try blending our RGB values: <tt>stroke(0, 255, 255)</tt>
+ [(wait for: code icontains "stroke(0, 255, 255);")](Done)
-> processing_14

=== processing_14 ===
# character: estelle
- Looks like green and blue make a lovely teal color! Why not explore and try reducing the numbers to see what happens. I love this purple color: (150, 0, 255)
- Play around with the color parameters. To learn more about working with RGB values, visit this website: <a href="http:\/\/web.stanford.edu\/class\/cs101\/image-rgb-explorer.html">Image RGB Explorer</a>.
+ [❯]
-> END
