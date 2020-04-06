// INCLUDE global-fxns.ink
// includes broken as of 3/31
# main character: riley
-> begin

VAR code = ""

===function open_web_page(page)===
~ return "PLACEHOLDER: Opening " + page

===function get_user_name===
~ return "DefaultUser"

===function snippet_html(snip)===
# language html
~ return "" + snip

=== begin ===
-> htmlintro4_1

=== htmlintro4_1 ===
-Good to see you! I hope you're ready to learn some of the <b>inner secrets</b> of web design ^_^
{open_web_page("https:\/\/codepen.io\/madetohack\/pen\/vYYyNba?editors=1000")}
* [Next] CODE: Detect Web Page Opening
-> htmlintro4_2

=== htmlintro4_2 ===
-Well, here it is - there's a way to automate all those <tt>color=</tt> and <tt>font-size=</tt> bits you've been typing out one at a time. It's called CSS - that stands for <b>Cascading Style Sheets</b> - and it's pretty awesome. 
-Before, we used mostly HTML, which controls the information in a webpage. CSS lets us change how that information is  shown. Think of it like food - HTML is rice and chicken, and the CSS is all the different recipes that use those two basic building blocks. The food is the same, but the spices, colors, flavors can all be different.
* [>](Next)
-> htmlintro4_3

=== htmlintro4_3 ===
-You should notice a brand-new tag inside the <tt>&lt;head&gt;</tt> tag: <tt>&lt;style&gt;</tt>.
-Remember how you changed the color of the text? You modified a <tt>p</tt> or <tt>h1</tt> tag with <tt>style="color:green"</tt> (or whatever color your chose).
-The <tt>&lt;style&gt;</tt> tag standing in its own lets you centralize all that, and create a set of rules that can apply to all the tags in your webpage, like "Make paragraphs purple".
-Adding rules to the <tt>&lt;style&gt;</tt> tags tells the browser "when you see this tag, apply these changes to it."
-Let's give it a shot. To start, let's make all the paragraphs purple. Between <tt>&lt;style&gt;</tt> and <tt>&lt;/style&gt;</tt>, type:
<tt>p {
	color: purple;
}</tt>
* [(wait for: code contains "p { color: purple; }")](Done)
-> htmlintro4_4

=== htmlintro4_4 ===
-That's pretty stylish! That code you typed is telling the browser "every time you see the <tt>&lt;p&gt;</tt> tag, add <tt>color="purple"</tt> to it."
- Now that we've got some kickin' purple text, let's make it bigger.
-Add <tt>font-size: x-large;</tt> right after the color rule, keeping it inside the braces ( <b>{ }</b> ).
Don't forget at least a space between the rules, and definitely don't forget the semicolon (<b>;</b>) after each one.
<tt>p { color: purple; font-size: x-large; }</tt> inside it.
* [(wait for: code contains "font-size: x-large;")](Done)
-> htmlintro4_5

=== htmlintro4_5 ===
-Check out that text! Now <b>that's</b> got my attention.
-You can style other tags like this, too. Use the name of the tag, an open brace ( <b>{</b> ), your styling on a new line, and then a closing brace ( <b>}</b> ) on the next line.
-Let's try making the <tt>h1</tt> text red. 
* [(wait for: code contains "h1 { color:red; }")](Done)
-> htmlintro4_6

=== htmlintro4_6 ===
-Great job! Do you see how easy this can be, now?
-It doesn't matter how much text or how many tags you have in that page, the <tt>&lt;style&gt;</tt> tag will apply to all of it.
-There's still another level beyond this, though - What if I told you that you could make up your own tags?
-Come find me in the next activity when you want to learn how!
-> END