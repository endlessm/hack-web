INCLUDE global-fxns.ink
# main character: riley
-> begin

VAR code = ""

=== begin ===
-> p5jsintro4_1

=== p5jsintro4_1 ===
-Welcome back! I'm excited to show you what I figured out - this is gonna be fun!
-It might seem like I know everything there is to know about <b>p5.js</b>, but I'll that's only because I started learning it a couple weeks before you did. There's still a lot I don't know, and I want to explore it with you. Problems can be a lot easier with a partner!
* [❯]
-> p5jsintro4_2

=== p5jsintro4_2 ===
-Let me show you the <b>p5.js</b> version of the Academy Archives - it's where I learned everything I know about it. To look at it, we need to open a new web page, let me get that really quick.
-{open_web_page("https:\/\/p5js.org\/reference\/")}
* [❯]
-> p5jsintro4_3

=== p5jsintro4_3 ===
-I know the Reference can be overwhelming at first - there's a <b>huge</b> amount of information here. Let's look up something we already know about - the <tt>background()</tt> command.
-If you can't find it, use <b>Ctrl+F</b> to search on the page. That's how I usually find what I'm looking for on reference pages. Once you find it, click the link to take us in
* [❯] User gets to background() page
-> p5jsintro4_4

=== p5jsintro4_4 ===
-OK, now we're on the <tt>background()</tt> reference page. At the top, you'll see lots of different examples of how to use this bit of code.
-The first example just has a number in the parentheses - that's what we started off with in the very first quest, remember? I always wondered what it meant...
-Oh, I see - it's a <b>grayscale</b> number, a value between 0 and 255 that tells you how dark or light the gray should be.
-If you look down a few entries, you'll see <tt>background('red');</tt> - that's how we set the color the first time.
-A little ways down, there's <tt>background('#222222');</tt> - there's the hex color format we used later!
-Wow, there's so many different ways to set the background color! Scrolling down even further, you can read about how it works.
-Let's go back and check out another entry. Click the back button, then find <tt>circle()</tt> on the page.
* [❯] User goes to circle() entry
-> p5jsintro4_5

=== p5jsintro4_5 ===
-This one's a lot simpler, there's only one example and it looks just like what we used!
-If you scroll down to the <b>Syntax</b> section, you'll see how to use it: with three different numbers that represent the x, y, and diameter.
-Here in the reference, they use the placeholders <b>x</b>, <b>y</b>, and <b>d</b> for those numbers, and they explain what each one means in the section below.
-The section below is called <b>Parameters</b>, and that's what you call each of the things inside the parentheses of a function like <b>circle()</b>.
-So the <b>parameters</b> of the <b>circle()</b> function are the X-coordinate, the Y-coordinate, and the diameter.
-Okay, now that we know how to read these reference entries, let's go find a new function to look up, like <b>square()</b>.
* [❯] User goes to square() entry
-> p5jsintro4_6

=== p5jsintro4_6 ===
-See if you can use the reference for <b>square()</b> to draw your own square in the editor!
-I did <tt>square(mouseX, mouseY, 50);</tt> to get a square with 50-pixel sides that follows my mouse around - That's a cool new paintbrush!
-There are also two other parts of this site that have been super useful to me - If you look on the left side of the reference page, you'll see <b>Learn</b> and <b>Examples</b>.
-Click around each of those sections to find out more about the possibilities of <b>p5.js</b>!
-That's all for now - I can't wait to see what amazing things you'll create! Isn't programming cool?
* [❯]
-> END








