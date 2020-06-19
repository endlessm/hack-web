# main character: riley
INCLUDE common.ink

VAR html = ""
VAR css = ""

-> begin

=== baditems_minder
    * (gadolinium) [(wait for: html not contains "<li>77.683 grams of Gadolinium.</li>")] #
        No idea why a radioactive isotope was in this list...
        -> baditems_minder
    * (fish) [(wait for: html not contains "140 pounds of Swedish Fish")] #
        A few Swedish Fish is ok, but 140 pounds? Yuck.
        -> baditems_minder
    * (bore) [(wait for: html not contains "Engage cross borehole electromagnetic imaging rhubarb")] #
        ... cross borehole ... rhubarb? I'm going to have to look THAT up later...
        -> baditems_minder
    * {gadolinium + fish + bore > 2}
        # character: riley
        Great work! All fixed!
        ->->
    * [Hint] Can I have a hint?
        -> baditems_hint

=== baditems_hint
    # character: riley
    Check out those wierd ingredients - Gadolinium, Swedish fish, and what the heck is a cross borehole... thing? Those are definitely not part of a cookie recipe!
    -> baditems_minder


=== dry_ingredients_minder
    *  (flour) {not flour_alt} {not flour_alt2} {not flour_alt3} [(wait for: html icontains "<li>1 3/4 cups of flour.</li>")] #
        Flour, check!
        -> dry_ingredients_minder
    * (flour_alt) {not flour} {not flour_alt2} {not flour_alt3} [(wait for: html icontains "<li> 1 3/4 cups of flour. </li>")] #
        Flour, check!
        -> dry_ingredients_minder
    * (flour_alt2) {not flour} {not flour_alt} {not flour_alt3} [(wait for: html icontains "<li> 1 3/4 cups of flour.</li>")] #
        Flour, check!
        -> dry_ingredients_minder
    * (flour_alt3) {not flour} {not flour_alt} {not flour_alt2} [(wait for: html icontains "<li>1 3/4 cups of flour. </li>")] #
        Flour, check!
        -> dry_ingredients_minder

    * (salt) {not salt_alt} {not salt_alt2} {not salt_alt3} [(wait for: html icontains "<li>2 teaspoons salt.</li>")] #
        Salt looks good!
        -> dry_ingredients_minder
    * (salt_alt) {not salt} {not salt_alt2} {not salt_alt3} [(wait for: html icontains "<li> 2 teaspoons salt. </li>")] #
        Salt looks good!
        -> dry_ingredients_minder
    * (salt_alt2) {not salt} {not salt_alt} {not salt_alt3} [(wait for: html icontains "<li> 2 teaspoons salt.</li>")] #
        Salt looks good!
        -> dry_ingredients_minder
    * (salt_alt3) {not salt} {not salt_alt} {not salt_alt2} [(wait for: html icontains "<li>2 teaspoons salt. </li>")] #
        Salt looks good!
        -> dry_ingredients_minder

    * (bksoda) {not bksoda_alt} {not bksoda_alt2} {not bksoda_alt3} [(wait for: html icontains "<li>1 teaspoon baking soda.</li>")] #
        Baking soda: Done!
        -> dry_ingredients_minder
    * (bksoda_alt) {not bksoda} {not bksoda_alt2} {not bksoda_alt3} [(wait for: html icontains "<li> 1 teaspoon baking soda. </li>")] #
        Baking soda: Done!
        -> dry_ingredients_minder
    * (bksoda_alt2) {not bksoda} {not bksoda_alt} {not bksoda_alt3} [(wait for: html icontains "<li> 1 teaspoon baking soda.</li>")] #
        Baking soda: Done!
        -> dry_ingredients_minder
    * (bksoda_alt3) {not bksoda} {not bksoda_alt} {not bksoda_alt2} [(wait for: html icontains "<li>1 teaspoon baking soda. </li>")] #
        Baking soda: Done!
        -> dry_ingredients_minder

    * (choc) {not choc_alt} {not choc_alt2} {not choc_alt3} [(wait for: html icontains "<li>About 2/3 cup chocolate, broken up into pieces about the size of a fingernail.</li>")] #
        Chocolate's good to go!
        -> dry_ingredients_minder
    * (choc_alt) {not choc} {not choc_alt2} {not choc_alt3} [(wait for: html icontains "<li> About 2/3 cup chocolate, broken up into pieces about the size of a fingernail. </li>")] #
        Chocolate's good to go!
        -> dry_ingredients_minder
    * (choc_alt2) {not choc} {not choc_alt} {not choc_alt3} [(wait for: html icontains "<li> About 2/3 cup chocolate, broken up into pieces about the size of a fingernail.</li>")] #
        Chocolate's good to go!
        -> dry_ingredients_minder
    * (choc_alt3) {not choc} {not choc_alt} {not choc_alt2} [(wait for: html icontains "<li>About 2/3 cup chocolate, broken up into pieces about the size of a fingernail. </li>")] #
        Chocolate's good to go!
        -> dry_ingredients_minder


    * {flour + salt + bksoda + choc + flour_alt + salt_alt + bksoda_alt + choc_alt + flour_alt2 + salt_alt2 + bksoda_alt2 + choc_alt2 + flour_alt3 + salt_alt3 + bksoda_alt3 + choc_alt3 > 3}
        # character: riley
        Great work! Everything's in the list!
        ->->


=== instructions_minder
    * (mix) {not mix_alt} {not mix_alt2} {not mix_alt3} [(wait for: html icontains "<li>Mix the dry ingredients together in one bowl, then mix the wet ingredients together in a different bowl.</li>")] #
        Mix it up!
        -> instructions_minder
    * (mix_alt) {not mix} {not mix_alt2} {not mix_alt3} [(wait for: html icontains "<li> Mix the dry ingredients together in one bowl, then mix the wet ingredients together in a different bowl. </li>")] #
        Mix it up!
        -> instructions_minder
    * (mix_alt2) {not mix} {not mix_alt} {not mix_alt3} [(wait for: html icontains "<li> Mix the dry ingredients together in one bowl, then mix the wet ingredients together in a different bowl.</li>")] #
        Mix it up!
        -> instructions_minder
    * (mix_alt3) {not mix} {not mix_alt} {not mix_alt2} [(wait for: html icontains "<li>Mix the dry ingredients together in one bowl, then mix the wet ingredients together in a different bowl. </li>")] #
        Mix it up!
        -> instructions_minder

    * (pour) {not pour_alt} {not pour_alt2} {not pour_alt3} [(wait for: html icontains "<li>Pour both bowls together and mix everything until it looks pretty smooth.</li>")] #
        Combine...
        -> instructions_minder
    * (pour_alt) {not pour} {not pour_alt2} {not pour_alt3} [(wait for: html icontains "<li> Pour both bowls together and mix everything until it looks pretty smooth. </li>")] #
        Combine...
        -> instructions_minder
    * (pour_alt2) {not pour} {not pour_alt} {not pour_alt3} [(wait for: html icontains "<li> Pour both bowls together and mix everything until it looks pretty smooth.</li>")] #
        Combine...
        -> instructions_minder
    * (pour_alt3) {not pour} {not pour_alt} {not pour_alt2} [(wait for: html icontains "<li>Pour both bowls together and mix everything until it looks pretty smooth. </li>")] #
        Combine...
        -> instructions_minder

    * (tray) {not tray_alt} {not tray_alt2} {not tray_alt3} [(wait for: html icontains "<li>Make the dough into balls about half as big as an egg, and leave 3 or 4 inches between them on your baking tray. (You might have enough for almost 3 baking trays!)</li>")] #
        Let's get this on a tray, nice.
        -> instructions_minder
    * (tray_alt) {not tray} {not tray_alt2} {not tray_alt3} [(wait for: html icontains "<li> Make the dough into balls about half as big as an egg, and leave 3 or 4 inches between them on your baking tray. (You might have enough for almost 3 baking trays!) </li>")] #
        Let's get this on a tray, nice.
        -> instructions_minder
    * (tray_alt2) {not tray} {not tray_alt} {not tray_alt3} [(wait for: html icontains "<li> Make the dough into balls about half as big as an egg, and leave 3 or 4 inches between them on your baking tray. (You might have enough for almost 3 baking trays!)</li>")] #
        Let's get this on a tray, nice.
        -> instructions_minder
    * (tray_alt3) {not tray} {not tray_alt} {not tray_alt2} [(wait for: html icontains "<li>Make the dough into balls about half as big as an egg, and leave 3 or 4 inches between them on your baking tray. (You might have enough for almost 3 baking trays!) </li>")] #
        Let's get this on a tray, nice.
        -> instructions_minder

    * (bake) {not bake_alt} {not bake_alt2} {not bake_alt3} [(wait for: html icontains "<li>Set your oven to 350 degrees (about 180 degrees Celcius if you're outside the USA), and bake for 15 minutes.</li>")] #
        Bake!
        -> instructions_minder
    * (bake_alt) {not bake} {not bake_alt2} {not bake_alt3} [(wait for: html icontains "<li> Set your oven to 350 degrees (about 180 degrees Celcius if you're outside the USA), and bake for 15 minutes. </li>")] #
        Bake!
        -> instructions_minder
    * (bake_alt2) {not bake} {not bake_alt} {not bake_alt3} [(wait for: html icontains "<li> Set your oven to 350 degrees (about 180 degrees Celcius if you're outside the USA), and bake for 15 minutes.</li>")] #
        Bake!
        -> instructions_minder
    * (bake_alt3) {not bake} {not bake_alt} {not bake_alt2} [(wait for: html icontains "<li>Set your oven to 350 degrees (about 180 degrees Celcius if you're outside the USA), and bake for 15 minutes. </li>")] #
        Bake!
        -> instructions_minder

    * (eat) {not eat_alt} {not eat_alt2} {not eat_alt3} [(wait for: html icontains "<li>Eat your delicious, awesome, home-made cookies! (But not all at once.)</li>")] #
        Sweet, sweet rewards!
        -> instructions_minder
    * (eat_alt) {not eat} {not eat_alt2} {not eat_alt3} [(wait for: html icontains "<li> Eat your delicious, awesome, home-made cookies! (But not all at once.) </li>")] #
        Sweet, sweet rewards!
        -> instructions_minder
    * (eat_alt2) {not eat} {not eat_alt} {not eat_alt3} [(wait for: html icontains "<li> Eat your delicious, awesome, home-made cookies! (But not all at once.)</li>")] #
        Sweet, sweet rewards!
        -> instructions_minder
    * (eat_alt3) {not eat} {not eat_alt} {not eat_alt2} [(wait for: html icontains "<li>Eat your delicious, awesome, home-made cookies! (But not all at once.) </li>")] #
        Sweet, sweet rewards!
        -> instructions_minder

    * {mix + pour + tray + bake + eat + mix_alt + pour_alt + tray_alt + bake_alt + eat_alt + mix_alt2 + pour_alt2 + tray_alt2 + bake_alt2 + eat_alt2 + mix_alt3 + pour_alt3 + tray_alt3 + bake_alt3 + eat_alt3 > 4}
        # character: riley
        Instructions done!
        ->->


=== css1_minder
    * (cssol) [(wait for: css icontains "ol li \{")] #
        Now it's more specific!
        -> css1_minder
    * (csscolor) {not csscolor_alt} [(wait for: css icontains "color: violet;")] #
        Color's good.
        -> css1_minder
    * (csscolor_alt) {not csscolor} [(wait for: css icontains "color:violet;")] #
        Color's good.
        -> css1_minder
    * {cssol + csscolor + csscolor_alt > 1}
        # character: riley
        Good work, CSS done.
        ->->


=== begin ===
-> html1_1

=== html1_1 ===
- Hi, {get_user_name()}! I know you've used the internet before - but have you ever wondered what goes into showing you a web page? I decided to go find out, and now I can share it with you!
* [attracting: ❯] ❯
-> html1_2

=== html1_2 ===
- Since I love cooking, I had my friend Felix write up one of my favorite recipes as a website, and put it into our website testing area! The left half shows you the HTML code, and the right side shows the result, like if this were an actual page on the internet.
- The left half works just like any text editor:
You can copy and paste (<b>Ctrl + C</b> and <b>Ctrl + V</b> on PC or Linux, <b>⌘ + C</b> and <b>⌘ + V</b> on a Mac)
You can undo (<b>Ctrl + Z</b> on PC and Linux, <b>⌘ + Z</b> on Mac)
If you really get lost, you can reset all the text by pressing the <b>Reset</b> button in the upper right corner of the website testing area.
* ❯
-> html1_3

=== html1_3 ===
- Oops, looks like Felix made a mistake when he was setting up the page... That's not a good title for a cookie recipe at all!
- Let's fix it - Find those nonsense words in the <b>HTML</b> part of this page, and change it to <b>Super-Awesome Cookies</b>!
-
* [(wait for: html icontains "<h1>Super-Awesome Cookies</h1>")] (Done)
-> html1_4
* [(wait for: html icontains "<h1> Super-Awesome Cookies </h1>")] (Done)
-> html1_4
* [(wait for: html icontains "<h1>Super-Awesome Cookies </h1>")] (Done)
-> html1_4
* [(wait for: html icontains "<h1> Super-Awesome Cookies</h1>")] (Done)
-> html1_4

=== html1_4 ===
- Great job, you just edited a webpage! Now, let's move on to making this recipe a litt--- wait. Do you see what I see in the ingredient list and instructions?
* [👍] Yeah, I think so!
-> html1_fix
* [👎] Not really...
-> html1_dontsee

=== html1_dontsee ===
- Check out some of those ingredients... Swedish Fish? Gadolinium? This is supposed to be a Chocolate Chip Cookie recipe, I think Felix has been playing tricks on me again.
* ❯
-> html1_fix

=== html1_fix ===
- We need to fix the text here before we can go any farther. Find the ingredients and instructions that don't make any sense, and get rid of them!
- Go into the <b>HTML</b> area and delete all the text for those weird ingredients and instructions. If you see text with <tt>&lt;</tt> and <tt>&gt;</tt> on the same line, you can delete that too. Clean the entire line out!
-> baditems_minder -> html1_5

=== html1_5 ===
- Great, we've cleaned out all those ingredients and instructions that don't make sense. Let's look at how the recipe's <b>formatting</b> now - the way it shows up on the page.
- The <b>wet ingredients</b> look good, they're <b>formatted</b> in a clear list, but the <b>dry ingredients</b> could use some help.
* ❯
-> html1_6

=== html1_6 ===
- To learn how to <b>format</b>, we need to learn about <b>tags</b>. In HTML, everything with <tt>&lt;</tt> and <tt>&gt;</tt> around it is called a <b>tag</b>. Tags tell the browser how to display text, image and anything else you want on the page.
* ❯
-> html1_7

=== html1_7 ===
- Tags come in pairs - an <tt>&lt;opening tag&gt;</tt>, and a <tt>&lt;/closing tag&gt;</tt>, like saying <b>start</b> and <b>stop</b>. Notice the forward slash ( <b>/</b> ) in the closing tag!
* ❯
-> html1_list1

=== html1_list1 ===
- If you look at the <b>wet ingredients</b>, there's a set of <b>tags</b> the that lets us display lists. Now, let's apply those to the <b>dry ingredients</b>.
- First, surround the entire list of <b>dry ingredients</b> with <tt>&lt;ul&gt;</tt> and <tt>&lt;/ul&gt;</tt> - you can replace the <tt>&lt;p&gt;</tt> and <tt>&lt;/p&gt;</tt> tags that are already there.
- You won't see any huge change immediately, so let me know when you're ready to move on.
* ❯
-> html1_list2

=== html1_list2 ===
- Great! Now, we need to add <tt>&lt;li&gt;</tt> and <tt>&lt;/li&gt;</tt> around every single ingredient in <b>dry ingredients</b>. If you're stuck, look at how the <b>wet ingredients</b> were done - no spaces after or before the tags, and don't forget the period at the end!
-> dry_ingredients_minder -> html1_list3

=== html1_list3 ===
- Now that both of our sets of ingredients are looking good, let's move on to the instructions. I'm having a little trouble reading them, so let's fix that.
* ❯
-> html1_list4

=== html1_list4 ===
- First, we need to replace the <tt>&lt;p&gt;</tt> and <tt>&lt;/p&gt;</tt> tags around the instructions with <tt>&lt;ol&gt;</tt> and <tt>&lt;/ol&gt;</tt> - <tt>&lt;ol&gt;</tt> means that we're creating an <b>ordered list</b>, as opposed to the <b>unordered list</b> that <tt>&lt;ul&gt;</tt> creates.
- Like before, you won't see any huge change immediately, so let me know when you're ready to move on.
* ❯
-> html1_list5

=== html1_list5 ===
- Now, like the ingredients, we need to sandwich every instruction with <tt>&lt;li&gt;</tt> and <tt>&lt;/li&gt;</tt>.
-> instructions_minder -> html1_list6

=== html1_list6 ===
- Fantastic work! Now we've got a clear and well-built recipe.
* ❯
-> html1_list7

=== html1_list7 ===
- I still think we can improve this page, though.
- This is where a new type of code comes in - CSS. CSS can change all sorts of things, from where the text sits on the page, to the color of every part of the page, to the font... I'll show you a quick example!
* ❯
-> html2_css1

=== html2_css1 ===
- CSS lives in the <b>CSS tab</b>, just underneath the <b>HTML tab</b> on the far left of your screen. You can click to swtich between the two tabs.
- Let's change our page's background color. Look for <tt>body</tt> in the CSS tab. Between the two <b>braces</b> ( <b>\{ \}</b>), you'll see <tt>background-color: white;</tt>. This tells the browser "I want the background of the <b>body</b> tag to be white." Let's set that to something different -  change <tt>white</tt> to <tt>slateblue</tt>.
* [(wait for: css icontains "background-color: slateblue;")](Done)
-> html2_3
* [(wait for: css icontains "background-color:slateblue;")](Done)
-> html2_3

=== html2_3 ===
- Congratulations! You just wrote some CSS! Let's get a little fancier and style some text. On a new line below the <b>closing brace</b> (  <b>\}</b> ) of the <b>body</b> CSS, type <tt>li \{</tt>(press Enter)<tt>color: orange;</tt>(press Enter again)<tt>\}</tt>.
- You should end up with 3 lines of CSS that look similar to the <tt>body</tt> lines.
* [(wait for: css icontains "color: orange;")](Done)
-> html2_4
* [(wait for: css icontains "color:orange;")](Done)
-> html2_4

=== html2_4 ===
- Fantastic! Do you see what that did to all the entries in all the lists? What you typed was telling the browser "I want all the text that is inside the <b>li</b> tag to be colored orange."
+ [❯] ❯
-> html2_5

=== html2_5 ===
- Now, what if we had a very specific color in mind instead of just "orange"? You'd need a way to describe that exact color, like a painter might describe a new color she mixed...
* ❯
-> html2_5_2

=== html2_5_2 ===
-You see where I'm going with this, right? We totally have a way to do that! It's called <b>hex color</b>, and it lets you create colors by using groups of 6 letters and numbers - only 1 - 9, and A B C D E F, though. Here's an example hex color - <tt>\#76EECF</tt>
* ❯
-> html2_6

=== html2_6 ===
- To use this hex color, let's replace <b>orange</b> in the CSS with this color - <tt>\#76EECF</tt> (You need the \"\#\" in front of it to tell the browser \"the next 6 letters or numbers are a hex color\")
* [(wait for: css icontains "color: \#76EECF")](Done)
-> html2_7
* [(wait for: css icontains "color:\#76EECF")](Done)
-> html2_7

=== html2_7 ===
- Cool, huh? If you like, you can change the numbers around and see if you can create another color! It's a little out of our way right now to explain why Hex Colors work the way they do, but if you're interested we can take a quick detour!
* [👍] Tell me more!
-> html2_7hexchars
* [👎] Not right now, thanks.
-> html2_8

=== html2_7hexchars ===
- So, those 6 digits in <b>hex colors</b> describe colors in terms of a mix of red, green and blue, <b>RRGGBB</b>. So <b>\#1155DD</b> means a little red, some green, and LOT of blue.
- But why the letters? <b>Hex colors</b> count using 1-9 and A-F because they have to express numbers above 9, but can't use more than 6 digits in total. That means they need a way to express 10, 11, and other higher numbers using only a single digit. Tall order!
- So, hex colors use a number system called <b>hexadecimal</b>, where 10 = A, 11 = B, and so on, up until F. I could go into why we only go up to 16, but <b>THAT'S</b> even more off track!
- With this way of describing colors, you have 16,777,216 possible colors,so there's lots of room! If you'd like to use a color picker, check out <a href="https:\/\/htmlcolorcodes.com\/">the HTML color code list</a>.
* ❯
-> html2_8

=== html2_8 ===
- Ok, so you've got some color chops now. Now, think back to when we changed the color of all the <tt>li</tt> tags. It might be more useful if we could do that for only the instructions, so let's do that!
* ❯
-> html2_8_2

=== html2_8_2 ===
- First, want to duplicate our existing <tt>li</tt> CSS, so that the other <tt>li</tt> tags still have a color when we're done. Highlight all 3 lines of the <tt>li</tt> CSS (<tt>li \{</tt>, the color, and the final <tt>\}</tt>), copy all that text, and then paste it down below.
- Remember, if you're on a PC or Linux computer, you can use <b>Ctrl + C</b> to copy and <b>Ctrl + V</b> to paste. If you're on a Mac, use <b>⌘ + C</b> and <b>⌘ + V</b> instead.
* ❯
-> html2_9

=== html2_9 ===
- Now, let's modify that text you pasted. We need to make the CSS more specfic, so instead of all <tt>li</tt> tags it only affects <tt>li</tt> tags inside an <tt>ol</tt> tag. To do that, we say it like we'd ask someone to pick a specific object from a specfic group - "Hand me a potato from the pile of purple potatoes, not the red potatoes or brown potatoes."
- We'll do the same thing here. Change the first line of our new CSS to <tt>ol li \{</tt>, and change the <b>color</b> to <tt>violet</tt>, so we can see the change better.
-> css1_minder -> html2_10

=== html2_10 ===
- Do you see how that works? Only list items inside an ordered list will be violet - all the others will be orange. This brings up another important thing about CSS - the most specific rule is the one that 'wins'. No matter what color we make the <tt>li</tt> rule, the <tt>ol li</tt> rule won't be affected. If we had more tags inside our <tt>li</tt> tag, inside an <tt>ol</tt> tag, we could write an even more specific rule that would only affect those tags!
* ❯
-> html2_11

=== html2_11 ===
- Let's try styling another tag with CSS. Check out the HTML tab and look for some other tags that might be good. See any?
* [👍] Yeah, some good ones!
-> html2_12
* [👎] Not really...
-> html2_11_dontsee

=== html2_11_dontsee ===
- In the HTML tab, look for the text surrounded by <tt>&lt;h1&gt; &lt;/h1&gt;</tt>, <tt>&lt;h2&gt; &lt;/h2&gt;</tt> or <tt>&lt;h3&gt; &lt;/h3&gt;</tt>. That's what we'll be styling next!
* ❯
-> html2_12

=== html2_12 ===
- OK! Let's try those other tags. Switch back to the CSS tab and create some new lines below your existing CSS rules. In those blank lines,
type <tt>h1 \{</tt>(press Enter)<tt>color: coral;</tt>(press Enter again)<tt>\}</tt>.
* [(wait for: css icontains "color: coral;")](Done)
-> html2_13
* [(wait for: css icontains "color:coral;")](Done)
-> html2_13

=== html2_13 ===
- Great. You can change the color if you like, I just always like to use a really eye-catching color first to make sure I can see what I'm changing.
- You can create some more rules for other tags now, if you like. Try <b>h2</b> and <b>h3</b> if you like!
- When you're ready to move on, let me know.
* ❯
-> html2_14

=== html2_14 ===
- Now for the finishing touch - an image! Switch back to the HTML tab.
- Let's put the image right at the top, just after the title. Put your cursor right after <tt>&lt;/h1&gt;</tt> and press <b>Enter</b>, that should give us a new line.
- Once you've got the new line, we can link the image - type <tt>&lt;img src = "cookies.png"&gt;</tt>
* [(wait for: html contains "img src = \"cookies.png\"")](Done)
-> html2_15

=== html2_15 ===
- Great! The image looks a little big, though. Let's limit the width a little. Add <tt>width = 400</tt> just before the final caret (<b>&gt;</b>).
* [(wait for: html contains "img src = \"cookies.png\" width = 400")](Done)
-> html2_16
* [(wait for: html contains "img src = \"cookies.png\" width=400")](Done)
-> html2_16

=== html2_16 ===
- Fantastic. That number sets the width of your image in pixels, the tiny little dots that make up everything on your screen. You can change the number to make the image bigger or smaller than its original width - find a number that works for you.
* ❯
-> complete

=== complete ===
- Whew! That was a lot to take in, I'll bet, and we've only scratched the surface of what you can do with HTML and CSS. I hope I'll see you in the Desktop version of Hack, sometime in the future, and we can keep going and learn even more cool stuff! You deserve a reward.
{set_game_state("quest.Web/complete", true)}
{set_game_state("quests.achievements/web-complete", true)}
* [❯] ❯
# character: felix
- <i>prrrow^r, brbrbrbr mrrr*&$0w!</i>
- Good point, Felix! Hey {get_user_name()}, why don't you head off to the kitchen and bake yourself some of these cookies? I promise they're good!
-> END
