INCLUDE global-fxns.ink
# main character: riley

-> begin

=== begin ===
-> instructions

=== instructions ===
{  once:  
    - Hi, {get_user_name()}! I know you've used the internet before - but have you ever wondered what goes into showing you all those web pages?
    - I was wondering that, one day, and I decided to go find out. There was a ton to learn, but now that I've done the legwork, I can pass it on to you.
    - OK, first, let's get you looking at the guts of a web page.
    {open_web_page("https:\/\/codepen.io/madetohack/pen/BaaNeXj?editors=1000")}
    - Here we are! One half of your browser shows you the code that makes up this webpage, and the other half shows what you'd see if you found this page on the internet.
    - Just like computer programs, web pages are written in a kind of code - It's called HTML.
    - You put HTML around text, and that tells your web browser what to show, and how to show it on your screen. Not so bad, right?
    - In HTML, everything with `<` and `>` around it is called a `tag`. Tags tell the browser how to display something - text, images, whatever.
    - Tags come in pairs - an `<opening tag>`, and a `</closing tag>`, like saying *start* and *stop*. Notice the "/" on the closing tag!
    - You'll also see some text with `<!\-\-` and `\-\-\>` around it. Those are called *comments*, and the web browser won't look at them - they're info I put there to explain what some of the HTML does.
    - Let's get our hands dirty! Find the text *Hello, World!* in the *code* part of this page, and change it - make it your name, your favorite food, whatever you like.
    - Awesome! You just edited a webpage! That makes you a web designer, and that's pretty cool.
    - Let's take it one step further. Do you see the text that says *Welcome* near the top of the webpage? Try finding that text in the *code* area and changing it.
    - That's right - it's between the `<h1>` and `</h1>` tags. Nice job!
    - See, HTML isn't as confusing as you thought, right?
    Find me back in the Clubhouse, and we'll continue the adventure in a more... *colorful*... way!
    - -> success
}
+ [Next] -> instructions

=== success ===
-> END