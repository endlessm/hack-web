INCLUDE global-fxns.ink
# main character: riley

-> begin

=== begin ===
+ [HTML2 Original Version] -> html2orig
+ [HTML2 Interactivity Prototype] -> html2interactive
+ [P5JS Interactivity Prototype] -> p5jsproto
+ [Quit] -> END

=== html2orig ===
{  once:  
    - Hey again! Ready to dive a little deeper, {get_user_name()}?
    - First things first - let's get back to that web page previewer. {open_web_page("https:\/\/codepen.io/madetohack/pen/BaaKggj?editors=1000")}
    - Here's a fun fact - Just based on our last lesson, you already know enough to make your own webpage!
    - If you did, though, all you'd have is boring black text on a white background. Let's spice that up a little!
    - Find an opening <p> tag in your code, and add style=”color:blue” after the p. It should look like this: {display_code("<style=\"color:blue\">")}
    - Congratulations! You just <b>styled</b> some text! Now let's get even fancier.
    - Find another <p> tag and make <b>that</b> text orange.
    - If you did that right, the tag should look like this: <p style="color:orange">, and your text should be orange!
    - I wonder what happens if you try the same thing with an <h1> or <h2> tag? Try making one of those purple.
    - If you did it right, it should look something like <h1 style="color:purple">
    - Nice. What if you wanted to use a super-special shade of green, though? How would you do that?
    - It'd be really cool if we had a more specific way to express color, where we could say exactly how we want to mix it.
    - You see where I'm going with this, right? We totally do have that! It's called <b>hex color</b>, and it lets you create colors by using 6-digit numbers.
    - Here's an example hex color - #76EECF
    - To use this hex color in your webpage, replace one of your color words with that hex code: #76EECF
    - If you edited a <p> tag, it would be <p style="color:#76EECF">
    - Cool! Change the numbers around and see if you can create another color!
    - Hex color uses 1 - 9, and A B C D E F as numbers - It's a little out of our way right now to explain why, I can tell you later if you're interested.
    - If you want to use a color picker, you can try this webpage: https://htmlcolorcodes.com/
    - Ok, so you've got some color chops now. But do you know what would <b>really</b> make this page look cool?
    - I think we need to change the background color to something less boring. Look for the <body> tag in the code.
    - It should be near the top of the page. Inside that tag, put style="background-color:coral", just like you put the color information into a <p> tag.
    - Your body tag should look like this -<body style="background-color:coral">
    - Niiice! Now that's going to turn some heads.
    - So, how does it feel to have the tools to paint the whole internet? Come find me back in the Clubhouse to keep going!
}
+ [Next] -> html2orig
+ [Main Menu] -> begin

=== html2interactive ===
-> html2int1

=== html2int1 ===
- Hey again! Let's dive a little deeper, {get_user_name()}, and get back to that web page previewer. {open_web_page("https:\/\/codepen.io/madetohack/pen/BaaKggj?editors=1000")}
* [CODE: Detect Web Page Opening] -> html2int2
+ [Main Menu] -> begin

=== html2int2 ===
- Here's a fun fact: Just based on the previous activity, you already know enough to make your own webpage.
If you did, though, all you'd have is boring black text on a white background. Let's spice that up a little by coloring the text.
- Find an opening `<p>` tag in your code, and add `style=”color:blue”` after the `p`.

* [CODE: Detect player adding style=”color:blue”] -> html2int3
+ [Main Menu] -> begin

=== html2int3 ===
- Congratulations! You just <b>styled</b> some text! Now let's get even fancier - find another `<p>` tag and make <b>that</b> text orange.

* [CODE: Detect player adding style=”color:orange”] -> html2int4
+ [Main Menu] -> begin

=== html2int4 ===
- I wonder what happens if you try that with an `<h1>` or `<h2>` tag? Try making one of those purple.

* [CODE: Detect player adding style=”color:purple” to an H1 or H2 tag] -> html2int5
+ [Hints] -> html2int4hints
+ [Main Menu] -> begin

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
+ [Another Hint] -> html2int4hints
* [CODE: Detect player adding style=”color:purple” to an H1 or H2 tag] -> html2int5

=== html2int5 ===
- Nice. What if you wanted to use a super-special shade of green, though? We would need a way to describe that exact color, like a painter might describe a new color she mixed...
You see where I'm going with this, right? We totally have a way to do that! It's called <b>hex color</b>, and it lets you create colors by using 6-digit numbers.
Here's an example hex color - `76EECF`
-> html2int6

=== html2int6 ===
- To use this hex color in your webpage, replace one of your color words with that hex code: `\#76EECF`
(You need the "\#" in front of it to tell the browser "the next 6 letters or numbers are a hex color")
Let's edit a `<p>` tag to make the text that hex color.

* [CODE: Detect player adding style=\"color:\#76EECF\" to a <p> tag] -> html2int7
+ [Hints] -> html2int6hints
+ [Main Menu] -> begin

=== html2int6hints ===
{ cycle:
    - Remember, all you need to do is swap the color word for the hex color.
    - Your code should be `<p style=\"color:\#76EECF\">`
}

+ [Another Hint] -> html2int6hints
* [CODE: Detect player adding style=\”color:purple\” to an H1 or H2 tag] -> html2int7

=== html2int7 ===
- Cool color! Change the numbers around and see if you can create another color!
- Hex color uses 1 - 9, and A B C D E F as numbers - It's a little out of our way right now to explain why, but if you're interested I'm happy to explain!

* [Tell me more!] -> html2int7hexchars
* [Not right now, thanks.] -> html2int8

=== html2int7hexchars ===
- explanation tbd

* [Oh, I see!] -> html2int8

=== html2int8 ===
- If you'd like to use a color picker, check out this webpage: https://htmlcolorcodes.com/
- Ok, so you've got some color chops now. But do you know what would <b>really</b> make this page look cool? A new background color!
Look for the `<body>` tag in the code, near the top of the page. Just like we did for the <p> and <h1> tags, we're going to insert some new information in there.
This time, though, we need a slightly different wording - `style="background-color:coral"`

* [CODE: Detect player adding style="background-color:coral" to the <body> tag] -> html2int9
+ [Hints] -> html2int8hints
+ [Main Menu] -> begin

=== html2int8hints ===
{ cycle:
    - Find the <body> tag near the top of the page, and then add the new color information into it, just like you did with the <p> tag.
    - Don't forget that this time we're using `background-color` instead of just `color`.
    - Your body tag should look like this: `<body style="background-color:coral">`
}

+ [Another Hint] -> html2int8hints
* [CODE: Detect player adding style="background-color:coral" to the <body> tag] -> html2int9

=== html2int9 ===
- Niiice! Now that's going to turn some heads.
So, how does it feel to have the tools to paint the whole internet? Come find me back in the Clubhouse to keep going!
-> begin

=== p5jsproto ===
You find yourself in a maze of twisty passages, all alike.

+ [Get me out of here!] -> begin