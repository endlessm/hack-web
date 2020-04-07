INCLUDE global-fxns.ink
# main character: riley
-> begin

VAR code = ""

=== begin ===
-> htmlintro1_1

=== htmlintro1_1 ===
- Hi, {get_user_name()}! I know you've used the internet before - but have you ever wondered what goes into showing you all those web pages?
- I was wondering that, one day, and I decided to go find out. There was a ton to learn, but now that I've done the legwork, I can pass it on to you.
* [❯]
-> htmlintro1_2


=== htmlintro1_2 ===
- On your left, we've got a sort of website operating room set up. The left half shows you the code, and the right side shows what you'd see if you found the page on the internet.
- Just like computer programs, web pages are written in a kind of code, called HTML.
- You put the HTML code around text, and that tells your web browser what to show and how to show it. Not so bad, right?
* [❯]
-> htmlintro1_3


=== htmlintro1_3 ===
- In HTML, everything with <tt>&lt;</tt> and <tt>&gt;</tt> around it is called a <b>tag</b>. Tags tell the browser how to display something - text, images, whatever.
- Tags come in pairs - an <tt><opening tag></tt>, and a <tt></closing tag></tt>, like saying <b>start</b> and <b>stop</b>. Notice the forward slash ( <b>/</b> ) on the closing tag!
- You'll also see some text with <tt>&lt;!--</tt> and <tt>--\\&gt;</tt> around it. Those are called <b>comments</b>, and the web browser won't look at them - they're info I put there to explain what some of the HTML does.
- Let's get our hands dirty! Find the text <b>Hello, World!</b> in the <b>code</b> part of this page, and change it - make it your name, your favorite food, whatever you like.
* [(wait for: code not contains "Hello World!")] -> htmlintro1_4


=== htmlintro1_4 ===
- Awesome! You just edited a webpage! That makes you a web designer, and that's pretty cool.
Let's take it one step further. Do you see the text that says *Welcome* near the top of the webpage?
Try finding that text in the *code* area and changing it.
* [(wait for: code not contains "Welcome")] -> htmlintro1_5


=== htmlintro1_5 ===
- Nice job! See, HTML isn't as confusing as you thought, right? In the next activity, we'll continue the adventure in a more... <b>colorful</b>... way!
See you then!
-> END