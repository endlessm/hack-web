// INCLUDE global-fxns.ink
// includes broken as of 3/31
# main character: riley
-> begin

VAR code = ""

===function open_web_page(page)===
~ return "PLACEHOLDER: Opening " + page

===function get_user_name===
~ return "DefaultUser"

===function display_code(snip)===
~ return "PLACEHOLDER: Displaying Code Snippet:  " + snip

=== begin ===
-> p5jsintro2_1

=== p5jsintro2_1 ===
-Hi there! I'm glad you're back, <b>{get_user_name()}</b> - I've got something awesome to show you!
-First things first - let's get back to the p5.js code editor.
{open_web_page("https:\/\/editor.p5js.org\/madetohack\/sketches/4Ko8JXYN")}
* [❯] Wait for open webpage
-> p5jsintro2_2

=== p5jsintro2_2 ===
-Last time we made the background prettier using the code <tt>background('green')</tt> or <tt>background('#76EECF')</tt>, and then we drew a circle on top of it.
-The circle code was <tt>circle(100,200,50)</tt> giving it an X-coordinate of 100, a Y-coordinate of 200, and a diameter of 50.
- Now, let's see about making that circle a different color. To do that, we have to use a command called <tt>fill()</tt>. Make a new line before the <tt>circle()</tt> command, and type <tt>fill('blue');</tt>. Then run the code!
* [❯] CODE: User runs code with fill('blue')
-> p5jsintro2_3

=== p5jsintro2_3 ===
-Nice, but what about that black line around the outside? That line is the <b>stroke</b>, and we can get rid of it by typing <tt>strokeWeight(0);</tt> on a new line.
-Of course, we could also make it thicker by typing <b>strokeWeight(10)</b> instead - the number in parentheses is how many pixels wide you want it.
-And we can even change the color of the outline - try <tt>stroke('red');</tt> or <tt>stroke('#E84904');</tt>
+ [❯] CODE: User changes stroke to a color and a weight
-> p5jsintro2_4

=== p5jsintro2_4 ===
-Once you have your circle looking like you want it, let's take another look at our code that draws the circle: <tt>circle(100,200,50)</tt>
-Remember how I said the first number in parentheses was the <b>X-coordinate</b>? X means side-to-side, or how far left or right the circle is. What if instead of drawing that circle at X-coordinate <b>100</b> every time, we drew the circle at the X-coordinate of my cursor?
-To do this, replace the number <b>100</b> with <b>mouseX</b> and run the program.
+ [❯] CODE: User uses mouseX and runs the code
-> p5jsintro2_5

=== p5jsintro2_5 ===
-You should have <tt>circle(mouseX, 200, 50);</tt> and if you move your mouse back and forth along the canvas, you should see it following along left to right! Notice that the circle is <b>not</b> moving up and down, because the Y-coordinate is still set to 200... But we can change that, too!
-If you type <tt>circle(mouseX, mouseY, 50);</tt>, you can make the circle follow your mouse exactly throughout the canvas!
+ [❯] CODE: User uses mouseY and runs the code
-> p5jsintro2_6

=== p5jsintro2_6 ===
-Wheeeeee! Sorry, I'm having too much fun... We're done for the moment, but you're welcome back any time you're ready to keep exploring <b>P5.JS</b>!
+ [❯]
-> END