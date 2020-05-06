INCLUDE common.ink
# main character: estelle

VAR code = ""

-> begin

=== begin ===
-> p5_1

=== p5_1 ===
# character: estelle
- Hey {get_user_name()}, I've got something <b>super</b> cool for you! I've been learning a new programming language for making interactive art  called <b>p5.js</b> - The "js" part comes from <b>JavaScript</b> - you've probably heard of that before, it's a programming language used to run lots of websites.
+ [❯] ❯
-> p5_2

=== p5_2 ===
# character: estelle
- In this activity, the <b>p5.js</b> code is on the far left, and the result of that code is in the middle. As you type, the code will constantly try to run, and update the middle area.
+ [❯] ❯
-> p5_3

=== p5_3 ===
# character: estelle
- Let's start off with something simple - How about we change that background color. Find the line that says <tt>background('20');</tt>, and change it to read <tt>background('green');</tt>
+ [(wait for: code icontains "background('green');")] (Done)
-> p5_4

=== p5_4 ===
# character: estelle
- Great job! <b>p5.js</b> actually understands a whole bunch of different color words - Try out a few and see, if you like.
+ [❯] ❯
-> p5_5

=== p5_5 ===
# character: estelle
- Now, let's go a little deeper and change something about how those cool lines work! Find the line that says <tt>num = 20;</tt>, and change <b>20</b> to <b>5</b>.
+ [(wait for: code icontains "num = 5;")] (Done)
-> p5_6

=== p5_6 ===
# character: estelle
- Huh, where did all our lines go? Try changing <tt>num</tt> to <b>15</b>.
+ [(wait for: code icontains "num = 15;")] (Done)
-> p5_7


=== p5_7 ===
# character: estelle
- That's a nice number! Next, let's change the space between the arcs. Try changing <tt>step</tt> to 30.
+ [(wait for: code icontains "step = 30;")] (Done)
-> p5_8

=== p5_8 ===
# character: estelle
- Hmm, looks like we're going to need a bigger window to contain this wave! We can make the <b>canvas</b> (that's the name of the area the program draws things in) larger by changing the line that says <tt>size(400, 400)</t> Let's make that a little bigger - increase the first number to 600!
+ [(wait for: code not contains "size(600, 400);")] (Done)
-> p5_10


=== p5_10 ===
# character: estelle
- That looks better, feel free to adjust the size to whatever you like.
# character: estelle
- Now, let's tweak the thickness of the arcs. Change <tt>strokeWeight</tt> from <b>1</b> to <b>25</b>.
+ [(wait for: code icontains "strokeweight(25);")] (Done)
-> p5_11


=== p5_11 ===
# character: estelle
- Nice! You can drop the <tt>strokeWeight</tt> back down to something around 10, if you want.
# character: estelle
- Let's move on to some fun with colors - look for a line that says <tt>arcColor = </tt>.
# character: estelle
- That <b>variable</b> controls the color of every line that your program draws - let's change it to... <b>100</b>, and see what happens!
+ [(wait for: code icontains "arcColor = 100;")] (Done)
-> p5_14


=== p5_14 ===
# character: estelle
- Now your wave is grey! If you want the wave to be blue, green or some other color, we need a more complex way of talking about colors. True, you can use color words, like you did for the background, but you can also describe colors in terms of the amounts of red, green, and blue they have.
# character: estelle
- For example, let's make the wave red - change the line with <b>arcColor</b> on it to <tt>arcColor = color(255, 0, 0);</t>
+ [(wait for: code icontains "arcColor = color(255, 0, 0);")] (Done)
-> p5_16


=== p5_16 ===
# character: estelle
- See how the arcs are red? Change the color triplet to <tt>(0, 255, 0);</tt> to give us some lucky green waves.
+ [(wait for: code icontains "arcColor = color(0, 255, 0);")] (Done)
-> p5_18


=== p5_18 ===
# character: estelle
- Now let’s try blending our RGB values: <tt>color(0, 255, 255);</tt>
+ [(wait for: code icontains "arcColor = color(0, 255, 255);")] (Done)
-> p5_19


=== p5_19 ===
# character: estelle
- Looks like green and blue make a lovely teal color! Let's try a more complex color - I love the purple you get with <tt>color(150, 0, 255)</t>
+ [(wait for: code icontains "arcColor = color(150, 0, 255);")] (Done)
-> p5_20


=== p5_20 ===
# character: estelle
- Great job! Now <b>those</b> are some beautiful waves.
# character: estelle
- We're at a crossroads: You can stay here and keep playing around with the colors and what we've learned so far, or... we can forge ahead into something more complicated. How does that sound?
* [👍] Let's keep moving!
-> p5_21
* [👎] I'm going to stay here and keep experimenting!
-> p5_stay


=== p5_stay ===
# character: estelle
- Have fun! Remember, you can always restart this quest if you change your mind.
-> END


=== p5_21 ===
# character: estelle
- OK, let's get complex. We'll make the arcs change color only when you press a key on the keyboard.
# character: estelle
- First, surround your existing <tt>doArcs(...</tt> code with <tt>if (keyIsPressed) \{ </tt>, and <tt>\}</tt>
# character: estelle
- It should look like this:
{snippet_p5_21()}
+ [(wait for: code icontains "if (keyIsPressed) \{ doArcs(arcColor); \}")] (Done)
-> p5_22


=== function snippet_p5_21 ===
# language: javascript
if (keyIsPressed) \{ doArcs(arcColor); \}


=== p5_22 ===
# character: estelle
- Great, one last bit: create a new line after the one you just typed, and type <tt>else \{ doArcs(128); \}</tt>
# character: estelle
- When you're done, all your code should look like this:
{snippet_p5_22()}
+ [(wait for: code icontains "else \{ doArcs(128); \}")] (Done)
-> p5_23


=== function snippet_p5_22 ===
# language: javascript
if (keyIsPressed) \{ doArcs(arcColor); \}
else \{ doArcs(128); \}


=== p5_23 ===
# character: estelle
- Great job, and we can also apply the same idea to the background color!
# character: estelle
- On the line with <tt>doArcs(...</tt>, add <tt>background(255);</tt> just before for <tt>doArcs(...</tt>
# character: estelle
- Your code should now look like this:
{snippet_p5_23()}
+ [(wait for: code icontains "if (keyIsPressed) \{ background(255);")] (Done)
-> p5_24


=== function snippet_p5_23 ===
# language: javascript
if(keyIsPressed)\{ background(255); doArcs(arcColor); \}
else \{ background(20); \}


=== p5_24 ===
# character: estelle
- So, do you see what's we've done here? We've used an <b>if statement</b> to change the behavior of this program depending on what you, the user, is doing! If you press a key, it runs the bits of code after the <b>if</b>, otherwise it runs the other bits, after the <b>else</b>.
+ [❯] ❯
-> p5_25


=== p5_25 ===
# character: estelle
- Finally, we’re going to introduce you to a power-user command: the <b>map</b> function. <b>Functions</b> take in some data, and output other data. <b>map</b> takes one set of numbers, and squishes or stretches it to fit another range of numbers. In this case, we're going to use it to make the positions of your mouse on the screen control the speed of the wave animation.
+ [❯] ❯
-> p5_26


=== p5_26 ===
# character: estelle
- First, let's get familliar with the numbers we'll be changing. Do you see the last line of our code, <tt>theta += 0.0523;</tt>? That number controls the speed of the wave.
# character: estelle
- <b>0.0523</b> is an awfully small number! Let's try increasing it to <tt>0.1</tt>.
+ [(wait for: code icontains "theta += 0.1;")] (Done)
-> p5_27


=== p5_27 ===
# character: estelle
- Wow, that's fast! What happens if we go even smaller than the original, say, <tt>0.001</tt>?
+ [(wait for: code icontains "theta += 0.001;")] (Done)
-> p5_28

=== p5_28 ===
# character: estelle
- Very slow, as expected. Try to find a happy medium, or you can reset it to <tt>0.0523</tt>.
+ [❯] ❯
-> p5_29

=== p5_29 ===
# character: estelle
- Now, let’s use the map function to automate the things we did in the past few instructions. We'll make the vertical position of your mouse control the speed of the wave!
# character: estelle
- Change the number after <tt>theta +=</tt> to <tt>map(mouseY, height, 0, 0.001, 0.1);</tt>
+ [(wait for: code icontains "theta += map(mouseY, height, 0, 0.001, 0.1);")] (Done)
-> p5_30


=== p5_30 ===
# character: estelle
- Check it out! As you move your mouse higher, the wave speeds up. As you move it down, it slows down! And of course, you can still press keys to change the colors.
+ [❯] ❯
-> p5_31


=== p5_31 ===
# character: estelle
- We're done for the moment, but there's so much to explore in <b>p5.js</b>! Feel free to change any of the variables you’ve learned, and aply around as much as you like. If you'd like to keep going with more activities like this, I've got a whole set available in Hack for Endless OS!
# character: estelle
-You can learn how to use complex shapes, random numbers, programming tools like variables and loops, and even "paint" with sound or create your own games. I'd love to see you there!
->END
