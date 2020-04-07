INCLUDE global-fxns.ink
# main character: riley
-> begin

VAR code = ""

=== p5jsintro1_1 ===
- Hey {get_user_name()}, I've got something <b>super</b> cool for you!
I've been learning a new programming language for making interactive art - I think it's right up your alley!
- It's called <b>p5.js</b> - The "js" part comes from <b>JavaScript</b> - you've probably heard of it before, it runs a ton of websites.
- Even better, <b>p5.js</b> has a live online editor we can use!
* [❯] Open https:\/\/editor.p5js.org/
-> p5jsintro1_2

=== p5jsintro1_2 ===
- Here's what I've figured out so far: The code is on the left, and the preview is on the right.
To run the code, click the play button. Let's try that right now.
* [❯] CODE: User clicks play
-> p5jsintro1_3

=== p5jsintro1_3 ===
- There you go! Not very interesting, but then again, there's not much code here.
Let's see if we can add something...
- There are 2 different parts in this program - one called <tt>setup() and the other called <tt>draw()</tt>.
<tt>setup()</tt> creates the place where everything gets drawn, and <tt>draw()</tt> is where the action happens.
- OK, first, let's change that boring grey! Change the line with <tt>background</tt> to read <tt>background('green')</tt>.
+ [❯] CODE: User changes background to green
-> p5jsintro1_4
+ [E] CODE: User makes an error
-> p5jsintro1_3error

=== p5jsintro1_3error ===
- Hey, no problem, I got so many errors when I first started. Good thing they tell you where the problem is!
You might have forgotten to put quotes around <tt>green</tt>, or you might have forgotten to match your parentheses.
After you fix the error, press 'Play' again!
+ [❯] CODE: User changes background to green
-> p5jsintro1_4

=== p5jsintro1_4 ===
- Much better! Just like with other web languages, you can also use a <b>hex color</b> like <tt>\#76EECF</tt>, or <tt>\#FFAA00</tt>, instead of a named color.
You can get more info on hex colors at https:\/\/htmlcolorcodes.com/
Once you've added your hex color, click play, to see it in action!
+ [❯] CODE: User changes background to green
-> p5jsintro1_5

=== p5jsintro1_5 ===
- Okay, so we've got a background - now let's draw a shape on that background.
How about a circle? Let's add a new line of code to the <tt>draw()</tt> function.
Make sure to add this new line after <tt>background(...)</tt>, but before the ending <tt>\}</tt>,  so that the program knows it's a part of <tt>draw()</tt>.
Type <tt>circle(100,200,50);</tt> to draw a circle 100 pixels to the right, 200 pixels down, and 50 pixels in diameter.
Don't forget the semicolon ( <tt>;</tt> ), which lets the program know you've finished a line of code.
+ [❯] CODE: User draws a circle
-> p5jsintro1_6

=== p5jsintro1_6 ===
- You can try playing around with the numbers in the parentheses to see if you can make your circle bigger or move it right, left, up, and down.
If you typed a number bigger than 400, your circle probably went off the screen.
Remember how in the <tt>setup()</tt> function it says the canvas is 400 x 400? Let's make our canvas bigger!
Change the two numbers in the <tt>createCanvas()</tt> function - they control how wide and tall the canvas is.
(I used <tt>createCanvas(600,600)</tt>, BTW)
+ [❯] CODE: User changes canvas size
-> p5jsintro1_7

=== p5jsintro1_7 ===
- Nice, with that new canvas size, your bigger circle should show up now! I gotta run, but there's a ton more stuff to show you in <b>p5.js</b>!
Next time, we'll add color to our circle, and make it move around the screen to follow the mouse. Catch you later!
+ [❯]
-> success

=== success ===
-> END