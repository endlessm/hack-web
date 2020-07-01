=== begin_de ===
-> p5_1_de

=== p5_1_de ===
- Hey {get_user_name()}, du musst das unbedingt auch ausprobieren. Ich lerne gerade eine neue Programmiersprache für Interaktive Kunst <b>p5.js</b> - "js" kommt von <b>JavaScript</b> - davon hast du bestimmt schon gehört, es ist eine Programmiersprache die auf vielen Webseiten läuft.
+ [attracting: ❯] ❯
-> p5_2_de

=== p5_2_de ===
- Das <b>p5.js</b> Programm ist auf der linken Seite, und das Ergebnis von dem Programm in der Mitte. Wenn du schreibst, wird das Programm automatisch ausgeführt, und der mittlere Bereich erneuert.
- Es ist wichtig, dass du jeden Code <b>genauso</b> schreibst wie wir ihn zeigen. Computer können sehr pingelig sein zum Beispiel bei Leerzeichen. Wenn du etwas korrigieren möchtest kannst du es Schrittweise mit <b>Ctrl + Z</b> rückgängig machen, oder die ursprüngliche Version mit dem <b>Reload</b> Knopf rechts oben wiederherstellen.
+ [❯] ❯
-> p5_3_de

=== p5_3_de ===
- Lass uns mit etwas einfachem beginnen - wie wäre es damit die Hintergrundfarbe (background) zu ändern. Finde die Zeile <tt>background(20);</tt>, und ändere sie zu <tt>background('green');</tt>.
- Vergiss das Semikolon ( <b>;</b> ) am Ende der Zeile nicht, und achte auf deine Leerzeichen!
TODO: Replace brute-force checks when we have a better check:
+ [(wait for: code contains "background('green');")]
+ [(wait for: code contains "background('Green');")]
+ [(wait for: code contains "background('GREEN');")]
-
(Done)
- -> p5_4_de

=== p5_4_de ===
- Toll! In <b>p5.js</b> gibt es jede Menge Farben - probier doch mal <tt>yellow</tt>, <tt>blue</tt> oder <tt>red</tt>.
+ [❯] ❯
-> p5_5_de

=== p5_5_de ===
- Lass uns nun einen Schritte weiter gehen und das Aussehen der Welle ändern. Finde die Zeile <tt>num = 20;</tt>, and ändere <b>20</b> zu <b>5</b>. Vergiss nicht den code genauso zu schreiben wie du ihn hier siehst.
+ [(wait for: code contains "num = 5;")] (Done)
-> p5_6_de

=== p5_6_de ===
- Huh, wo sind all die Linien hin? Setze <tt>num</tt> auf <b>15</b>.
+ [(wait for: code contains "num = 15;")] (Done)
-> p5_7_de

=== p5_7_de ===
- Das ist eine schöne Zahl. Als nächstes können wir die Abstände zwischen den Bögen ändern. Setze <tt>step</tt> auf 30.
+ [(wait for: code contains "step = 30;")] (Done)
-> p5_8_de

=== p5_8_de ===
- Hmm, looks like we're going to need a bigger window to contain this wave! We can make the <b>canvas</b> (that's the name of the area the program draws things in) larger by changing the line that says <tt>createCanvas(400, 400)</tt>. Those two numbers control the width and height of your canvas, so let's make that a little bigger - increase the wdith to <b>600</b>.
+ [(wait for: code contains "createCanvas(600, 400);")] (Done)
-> p5_10_de

=== p5_10_de ===
- That looks better! You can keep changing the size, if you like.
- Now, let's change the thickness of the arcs. Change <tt>strokeWeight</tt> from <b>5</b> to <b>10</b>.
+ [(wait for: code contains "strokeWeight(10);")] (Done)
-> p5_11_de

=== p5_11_de ===
- Nice! You can drop the <tt>strokeWeight</tt> back down, or change it to another number you like better.
- Let's move on to some fun with colors - look for the line that says <tt>arcColor = 255</tt>.
- That <b>variable</b> controls the color of all the lines in the wave - let's change it to <b>100</b>, and see what happens!
+ [(wait for: code contains "arcColor = 100;")] (Done)
-> p5_14_de

=== p5_14_de ===
- Now your wave is gray! If you want the wave to be blue, green or some other color, we need a more complex way of talking about colors. True, you can use color words, like you did for the background, but you can also describe colors in terms of the amounts of red, green, and blue they have.
- For example, let's make the wave red - change the line with <b>arcColor</b> on it to <tt>arcColor = color(255, 0, 0);</tt>. Don't forget to double-check your spacing!
TODO: Replace brute-force checks when we have a better check:
+ [(wait for: code contains "arcColor = color(255, 0, 0);")]
+ [(wait for: code contains "arcColor = color(255,0, 0);")]
+ [(wait for: code contains "arcColor = color(255, 0,0);")]
+ [(wait for: code contains "arcColor = color(255,0,0);")]
-
(Done)
- -> p5_16_de

=== p5_16_de ===
- See how the arcs are red? Change the color to <tt>(0, 255, 0);</tt> to give us some lucky green waves.
TODO: Replace brute-force checks when we have a better check:
+ [(wait for: code contains "arcColor = color(0, 255, 0);")]
+ [(wait for: code contains "arcColor = color(0,255, 0);")]
+ [(wait for: code contains "arcColor = color(0, 255,0);")]
+ [(wait for: code contains "arcColor = color(0,255,0);")]
-
(Done)
- -> p5_18_de

=== p5_18_de ===
- Now let’s try blending our RGB values: <tt>color(0, 255, 255);</tt>
TODO: Replace brute-force checks when we have a better check:
+ [(wait for: code contains "arcColor = color(0, 255, 255);")]
+ [(wait for: code contains "arcColor = color(0,255, 255);")]
+ [(wait for: code contains "arcColor = color(0, 255,255);")]
+ [(wait for: code contains "arcColor = color(0,255,255);")]
-
(Done)
- -> p5_19_de

=== p5_19_de ===
- Looks like green and blue make a lovely teal color! Let's try a more complex color - I love the purple you get with <tt>color(150, 0, 255)</tt>
TODO: Replace brute-force checks when we have a better check:
+ [(wait for: code contains "arcColor = color(150, 0, 255);")]
+ [(wait for: code contains "arcColor = color(150,0, 255);")]
+ [(wait for: code contains "arcColor = color(150, 0,255);")]
+ [(wait for: code contains "arcColor = color(150,0,255);")]
-
(Done)
- -> p5_20_de

=== p5_20_de ===
- Great job! Now <b>those</b> are some beautiful waves.
- We're at a crossroads: You can stay here and keep playing around with the colors and what we've learned so far, or... we can forge ahead into something more complicated. How does that sound?
* [👍] Let's keep moving!
-> p5_21_de
* [👎] I'm going to stay here and keep experimenting!
-> p5_stay_de

=== p5_stay_de ===
- Have fun! Remember, you can always restart this quest if you change your mind.
-> END

=== p5_21_de ===
- OK, let's get complex. We'll make the arcs change color only when you click (or touch, if you're using a tablet) that part of the sceeen.
- First, surround your existing <tt>doArcs(...</tt> code with <tt>if (mouseIsPressed) \{</tt>, and <tt>\}</tt>
- Remember to be very careful of your spacing! Your code should look like this:
{snippet_p5_21()}
TODO: Replace brute-force checks when we have a better check:
+ [(wait for: code contains "if (mouseIsPressed) \{ doArcs(arcColor); \}")]
+ [(wait for: code contains "if(mouseIsPressed)\{ doArcs(arcColor); \}")]
+ [(wait for: code contains "if (mouseIsPressed) \{doArcs(arcColor);\}")]
+ [(wait for: code contains "if(mouseIsPressed)\{doArcs(arcColor);\}")]
+ [(wait for: code contains "if ( mouseIsPressed ) \{ doArcs(arcColor); \}")]
-
(Done)
- -> p5_22_de

=== p5_22_de ===
- Great, one last bit: create a new line after the one you just typed, and type <tt>else \{ doArcs(128); \}</tt>
- If you're having trouble, carefully check that everything you've typed is in the correct place, with the correct spacing. Your code should look like this:
{snippet_p5_22()}
TODO: Replace brute-force checks when we have a better check:
+ [(wait for: code contains "else \{ doArcs(128); \}")]
+ [(wait for: code contains "else\{ doArcs(128); \}")]
+ [(wait for: code contains "else\{doArcs(128);\}")]
+ [(wait for: code contains "else \{doArcs(128);\}")]
-
(Done)
- -> p5_23_de

=== p5_23_de ===
- Great job, and we can also apply the same idea to the background color!
- On the line with <tt>doArcs(...</tt>, add <tt>background(255);</tt> just before for <tt>doArcs(...</tt>
- Your code should now look like this:
{snippet_p5_23()}
TODO: Replace brute-force checks when we have a better check:
+ [(wait for: code contains "if (mouseIsPressed) \{ background(255); ")]
+ [(wait for: code contains "if(mouseIsPressed)\{ background(255); ")]
+ [(wait for: code contains "if(mouseIsPressed)\{background(255);")]
+ [(wait for: code contains "if (mouseIsPressed) \{background(255);")]
-
(Done)
- -> p5_24_de

=== p5_24_de ===
- Do you see what we've done here? We used an <b>if</b> statement to change the behavior of this program depending on what you, the user, is doing!
- If you click or touch the canvas, <tt>mouseIsPressed</tt> is <b>True</b>, so the if statement jumps to the first bit of code, and displays the arcs as your chosen color.
- If you aren't clicking on or touching the canvas, <tt>mouseIsPressed</tt> is <b>False</b>, so it runs the code inside the <b>else</b> section, and the arcs are the other color.
- You can think of <b>if</b> statements like they're a sentence - <i>If this test is true, do one thing, or else, do a different thing.</i>
+ [❯] ❯
-> p5_25_de

=== p5_25_de ===
- Finally, we’re going to introduce you to another power-user command: the <b>map</b> function. <b>Functions</b> take in some data, and output other data. <b>map</b> takes one set of numbers, and squishes or stretches it to fit another range of numbers. In this case, we're going to use <tt>map()</tt> to make the position of your mouse control the speed of the wave animation.
+ [❯] ❯
-> p5_26_de

=== p5_26_de ===
- First, let's get familiar with the numbers we'll be changing. Do you see the last line of our code, <tt>theta += 0.0523;</tt>? That number controls the speed of the wave.
- <b>0.0523</b> is an awfully small number! Let's try increasing it to <tt>0.1</tt>. Remember to watch your spaces!
TODO: Replace brute-force checks when we have a better check:
+ [(wait for: code contains "theta += 0.1;")]
+ [(wait for: code contains "theta +=0.1;")]
+ [(wait for: code contains "theta+=0.1;")]
-
(Done)
- -> p5_27_de

=== p5_27_de ===
- Wow, that's fast! What happens if we go much smaller than the original, say, <tt>0.001</tt>?
+ [(wait for: code contains "theta += 0.001;")] (Done)
-> p5_28_de

=== p5_28_de ===
- Very slow! Try to find a happy medium, or you can reset it to <tt>0.0523</tt>.
+ [❯] ❯
-> p5_29_de

=== p5_29_de ===
- Now, let’s use the map function to automate the things we did in the past few instructions. We'll make the vertical position of your cursor control the speed of the wave!
- Change the number after <tt>theta +=</tt> to <tt>map(mouseY, height, 0, 0.001, 0.1);</tt> As usual, be careful to make sure your spaces and the numbers you're typing are correct.
TODO: Replace brute-force checks when we have a better check:
+ [(wait for: code contains "theta += map(mouseY, height, 0, 0.001, 0.1);")]
+ [(wait for: code contains "theta += map(mouseY,height,0,0.001,0.1);")]
+ [(wait for: code contains "theta+=map(mouseY, height, 0, 0.001, 0.1);")]
+ [(wait for: code contains "theta+=map(mouseY,height,0,0.001,0.1);")]
-
(Done)
- -> p5_30_de

=== p5_30_de ===
- Check it out! As you move your cursor higher, the wave speeds up. As you move it down, it slows down! And of course, you can still click or touch to change the colors.
+ [❯] ❯
-> p5_31_de

=== p5_31_de ===
{set_game_state("quest.P5/complete", true)}
{set_game_state("quests.achievements/p5-complete", true)}
- We're done for the moment, but there's so much to explore in <b>p5.js</b>! Feel free to change any of the variables you’ve learned, and play around as much as you like. If you'd like to keep going with more activities like this, I've got a whole set available in Hack for Endless OS!
-You can learn how to use complex shapes, random numbers, programming tools like variables and loops, and even "paint" with sound or create your own games. I'd love to see you there!
->END
