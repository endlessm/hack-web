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
# language html
~ return "" + snip

=== begin ===
-> htmlintro3_1

=== htmlintro3_1 ===
-You're probably wondering if you can change text in other ways than just the color... and <b>yes, you can.</b> I've been doing it this whole time - wouldn't be fair for me to keep the trick to myself!
{open_web_page("https:\/\/codepen.io\/madetohack\/pen\/oNNYNXB?editors=1000")}
Let's get back into that HTML previewer, I've got a new page for you.
* [Next] CODE: Detect Web Page Opening
-> htmlintro3_2

=== htmlintro3_2 ===
-You'll notice that there's more text this time, so let's make the first paragraph stand out! Add the tags <tt>&lt;b&gt;</tt> and <tt>&lt;/b&gt;</tt> around the first sentence.

* [(wait for: code contains "<b><p>Hello world!</p></b>")](Done)
-> htmlintro3_3
* [(wait for: code contains "<p><b>Hello world!</b></p>")](Done)
-> htmlintro3_3

=== htmlintro2_3 ===
-Bold! You might have noticed that after you typed the opening <tt>&lt;b&gt;</tt> tag, everything in the entire page went bold until you typed the closing <tt>&lt;/b&gt;</tt> tag.
If you don't close tags, they apply until the end of the page, which is pretty much never what you want. So if you see something wierd, check your tags!
Along with bold text, you can also use italics, by putting <tt>&lt;i&gt;</tt> and <tt>&lt;/i&gt;</tt> around some text. You can even combine bold and italics - just put both sets of tags around the same text.
* [>](Next)
-> htmlintro3_4

=== htmlintro3_4 ===
-Now, let's try changing the size of the text. Size works like color, so it goes inside the <tt>&lt;p&gt;</tt> tag.
Try <tt>"font-size:200%"</tt> on a paragraph.
* [(wait for: code contains "<p style =\"font-size:200%\">")](Done)
-> htmlintro3_5

=== htmlintro3_5 ===
-See how that's similar to what we did with colors? We're adding another 'style' to the text, but this one talks about size.
-You can also use words like <b>xx-large</b> and <b>small</b> for <tt>font-size</tt>, instead of percentages. Here's a link to the W3Schools page with more info: https://www.w3schools.com/css/css_font.asp
-Now, we know that colors and sizes are just adding styles to the <tt>&lt;p&gt;</tt> tag, so check this out: You can combine them!
-Let's make the text in one of the <tt>&lt;p&gt;</tt> tags double-size and red:
<tt>&lt;p style="font-size:200%; color:red"&gt;</tt> Do you see where the semicolons (;) are?
-Each semicolon tells the browser that we're ending one formatting instruction and beginning another.
* [(wait for: code contains "<p style =\"font-size:200%; color:red;\">")](Done)
-> htmlintro3_6

=== htmlintro3_6 ===
-I take back what I said earlier - now <b>THAT</b> pops. Remember, you can also add these styles to <tt>&lt;h1&gt;</tt>, <tt>&lt;h2&gt;</tt>, and so on.
-Try making your <tt>&lt;h1&gt;</tt> text <b>green</b> and <b>small</b>!
* [(wait for: code contains "<p style =\"font-size:small; color:green;\">")](Done)
-> htmlintro3_7
* [(wait for: code contains "<p style =\"color:green; font-size:small;\">")](Done)
-> htmlintro3_7

=== htmlintro3_7 ===
-Great work so far! Now that you know how to make text look different, how about adding an image?
-The <tt>&lt;img&gt;</tt> tag is different than the other ones we've seen so far. It <b>requires</b> some additional information in order to work.
-You can't just type <tt>&lt;img&gt;</tt>, it needs the web address of the image to display, otherwise there's nothing for the browser to show!
-Try typing this into the code of the webpage - <tt>&lt;img src="http://www.w3schools.com/html/img_chania.jpg"&gt;</tt>
-The <tt>src</tt> part of the tag you can think of as the <b>source</b>. That's where the image is located. In this case, it's on another website.
* [(wait for: code contains "<img src=\"http://www.w3schools.com/html/img_chania.jpg\">")](Done)
-> htmlintro3_6

=== htmlintro3_8 ===
-Take a look at the way the <tt>&lt;img&gt;</tt> tag tag is written. Does that look familiar?
-Think back to when we were styling text (<tt>&lt;p style...</tt>) and how that tag was written. Look at the first parts of the two tags:
-<tt>&lt;img src="https://...</tt>
-<tt>&lt;p style="color...</tt>
-Do you see how there's a tag (<tt>p</tt> or <tt>img</tt>), then a modifier (<tt>style</tt> or <tt>src</tt>), and then information that applies to that modifier?
-HTML has consistent rules that you can learn, like any language. All tags follow this same basic format, and most of them even accept the same modifiers.
-If you can master the rules of HTML, you'll be able to use any tag, even ones you've never seen before.
* [>](Next)
-> htmlintro3_9

=== htmlintro3_9 ===
-You've done awesome work! Next time, I'll show you a secret trick that ties all of this together, and makes it a lot easier, too.
-> END