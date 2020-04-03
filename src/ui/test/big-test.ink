INCLUDE global-fxns.ink
# main character: riley
-> begin

VAR code = ""
VAR goal_reached = ""

=== begin ===
- Hello, {get_user_name()}! This is the Prototype Quest!
+ [Go] -> proto 
+ [Quit] -> END

=== proto ===
{  once:  
    - Hey again! Ready to dive a little deeper, {get_user_name()}?
    - First things first - let's get back to that web page previewer. {open_web_page("https:\/\/codepen.io/madetohack/pen/BaaKggj?editors=1000")}
    - Here's a fun fact - Just based on our last lesson, you already know enough to make your own webpage!
    - If you did, though, all you'd have is boring black text on a white background. Let's spice that up a little!
    - Find an opening &lt;p&gt; tag in your code, and add style=”color:blue” after the p. It should look like this: {display_code("&lt;style=\"color:blue\"&gt;")}
    - Congratulations! You just *styled* some text! Now let's get even fancier.
    - Find another &lt;p&gt; tag and make *that* text orange.
    - If you did that right, the tag should look like this: &lt;p style="color:orange"&gt;, and your text should be orange!
    - I wonder what happens if you try the same thing with an &lt;h1&gt; or &lt;h2&gt; tag? Try making one of those purple.
    - If you did it right, it should look something like &lt;h1 style="color:purple"&gt;
    - Nice. What if you wanted to use a super-special shade of green, though? How would you do that?
    - It'd be really cool if we had a more specific way to express color, where we could say exactly how we want to mix it.
    - You see where I'm going with this, right? We totally do have that! It's called *hex color*, and it lets you create colors by using 6-digit numbers.
    - Here's an example hex color - \#76EECF
    - To use this hex color in your webpage, replace one of your color words with that hex code: \#76EECF
    - If you edited a &lt;p&gt; tag, it would be &lt;p style="color:\#76EECF"&gt;
    - Cool! Change the numbers around and see if you can create another color!
    - Hex color uses 1 - 9, and A B C D E F as numbers - It's a little out of our way right now to explain why, I can tell you later if you're interested.
    - If you want to use a color picker, you can try this webpage: https://htmlcolorcodes.com/
    - Ok, so you've got some color chops now. But do you know what would *really* make this page look cool?
    - I think we need to change the background color to something less boring. Look for the &lt;body&gt; tag in the code.
    - It should be near the top of the page. Inside that tag, put style="background-color:coral", just like you put the color information into a &lt;p&gt; tag.
    - Your body tag should look like this -&lt;body style="background-color:coral"&gt;
    - Niiice! Now that's going to turn some heads.
    - So, how does it feel to have the tools to paint the whole internet? Come find me back in the Clubhouse to keep going!
}
+ [❯] -> proto
+ [Menu] -> begin