INCLUDE common.ink
# main character: riley

VAR code = ""

-> begin

=== begin ===
-> p5jsintro1_1

=== p5jsintro1_1 ===
- Hey {get_user_name()}, I've got something <b>super</b> cool for you!
I've been learning a new programming language for making interactive art - I think it's right up your alley!
- It's called <b>p5.js</b> - The "js" part comes from <b>JavaScript</b> - you've probably heard of it before, it runs a ton of websites.
- Here's what I've figured out so far: The code is on the left, and the preview is on the right. As you type, the code will constantly try to run, and update the right side.
-> p5jsintro1_3

=== p5jsintro1_3 ===
- Let's see if we can add something new!
- There are 2 different parts in this program - one called <tt>setup()</tt> and the other called <tt>draw()</tt>.
<tt>setup()</tt> creates the place where everything gets drawn, and <tt>draw()</tt> is where the action happens.
- OK, first, let's change that boring grey! Change the line with <tt>background</tt> to read <tt>background('green')</tt>.
+ [Hint] Can I have a hint?
-> p5jsintro1_3error
+ [(wait for: code icontains "background('green');")](Done)
-> p5jsintro1_4

=== p5jsintro1_3error ===
- Hey, no problem, I got so many errors when I first started. Good thing they tell you where the problem is!
You might have forgotten to put quotes around <tt>green</tt>, or you might have forgotten to match your parentheses.
+ [(wait for: code icontains "background('green');")](Done)
-> p5jsintro1_4

=== p5jsintro1_4 ===
- Much better! Just like with other web languages, you can also use a <b>hex color</b> like <tt>\#76EECF</tt>, or <tt>\#FFAA00</tt>, instead of a named color.
You can get more info on hex colors <a href="https:\/\/htmlcolorcodes.com\/">at the HTML color code list</a>.
Once you've added your hex color, just wait a second, and you'll see it in action!
+ [(wait for: code not contains "background('green');")](Done)
-> p5jsintro1_5

=== p5jsintro1_5 ===
- Okay, so we've got a background - now let's draw a shape on that background.
How about a circle? Let's add a new line of code to the <tt>draw()</tt> function.
Make sure to add this new line after <tt>background(...)</tt>, but before the ending <tt>\}</tt>,  so that the program knows it's a part of <tt>draw()</tt>.
Type <tt>circle(100, 200, 50);</tt> to draw a circle 100 pixels to the right, 200 pixels down, and 50 pixels in diameter.
Don't forget the semicolon ( <tt>;</tt> ), which lets the program know you've finished a line of code.
+ [(wait for: code icontains "circle(100,200,50);")](Done)
-> p5jsintro1_6
+ [(wait for: code icontains "circle(100, 200, 50);")](Done)
-> p5jsintro1_6

=== p5jsintro1_6 ===
- You can try playing around with the numbers in the parentheses to see if you can make your circle bigger or move it right, left, up, and down.
If you typed a number bigger than 400, your circle probably went off the screen.
Remember how in the <tt>setup()</tt> function it says the canvas is 400 x 400? Let's make our canvas bigger!
Change the two numbers in the <tt>createCanvas()</tt> function - they control how wide and tall the canvas is.
(I used <tt>createCanvas(600,600)</tt>, BTW)
+ [(wait for: code not contains "createCanvas(400,400);")](Done)
-> p5jsintro1_7

=== p5jsintro1_7 ===
- Nice, with that new canvas size, your bigger circle should show up now! Now, let's see about making that circle a different color. To do that, we have to use a command called <tt>fill()</tt>. Make a new line before the <tt>circle()</tt> command, and type <tt>fill('blue');</tt>. Then run the code!
+ [(wait for: code icontains "fill('blue');")](Done)
-> p5jsintro2_3

=== p5jsintro2_3 ===
-Nice, but what about that black line around the outside? That line is the <b>stroke</b>, and we can get rid of it by typing <tt>strokeWeight(0);</tt> on a new line.
-Of course, we could also make it thicker by typing <b>strokeWeight(10)</b> instead - the number in parentheses is how many pixels wide you want it.
-And we can even change the color of the outline - try <tt>stroke('red');</tt> or <tt>stroke('#E84904');</tt> if you want.
+ [(wait for: code icontains "strokeWeight(")](Done)
-> p5jsintro2_4

=== p5jsintro2_4 ===
-Once you have your circle looking like you want it, let's take another look at our code that draws the circle: <tt>circle(100, 200, 50)</tt>
-Remember how I said the first number in parentheses was the <b>X-coordinate</b>? X means side-to-side, or how far left or right the circle is. What if instead of drawing that circle at X-coordinate <b>100</b> every time, we drew the circle at the X-coordinate of my cursor?
-To do this, replace the number <b>100</b> with <b>mouseX</b> and run the program.
+ [(wait for: code icontains "circle(mouseX, 200, 50);")](Done)
-> p5jsintro2_5

=== p5jsintro2_5 ===
-You should have <tt>circle(mouseX, 200, 50);</tt> and if you move your mouse back and forth along the canvas, you should see it following along left to right! Notice that the circle is <b>not</b> moving up and down, because the Y-coordinate is still set to 200... But we can change that, too!
-If you type <tt>circle(mouseX, mouseY, 50);</tt>, you can make the circle follow your mouse exactly throughout the canvas!
+ [(wait for: code icontains "circle(mouseX, mouseY, 50);")](Done)
-> p5jsintro2_6

=== p5jsintro2_6 ===
-Wheeeeee! We're done for the moment - But if you'd like to keep going with more activities in <b>p5.js</b> like this, I've got a whole set available in Hack for Endless OS!
-You can learn how to use complex shapes, random numbers, programming tools like variables and loops, and even "paint" with sound or create your own games. I can't wait to see you there!
+ [❯]
-> END
