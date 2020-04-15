# main character: faber

VAR loaded = false

-> begin

===function get_user_name===
    ~ return "DefaultUser"

=== begin ===
- Sometimes, it's easy to forget that we can change our world in meaningful ways. Let's find something for you change for the better.
Wait a minute while the activity loads...
+ [(wait for: loaded)]<i>Activity loaded!</i>
  -> article_loaded

=== article_loaded ===
- Click the Hack button above to close this conversation, so you have more space to read.
If you'd like to go back to the main page, click the Home button.
-> END
