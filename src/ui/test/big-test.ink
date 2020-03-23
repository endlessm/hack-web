INCLUDE global-fxns.ink
# main character: riley

-> begin

=== begin ===
+ [HTML2 Original Version] -> html2orig
+ [HTML2 Interactivity Prototype] -> html2interactive

=== html2orig ===
{  once:  
    - Hey again! Ready to dive a little deeper, {get_user_name()}?
    - First things first - let's get back to that web page previewer. {open_web_page("https:\/\/codepen.io/madetohack/pen/BaaKggj?editors=1000")}
    - Here's a fun fact - Just based on our last lesson, you already know enough to make your own webpage!
    - If you did, though, all you'd have is boring black text on a white background. Let's spice that up a little!
    - Find an opening <p> tag in your code, and add style=”color:blue” after the p. It should look like this: {display_code("<style=\"color:blue\">")}
    - Congratulations! You just <b>styled</b> some text! Now let's get even fancier.
    - Find another <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF"><p></span></tt> tag and make <b>that</b> text orange.
    - If you did that right, the tag should look like this: <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF"><p style="color:orange"></span></tt>, and your text should be orange!
    - I wonder what happens if you try the same thing with an <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF"><h1></span></tt> or <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF"><h2></span></tt> tag? Try making one of those purple.
    - If you did it right, it should look something like <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF"><h1 style="color:purple"></span></tt>
    - Nice. What if you wanted to use a super-special shade of green, though? How would you do that?
    - It'd be really cool if we had a more specific way to express color, where we could say exactly how we want to mix it.
    - You see where I'm going with this, right? We totally do have that! It's called <b>hex color</b>, and it lets you create colors by using 6-digit numbers.
    - Here's an example hex color - <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF">#76EECF</span></tt>
    - To use this hex color in your webpage, replace one of your color words with that hex code: <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF">#76EECF</span></tt>
    - If you edited a <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF"><p></span></tt> tag, it would be <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF"><p style="color:#76EECF"></span></tt>
    - Cool! Change the numbers around and see if you can create another color!
    - Hex color uses 1 - 9, and A B C D E F as numbers - It's a little out of our way right now to explain why, I can tell you later if you're interested.
    - If you want to use a color picker, you can try this webpage: <u><span insert_hyphens="false" foreground="#3584E4">https://htmlcolorcodes.com/</span></u>
    - Ok, so you've got some color chops now. But do you know what would <b>really</b> make this page look cool?
    - I think we need to change the background color to something less boring. Look for the <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF"><body></span></tt> tag in the code.
    - It should be near the top of the page. Inside that tag, put <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF">style="background-color:coral"</span></tt>, just like you put the <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF">color</span></tt> information into a <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF"><p></span></tt> tag.
    - Your body tag should look like this -<tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF"><body style="background-color:coral"></span></tt>
    - Niiice! Now that's going to turn some heads.
    - So, how does it feel to have the tools to paint the whole internet? Come find me back in the Clubhouse to keep going!
    - -> success
}
+ [Next] -> html2orig
+ [Main Menu] -> begin



=== html2interactive ===

=== html2int1 ===
- Hey again! Let's dive a little deeper, {get_user_name()}, and get back to that web page previewer. {open_web_page("https:\/\/codepen.io/madetohack/pen/BaaKggj?editors=1000")}
* [CODE: Detect Web Page Opening] -> html2int2
+ [Main Menu] -> begin

=== html2int2 ===



- Here's a fun fact - Just based on our last lesson, you already know enough to make your own webpage!


- If you did, though, all you'd have is boring black text on a white background. Let's spice that up a little!


- Find an opening <p> tag in your code, and add style=”color:blue” after the p. It should look like this: {display_code("<style=\"color:blue\">")}


- Congratulations! You just <b>styled</b> some text! Now let's get even fancier.


- Find another <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF"><p></span></tt> tag and make <b>that</b> text orange.


- If you did that right, the tag should look like this: <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF"><p style="color:orange"></span></tt>, and your text should be orange!


- I wonder what happens if you try the same thing with an <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF"><h1></span></tt> or <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF"><h2></span></tt> tag? Try making one of those purple.


- If you did it right, it should look something like <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF"><h1 style="color:purple"></span></tt>


- Nice. What if you wanted to use a super-special shade of green, though? How would you do that?


- It'd be really cool if we had a more specific way to express color, where we could say exactly how we want to mix it.


- You see where I'm going with this, right? We totally do have that! It's called <b>hex color</b>, and it lets you create colors by using 6-digit numbers.


- Here's an example hex color - <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF">#76EECF</span></tt>


- To use this hex color in your webpage, replace one of your color words with that hex code: <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF">#76EECF</span></tt>


- If you edited a <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF"><p></span></tt> tag, it would be <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF"><p style="color:#76EECF"></span></tt>


- Cool! Change the numbers around and see if you can create another color!


- Hex color uses 1 - 9, and A B C D E F as numbers - It's a little out of our way right now to explain why, I can tell you later if you're interested.


- If you want to use a color picker, you can try this webpage: <u><span insert_hyphens="false" foreground="#3584E4">https://htmlcolorcodes.com/</span></u>


- Ok, so you've got some color chops now. But do you know what would <b>really</b> make this page look cool?


- I think we need to change the background color to something less boring. Look for the <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF"><body></span></tt> tag in the code.


- It should be near the top of the page. Inside that tag, put <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF">style="background-color:coral"</span></tt>, just like you put the <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF">color</span></tt> information into a <tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF"><p></span></tt> tag.


- Your body tag should look like this -<tt><span insert_hyphens="false" foreground="#287A8C" background="#FFFFFF"><body style="background-color:coral"></span></tt>


- Niiice! Now that's going to turn some heads.


- So, how does it feel to have the tools to paint the whole internet? Come find me back in the Clubhouse to keep going!


-> success

+ [Next] -> html2interactive
+ [Main Menu] -> begin




=== success ===
-> END