INCLUDE global-fxns.ink
# main character: riley
-> begin

VAR code = ""

=== begin ===
-> p5jsintro3_1

=== p5jsintro3_1 ===
-Welcome back! I'm excited to show you what I figured out - this is gonna be fun!
* [❯] Open https:\/\/editor.p5js.org/madetohack/sketches/nrUIQZX5
-> p5jsintro3_2

=== p5jsintro3_2 ===
-So, remember our previous program? I've recreated it over on the left. Let's take a closer look at the two main parts of this program: <tt>setup()</tt> and <tt>draw()</tt>
-<tt>setup()</tt> happens once, at the very beginning. Right now, all it does is create the canvas, the place where we draw things, and tells it what size to be.
-<tt>draw()</tt> happens over and over again, as long as the program is running. Every few thousandths of a second, it runs the <tt>draw()</tt> code again. That's why it looks like the circle is moving with our mouse. The program redraws it at our current mouseX and mouseY almost a thousand times a second!
-This program also re-draws the background each time, covering up the last circle we drew. But what would happen if we didn't redraw the background each time? What if we only drew it once, at the very beginning? Let's find out! If we move the <tt>background()</tt> line of code into the <tt>setup()</tt> function, it will only happen once, right after the canvas is created.
-Try it, move the <tt>background();</tt> line to right after the <tt>createCanvas();</tt> line. Make sure you put it before the <tt>\}</tt> so it's in the right place.
* [❯] CODE: User moves background() into setup.
-> p5jsintro3_3

=== p5jsintro3_3 ===
-Woah! Is that what you thought would happen? If you want to start over, you can just hit the play button again.
-So... did you notice how there's always a circle at the top left corner when you start? Why do you think that is?
-Let's figure it out. Where is your mouse when you click Play?
* [In the middle of the canvas]
-> p5jsintro3_3_inside
* [Outside the canvas]
-> p5jsintro3_3_outside

=== p5jsintro3_3_inside ===
- If you're clicking the Play button in the upper left corner of the window, your mouse can't be inside the p5.js canvas, right? So the cursor has to be outside the canvas!
* [❯]
-> p5jsintro3_4

=== p5jsintro3_3_outside ===
- Exactly! Your cursor is outside the canvas. So...
* [❯]
-> p5jsintro3_4

=== p5jsintro3_4 ===
-The program can't go lower than 0 or higher than 600, so it just takes the numbers that represent where it last "saw" the cursor in the canvas.
-If your mouse is outside the canvas, it draws the circle as close as it can. Try weaving your mouse in and out of the canvas and decorating all the corners without touching the middle!
-If you still have an outline around your circle, try using <tt>strokeWeight(0)</tt> to get rid of it and have a true paintbrush.
+ [❯]
-> p5jsintro3_6

=== p5jsintro3_6 ===
-Woohoo! What else can you paint? I'lll see you next time - we're going to keep digging deeper into <b>p5.js</b> and see what we can find!
+ [❯]
-> END
