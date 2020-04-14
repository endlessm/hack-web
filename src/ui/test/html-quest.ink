# main character: riley

VAR username = "hacker"
VAR flipped = false
VAR code = ""

-> begin

=== begin ===
- Hi, {username}! I know you've used the internet before - but have you ever wondered what goes into showing you all those web pages?
- I was wondering that, one day, and I decided to go find out. There was a ton to learn, but now that I've done the legwork, I can pass it on to you.
- OK, first, let's get you looking at the guts of a web page.
+ [❯] Okay
  -> in_html

=== in_html ===

- Here we are! One half of your browser shows you the code that makes up this webpage, and the other half shows what you'd see if you found this page on the internet.
- Just like computer programs, web pages are written in a kind of code - It's called HTML.
- You put HTML around text, and that tells your web browser what to show, and how to show it on your screen. Not so bad, right?
+ [❯] Tell me more.
  -> in_html2

=== in_html2 ===

- In HTML, everything with <tt>&lt;</tt> and <tt>&gt;</tt> around it is called a <tt>tag</tt>. Tags tell the browser how to display something - text, images, whatever.
- Tags come in pairs - an <tt>&lt;opening tag&gt;</tt>, and a <tt>&lt;/closing tag&gt;</tt>, like saying <b>start</b> and <b>stop</b>. Notice the "/" on the closing tag!
- You'll also see some text with <tt>'&lt;!--'</tt> and <tt>'--\&gt;'</tt> around it. Those are called <b>comments</b>, and the web browser won't look at them - they're info I put there to explain what some of the HTML does.
* [❯] A lot of theory...
  -> in_html3

=== in_html3 ===

- Let's get our hands dirty! Find the text <b>Hello, World!</b> In the <b>code</b> part of this page, and change it - make it your name, your favorite food, whatever you like.
* [(wait for: code not contains "Hello, world!")](Done)
  -> in_html4

=== in_html4 ===

- Awesome! You just edited a webpage! That makes you a web designer, and that's pretty cool.
- Let's take it one step further. Do you see the text that says <b>Welcome</b> near the top of the webpage? Try finding that text in the <b>code</b> area and changing it.
* [(wait for: code not contains "Welcome to my test website")](Done)
  -> success

=== success ===
Yes! You did it!
-> END
