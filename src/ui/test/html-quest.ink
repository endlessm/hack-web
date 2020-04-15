# main character: riley

VAR code = ""

-> begin

===function get_user_name===
    ~ return "DefaultUser"

===function snippet_html(snip)===
    # language html
    ~ return "" + snip

=== begin ===
-> htmlintro1_1

=== htmlintro1_1 ===
- Hi, {get_user_name()}! I know you've used the internet before - but have you ever wondered what goes into showing you all those web pages?
- I was wondering that, one day, and I decided to go find out!
//* [❯]
-> htmlintro1_2


=== htmlintro1_2 ===
- On your left, we've got a sort of website operating room set up. The left half shows you the code, and the right side shows what you'd see if you found the page on the internet.
- Just like computer programs, web pages are written in a kind of code, called HTML.
- You put the HTML code around text, and that tells your web browser what to show and how to show it. Not so bad, right?
-> htmlintro1_3


=== htmlintro1_3 ===
- In HTML, everything with <tt>&lt;</tt> and <tt>&gt;</tt> around it is called a <b>tag</b>. Tags tell the browser how to display something - text, images, whatever.
- Tags come in pairs - an <tt>&lt;opening tag&gt;</tt>, and a <tt>&lt;/closing tag&gt;</tt>, like saying <b>start</b> and <b>stop</b>. Notice the forward slash ( <b>/</b> ) on the closing tag!
- You'll also see some text with <tt>&lt;!--</tt> and <tt>--\\&gt;</tt> around it. Those are called <b>comments</b>, and the web browser won't look at them - they're info I put there to explain what some of the HTML does.
- Let's get our hands dirty! Find the text <b>Hello, World!</b> in the <b>code</b> part of this page, and change it - make it your name, your favorite food, whatever you like.
* [(wait for: code not icontains "Hello World!")] (Done)
-> htmlintro1_4


=== htmlintro1_4 ===
- Awesome! You just edited a webpage! That makes you a web designer, and that's pretty cool.
Let's take it one step further. Do you see the text that says *Welcome* near the top of the webpage?
Try finding that text in the *code* area and changing it.
* [(wait for: code not icontains "Welcome")] (Done)
-> htmlintro1_5


=== htmlintro1_5 ===
- Nice job! See, HTML isn't as confusing as you thought, right? Let's continue the adventure in a more... <b>colorful</b>... way!
-> htmlintro2_2

=== htmlintro2_2 ===
- Here's a fun fact: Based on what you did just now, you already know enough to make your own webpage!
If you did, though, all you'd have is boring black text on a white background. Let's spice that up a little by coloring the text.
- Find an opening <tt>&lt;p&gt;</tt>tag in your code, and add <tt>style="color:blue"</tt>after the <tt>p</tt>.
* [(wait for: code icontains "<p style=\"color:blue\">")](Done)
-> htmlintro2_3


=== htmlintro2_3 ===
- Congratulations! You just <b>styled</b> some text! Let's get even fancier - Now make the text in that <tt>&lt;p&gt;</tt>tag orange.
* [(wait for: code icontains "<p style=\"color:orange\">")](Done)
-> htmlintro2_4


=== htmlintro2_4 ===
- I wonder what happens if you try that with the <tt>&lt;h1&gt;</tt> tag? Try making that text purple.
+ [Hints] -> htmlintro2_4hints
* [(wait for: code icontains "<h1 style=\"color:purple\">")](Done)
-> htmlintro2_5


=== htmlintro2_4hints ===
{ cycle:
    - Look for an <tt>&lt;h1&gt;</tt> tag in the page, that's what you want to change.
    - Remember how you just turned the text <b>orange</b>? Do the same thing, but with <b>purple</b>!
    - If you're getting an error, make sure your <b>carets</b> (&lt; and &gt;) match up. For each <b>&lt;</b> you need a <b>&gt;</b>!
    - Don't forget that after <tt>style=</tt> you need quotes ("") around <tt>color:purple</tt>!
    - Your code should look like one of these:
    {snippet_html("&lt;h1 style=\"color:purple\"&gt;")}
}
+ [Hint] -> htmlintro2_4hints
* [(wait for: code icontains "<h1 style=\"color:purple\">")](Done)
-> htmlintro2_5


=== htmlintro2_5 ===
- Nice. What if you wanted to use a super-special shade of green, though? We would need a way to describe that exact color, like a painter might describe a new color she mixed...
You see where I'm going with this, right? We totally have a way to do that! It's called <b>hex color</b>, and it lets you create colors by using groups of 6 letters and numbers - only 1 - 9, and A B C D E F, though.
Here's an example hex color - <tt>\#76EECF</tt>
-> htmlintro2_6


=== htmlintro2_6 ===
- To use this hex color in your webpage, replace one of your color words with that hex code: <tt>\#76EECF</tt>
(You need the \"\#\" in front of it to tell the browser \"the next 6 letters or numbers are a hex color\")
Let's edit a <tt>&lt;p&gt;</tt>tag to make the text that hex color.
* [(wait for: code icontains "<p style=\"color:\#76EECF\">")](Done)
-> htmlintro2_7


=== htmlintro2_7 ===
- Cool color! If you like, you can change the numbers around and see if you can create another color!
- It's a little out of our way right now to explain why Hex Colors work the way they do, but if you're interested we can take a quick detour!
* [Y] Tell me more!
-> htmlintro2_7hexchars
* [N] Not right now, thanks.
-> htmlintro2_8


=== htmlintro2_7hexchars ===
- So, those 6 digits in <b>hex colors</b> describe colors in terms of a mix of red, green and blue, <b>RRGGBB</b>. So <b>\#1155DD</b> would be a little red, some green, and LOT of blue.
- But why the letters? <b>Hex colors</b> count using 1-9 and A-F because they have to express numbers above 9, but still stick to just 6 digits. That means they need a way to express 10, 11, and other numbers using only a single digit each. Tall order! So, hex colors use a number system called <b>hexadecimal</b>, where 10 = A, 11 = B, and so on, up until F. I could go into why we only go up to 16, but <b>THAT'S</b> even more off the track!
-  Anyway, with this way of describing colors, you've got 16,777,216 possible colors, so there's a fair amount of room.
+ [❯] That's a lot of colors!
-> htmlintro2_8


=== htmlintro2_8 ===
- If you'd like to use a color picker, check out <a href="https:\/\/htmlcolorcodes.com\/">the HTML color code list</a>.
- Ok, so you've got some color chops now. But do you know what would <b>really</b> make this page look cool? A new background color!
Look for the <tt>&lt;body&gt;</tt>tag in the code, near the top of the page. Just like we did for the <tt>&lt;p&gt;</tt> and <tt>&lt;h1&gt;</tt> tags, we're going to insert some new information in there.
This time, though, we need a slightly different wording - <tt>style="background-color:coral"</tt>
+ [Hints] -> htmlintro2_8hints
* [(wait for: code icontains "<body style=\"background-color:coral\">")](Done)
-> htmlintro2_9


=== htmlintro2_8hints ===
{ cycle:
    - Find the &lt;body&gt; tag near the top of the page, and then add the new color information into it, just like you did with the &lt;p&gt; tag.
    - Don't forget that this time we're using <tt>background-color</tt>instead of just <tt>color</tt>.
    - Your body tag should look like this: <tt>&lt;body style="background-color:coral"&gt;</tt>
}
+ [Hint] -> htmlintro2_8hints
* [(wait for: code icontains "<body style=\"background-color:coral\">")](Done)
-> htmlintro2_9


=== htmlintro2_9 ===
- Niiice! Now that's going to turn some heads. I bet it feels pretty good to have the tools to paint the whole internet!
- If you'd like to keep going with more activities like this, I've got a whole set available in Hack for Endless OS! You can learn how to write your own tags, explore and hack web pages with the inspector, and even create a whole professional-quality website using the latest web frameworks and tools! I'll be waiting for you!
-> END
