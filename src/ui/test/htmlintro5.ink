INCLUDE global-fxns.ink
# main character: riley

-> begin

VAR code = ""

=== begin ===
-> htmlintro5_1

=== htmlintro5_1 ===
-OK, are you ready to forge your own tags in the fires of the internet?
* [❯] (...Sure?)
-> htmlintro5_2

=== htmlintro5_2 ===
-...That sounded better in my head. Let's just ... move on...
{open_web_page("https:\/\/codepen.io\/madetohack\/pen\/LYYxzOo?editors=1000")}
* [❯]
-> htmlintro5_3

=== htmlintro5_3 ===
-So, why would you need to make your own tags? Well, what if you have 20 <tt>&lt;p&gt;</tt> tags and you want some to be red, some blue, and some green? Because they're all <tt>&lt;p&gt;</tt> tags, you can't use the <tt>&lt;style&gt;</tt> tag, since that would apply to all of them \- so it'd be a lot of work to do that one by one!
-To solve that problem, you'd need to create your own tags! It's a good thing that I can show you how to do that. ^_^ As our first step, we need to check out <tt>&lt;div&gt;</tt> tags. The name is short for division, because they're used to divide your page up.
-Surround the first set of <tt>&lt;p&gt;</tt> tags in this page with a <tt>&lt;div&gt;</tt> tag.
+ [Hint]
-> htmlintro5_3_hints
* [(wait for: code contains "<div> </div>")](Done)
-> htmlintro5_4

=== htmlintro5_3_hints ===
{ cycle:
	-You should have an opening <tt>&lt;div&gt;</tt> tag on line 10 and the closing <tt>&lt;/div&gt;</tt> tag on line 16.
	-Another relevant hint.
}
+ [Hint]
-> htmlintro5_3_hints
* [(wait for: code contains "<div> </div>")](Done)
-> htmlintro5_4

=== htmlintro5_4 ===
-Cool, now we can use that <tt>&lt;div&gt;</tt> tag to style the text. Add some color to everything in your div tag, using the <tt>&lt;style&gt;</tt> section of the page. It works just like you'd make your <tt>&lt;p&gt;</tt> or <tt>&lt;h1&gt;</tt> blue.
+ [Hint]
-> htmlintro5_4_hints
* [(wait for: code contains "<div> </div>")](Done)
-> htmlintro5_5

=== htmlintro5_4_hints ===
{ cycle:
	-Remember how you made <tt>p</tt> tags blue? Name of tag, open brace, thing you want to do, close brace. Easy!
	-You need to add <tt>div \{<br>&emsp;color:blue;<br>\}</tt> to your style tag!
}
+ [Hint]
-> htmlintro5_4_hints
* [(wait for: code contains "<div> </div>")](Done)
-> htmlintro5_5

=== htmlintro5_5 ===
- OK, now some prep for my next trick: make that first <tt>&lt;div&gt;</tt> tag read <tt>&lt;div id="first"&gt;</tt> It looks wierd, but I'll explain in a minute, I promise.
-Now, let's make another section. Add <tt>&lt;div id="second"&gt;</tt> on line 17 and a closing <tt>&lt;/div&gt;</tt> tag on line 18.
* [(wait for: code contains "<div id=\"second\"> </div>")](Done)
-> htmlintro5_6

=== htmlintro5_6 ===
-The second section of text should now be blue, too. But what's up with those <tt>id</tt> bits?
-<tt>id</tt> is key for turning normal, boring <tt>&lt;div&gt;</tt> tags into unique tags.
-Because you gave those two <tt>&lt;div&gt;</tt>s different <b>id</b>s, you can make styles apply to only one of them, even though they're both <tt>&lt;div&gt;</tt> tags!
-Change your <tt>div</tt> line in the <tt>&lt;style&gt;</tt> tag to <tt>div#first</tt> . We're going to make our <tt>&lt;div&gt;</tt>s different colors.
* [(wait for: code contains "div\#first")](Done)
-> htmlintro5_7

=== htmlintro5_7 ===
-Now, write another line below that for the <tt>&lt;div&gt;</tt> named "second".
-Let's try making <tt>div\#second</tt> green, just like you'd do it for any other tag.
+ [Hint]
-> htmlintro5_7_hints
* [(wait for: code contains "div\#second \{ color: green; \}")](Done)
-> htmlintro5_8

=== htmlintro5_7_hints ===
-Try <tt>div\#second \{<br>&emsp;color: green;<br>\}</tt>
* [(wait for: code contains "div\#second \{ color: green; \}")](Done)
-> htmlintro5_8

=== htmlintro5_8 ===
-Check out your page, the two <tt>div</tt>s should be different colors! Cool, huh?
-Try adding another named <tt>&lt;div&gt;</tt> for the middle <tt>&lt;p&gt;</tt> tag (div#third), and making that text pink.
+ [Hint]
-> htmlintro5_8_hints
* [(wait for: code contains "div\#third \{ color: pink; \}")](Done)
-> htmlintro5_9


=== htmlintro5_8_hints ===
{ cycle:
	-So, you would first put <tt>&lt;div id="third"&gt;</tt> before the <tt>&lt;p&gt;</tt> tag.
	-Next, you'd put a <tt>&lt;/div&gt;</tt> after the closing <tt>&lt;/p&gt;</tt> tag.
	-Last, you'd add <tt>div#third { color:pink; }</tt> to the <tt>&lt;style&gt;</tt> tag.
}
+ [Hint]
-> htmlintro5_8_hints
* [(wait for: code contains "div\#third \{ color: pink; \}")](Done)
-> htmlintro5_9

=== htmlintro5_9 ===
-That's a pretty impressive-looking page. ^_^
-Don't forget that you can also change the <tt>font-size</tt>, and everything else we've previously done to style text, too. For example, try changing the paragraph colors to follow the rainbow - Red, Orange, Yellow, Green, Blue, Indigo, Violet.
-There are so many other things you can change about each tag, we've barely scratched the surface. Check out https:\/\/www.w3schools.com\/ for <b>tons</b> more info and tutorials about HTML and CSS - It's one of the best reference sites around.
-Here's where this particular adventure ends, for the moment. Thanks for sticking with me the whole way, and I hope you learned some cool tricks! See you around!
-> END
