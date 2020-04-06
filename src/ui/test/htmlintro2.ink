INCLUDE global-fxns.ink
# main character: riley

-> begin

VAR code = ""

=== begin ===
-> htmlintro2_1


=== htmlintro2_1 ===
- Hey again! Let's dive a little deeper, {get_user_name()}, and get back to that web page previewer. {open_web_page("https:\/\/codepen.io/madetohack/pen/BaaKggj?editors=1000")}
* [❯] CODE: Detect Web Page Opening
-> htmlintro2_2


=== htmlintro2_2 ===
- Here's a fun fact: Just based on the previous activity, you already know enough to make your own webpage.
If you did, though, all you'd have is boring black text on a white background. Let's spice that up a little by coloring the text.
- Find an opening <tt>&lt;p&gt;</tt>tag in your code, and add <tt>style="color:blue"</tt>after the <tt>p</tt>.
* [(wait for: code contains "<p style=\"color:blue\">")](Done)
-> htmlintro2_3


=== htmlintro2_3 ===
- Congratulations! You just <b>styled</b> some text! Now let's get even fancier - find another <tt>&lt;p&gt;</tt>tag and make <b>that</b> text orange.
* [(wait for: code contains "<p style=\"color:orange\">")](Done)
-> htmlintro2_4


=== htmlintro2_4 ===
- I wonder what happens if you try that with the <tt>&lt;h1&gt;</tt> tag? Try making that purple.
+ [Hints] -> htmlintro2_4hints
* [(wait for: code contains "<h1 style=\"color:purple\">")](Done)
-> htmlintro2_5


=== htmlintro2_4hints ===
{ cycle:
    - Look for an <tt>&lt;h1&gt;</tt> tag in the page, that's what you want to change.
    - Remember how you just turned the text <b>orange</b>? Do the same thing, but with <b>purple</b>!
    - If you're getting an error, make sure your <b>carets</b> (&lt; and &gt;) match up. For each <b>&lt;</b> you need a <b>&gt;</b>!
    - Don't forget that after <tt>style=</tt>you need quotes ("") around <tt>color:purple</tt>!
    - Your code should look like one of these:
    {snippet_html("&lt;h1 style=\"color:purple\"&gt;")}
}
+ [Hint] -> htmlintro2_4hints
* [(wait for: code contains "<h1 style=\"color:purple\">")](Done)
-> htmlintro2_5


=== htmlintro2_5 ===
- Nice. What if you wanted to use a super-special shade of green, though? We would need a way to describe that exact color, like a painter might describe a new color she mixed...
You see where I'm going with this, right? We totally have a way to do that! It's called <b>hex color</b>, and it lets you create colors by using 6-digit numbers.
Here's an example hex color - <tt>\#76EECF</tt>
-> htmlintro2_6


=== htmlintro2_6 ===
- To use this hex color in your webpage, replace one of your color words with that hex code: <tt>\#76EECF<tt>
(You need the \"\#\" in front of it to tell the browser \"the next 6 letters or numbers are a hex color\")
Let's edit a <tt>&lt;p&gt;</tt>tag to make the text that hex color.
* [(wait for: code contains "<p style=\"color:\#76EECF\">")](Done)
-> htmlintro2_7


=== htmlintro2_7 ===
- Cool color! Change the numbers around and see if you can create another color!
- Hex color uses 1 - 9, and A B C D E F as numbers - It's a little out of our way right now to explain why, but if you're interested I'm happy to explain!
* [Y] Tell me more!
-> htmlintro2_7hexchars
* [N] Not right now, thanks.
-> htmlintro2_8


=== htmlintro2_7hexchars ===
- So, <b>hex colors</b> describe colors in terms of a mix of red, green and blue, in the space of 6 "numbers" - <b>RRGGBB</b>
<b>Hex colors</b> count using 1-9 and A-F because they have to stick to those 6 numbers only. With this way of describing colors, though, you've still got 16,777,216 possible colors!
+ [❯] That's a lot of colors!
-> htmlintro2_8


=== htmlintro2_8 ===
- If you'd like to use a color picker, check out this webpage: https:\/\/htmlcolorcodes.com/
- Ok, so you've got some color chops now. But do you know what would <b>really</b> make this page look cool? A new background color!
Look for the <tt>&lt;body&gt;</tt>tag in the code, near the top of the page. Just like we did for the &lt;p&gt; and &lt;h1&gt; tags, we're going to insert some new information in there.
This time, though, we need a slightly different wording - <tt>style="background-color:coral"<tt>
+ [Hints] -> htmlintro2_8hints
* [❯] CODE: Detect player adding style="background-color:coral" to the &lt;body&gt; tag
-> htmlintro2_9


=== htmlintro2_8hints ===
{ cycle:
    - Find the &lt;body&gt; tag near the top of the page, and then add the new color information into it, just like you did with the &lt;p&gt; tag.
    - Don't forget that this time we're using <tt>background-color</tt>instead of just <tt>color<tt>.
    - Your body tag should look like this: <tt>&lt;body style="background-color:coral"&gt;<tt>
}
+ [Hint] -> htmlintro2_8hints
* [❯] CODE: Detect player adding style="background-color:coral" to the &lt;body&gt; tag
-> htmlintro2_9


=== htmlintro2_9 ===
- Niiice! Now that's going to turn some heads.
So, how does it feel to have the tools to paint the whole internet? Come find me back in the Clubhouse to keep going!
-> END