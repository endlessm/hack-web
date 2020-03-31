# main character: riley
-> begin

===function open_web_page(page)===
    ~ return "PLACEHOLDER: Opening " + page

===function get_user_name===
    ~ return "DefaultUser"

===function display_code(code)===
    ~ return "PLACEHOLDER: Displaying Code Snippet:  " + code

=== begin ===
- Choose a Quest!
+ [HTML2 Orig] -> html2orig
+ [HTML2 Inter.] -> html2interactive
+ [P5JS Inter.] -> p5jsproto
+ [Quit] -> END

=== html2orig ===
{  once:  
    - Hey again! Ready to dive a little deeper, {get_user_name()}?
    - First things first - let's get back to that web page previewer. {open_web_page("https:\/\/codepen.io/madetohack/pen/BaaKggj?editors=1000")}
    - Here's a fun fact - Just based on our last lesson, you already know enough to make your own webpage!
    - If you did, though, all you'd have is boring black text on a white background. Let's spice that up a little!
    - Find an opening <p> tag in your code, and add style=”color:blue” after the p. It should look like this: {display_code("<style=\"color:blue\">")}
    - Congratulations! You just *styled* some text! Now let's get even fancier.
    - Find another <p> tag and make *that* text orange.
    - If you did that right, the tag should look like this: <p style="color:orange">, and your text should be orange!
    - I wonder what happens if you try the same thing with an <h1> or <h2> tag? Try making one of those purple.
    - If you did it right, it should look something like <h1 style="color:purple">
    - Nice. What if you wanted to use a super-special shade of green, though? How would you do that?
    - It'd be really cool if we had a more specific way to express color, where we could say exactly how we want to mix it.
    - You see where I'm going with this, right? We totally do have that! It's called *hex color*, and it lets you create colors by using 6-digit numbers.
    - Here's an example hex color - \#76EECF
    - To use this hex color in your webpage, replace one of your color words with that hex code: \#76EECF
    - If you edited a <p> tag, it would be <p style="color:\#76EECF">
    - Cool! Change the numbers around and see if you can create another color!
    - Hex color uses 1 - 9, and A B C D E F as numbers - It's a little out of our way right now to explain why, I can tell you later if you're interested.
    - If you want to use a color picker, you can try this webpage: https://htmlcolorcodes.com/
    - Ok, so you've got some color chops now. But do you know what would *really* make this page look cool?
    - I think we need to change the background color to something less boring. Look for the <body> tag in the code.
    - It should be near the top of the page. Inside that tag, put style="background-color:coral", just like you put the color information into a <p> tag.
    - Your body tag should look like this -<body style="background-color:coral">
    - Niiice! Now that's going to turn some heads.
    - So, how does it feel to have the tools to paint the whole internet? Come find me back in the Clubhouse to keep going!
}
+ [❯] -> html2orig
+ [Menu] -> begin

=== html2interactive ===
Welcome to the HTML2 Interactive Quest!
-> html2int1

=== html2int1 ===
- Hey again! Let's dive a little deeper, {get_user_name()}, and get back to that web page previewer. {open_web_page("https:\/\/codepen.io/madetohack/pen/BaaKggj?editors=1000")}
* [❯] CODE: Detect Web Page Opening -> html2int2
+ [Menu] -> begin

=== html2int2 ===
- Here's a fun fact: Just based on the previous activity, you already know enough to make your own webpage.
If you did, though, all you'd have is boring black text on a white background. Let's spice that up a little by coloring the text.
- Find an opening `<p>` tag in your code, and add `style=”color:blue”` after the `p`.

* [❯] CODE: Detect player adding style=”color:blue” -> html2int3
+ [Menu] -> begin

=== html2int3 ===
- Congratulations! You just *styled* some text! Now let's get even fancier - find another `<p>` tag and make *that* text orange.

* [❯] CODE: Detect player adding style=”color:orange” -> html2int4
+ [Menu] -> begin

=== html2int4 ===
- I wonder what happens if you try that with an `<h1>` or `<h2>` tag? Try making one of those purple.

* [❯] CODE: Detect player adding style=”color:purple” to an H1 or H2 tag -> html2int5
+ [Hints] -> html2int4hints
+ [Menu] -> begin

=== html2int4hints ===
{ cycle:
    - Look for an `<h1>` or `<h2>` tag in the page, that's what you want to change.
    - Remember how you just turned the text *orange*? Do the same thing, but with *purple*!
    - If you're getting an error, make sure your *carets* (< and >) match up. For each *<* you need a *>*!
    - Don't forget that after `style=` you need quotes ("") around `color:purple`!
    - Your code should look like:
    `<h1 style="color:purple">`
    or
    `<h2 style="color:purple">`
}
+ [Hint] -> html2int4hints
* [❯] CODE: Detect player adding style=”color:purple” to an H1 or H2 tag -> html2int5

=== html2int5 ===
- Nice. What if you wanted to use a super-special shade of green, though? We would need a way to describe that exact color, like a painter might describe a new color she mixed...
You see where I'm going with this, right? We totally have a way to do that! It's called *hex color*, and it lets you create colors by using 6-digit numbers.
Here's an example hex color - `76EECF`
-> html2int6

=== html2int6 ===
- To use this hex color in your webpage, replace one of your color words with that hex code: `\#76EECF`
(You need the "\#" in front of it to tell the browser "the next 6 letters or numbers are a hex color")
Let's edit a `<p>` tag to make the text that hex color.

* [❯] CODE: Detect player adding style=\"color:\#76EECF\" to a <p> tag -> html2int7
+ [Hints] -> html2int6hints
+ [Menu] -> begin

=== html2int6hints ===
{ cycle:
    - Remember, all you need to do is swap the color word for the hex color.
    - Your code should be `<p style=\"color:\#76EECF\">`
}

+ [Hint] -> html2int6hints
* [❯] CODE: Detect player adding style=\”color:purple\” to an H1 or H2 tag -> html2int7

=== html2int7 ===
- Cool color! Change the numbers around and see if you can create another color!
- Hex color uses 1 - 9, and A B C D E F as numbers - It's a little out of our way right now to explain why, but if you're interested I'm happy to explain!

* [Y] Tell me more! -> html2int7hexchars
* [N] Not right now, thanks. -> html2int8

=== html2int7hexchars ===
- explanation tbd

* [❯] Oh, I see! -> html2int8

=== html2int8 ===
- If you'd like to use a color picker, check out this webpage: https:\/\/htmlcolorcodes.com/
- Ok, so you've got some color chops now. But do you know what would *really* make this page look cool? A new background color!
Look for the `<body>` tag in the code, near the top of the page. Just like we did for the <p> and <h1> tags, we're going to insert some new information in there.
This time, though, we need a slightly different wording - `style="background-color:coral"`

* [❯] CODE: Detect player adding style="background-color:coral" to the <body> tag -> html2int9
+ [Hints] -> html2int8hints
+ [Menu] -> begin

=== html2int8hints ===
{ cycle:
    - Find the <body> tag near the top of the page, and then add the new color information into it, just like you did with the <p> tag.
    - Don't forget that this time we're using `background-color` instead of just `color`.
    - Your body tag should look like this: `<body style="background-color:coral">`
}

+ [Hint] -> html2int8hints
* [❯] CODE: Detect player adding style="background-color:coral" to the <body> tag -> html2int9

=== html2int9 ===
- Niiice! Now that's going to turn some heads.
So, how does it feel to have the tools to paint the whole internet? Come find me back in the Clubhouse to keep going!
-> begin

=== p5jsproto ===
-> p5jsproto1

=== p5jsproto1 ===
- Hey {get_user_name()}, I've got something *super* cool for you!
I've been learning a new programming language for making interactive art - I think it's right up your alley!
- It's called *p5.js* - The "js" part comes from *JavaScript* - you've probably heard of it before, it runs a ton of websites.
- Even better, *p5.js* has a live online editor we can use!
* [❯] Open https:\/\/editor.p5js.org/ -> p5jsproto2

=== p5jsproto2 ===
- Here's what I've figured out so far: The code is on the left, and the preview is on the right.
To run the code, click the play button. Let's try that right now.
* [❯] CODE: User clicks play -> p5jsproto3

=== p5jsproto3 ===
- There you go! Not very interesting, but then again, there's not much code here.
Let's see if we can add something...
- There are 2 different parts in this program - one called `setup() and the other called `draw().
`setup()` creates the place where everything gets drawn, and `draw() is where the action happens.
- OK, first, let's change that boring grey! Change the line with `background` to read `background('green')`.
+ [❯] CODE: User changes background to green -> p5jsproto4
+ [E] CODE: User makes an error -> p5jsproto3error

=== p5jsproto3error ===
- Hey, no problem, I got so many errors when I first started. Good thing they tell you where the problem is!
You might have forgotten to put quotes around `green`, or you might have forgotten to match your parentheses.
After you fix the error, press 'Play' again!
+ [❯] CODE: User changes background to green -> p5jsproto4

=== p5jsproto4 ===
- Much better! Just like with other web languages, you can also use a *hex color* like `\#76EECF` or `\#FFAA00` instead of a named color.
You can get more info on hex colors at  https:\/\/htmlcolorcodes.com/
Once you've added your hex color, click play, to see it in action!
+ [❯] CODE: User changes background to green -> p5jsproto5

=== p5jsproto5 ===
- Okay, so we've got a background - now let's draw a shape on that background.
How about a circle? Let's add a new line of code to the `draw() function.
Make sure to add this new line after `background(...), but before the ending `\}`, so that the program knows it's a part of `draw()`
Type `circle(100,200,50);` to draw a circle 100 pixels to the right, 200 pixels down, and 50 pixels in diameter.
Don't forget the semicolon ( `; ), which lets the program know you've finished a line of code.
+ [❯] CODE: User draws a circle -> p5jsproto6

=== p5jsproto6 ===
- You can try playing around with the numbers in the parentheses to see if you can make your circle bigger or move it right, left, up, and down.
If you typed a number bigger than 400, your circle probably went off the screen.
Remember how in the `setup() function it says the canvas is 400 x 400? Let's make our canvas bigger!
Change the two numbers in the `createCanvas() function - they control how wide and tall the canvas is.
(I used `createCanvas(600,600), BTW)
+ [❯] CODE: User changes canvas size -> p5jsproto7

=== p5jsproto7 ===
- Nice, with that new canvas size, your bigger circle should show up now! I gotta run, but there's a ton more stuff to show you in *p5.js*!
Next time, we'll add color to our circle, and make it move around the screen to follow the mouse. Catch you later!
+ [❯] -> begin