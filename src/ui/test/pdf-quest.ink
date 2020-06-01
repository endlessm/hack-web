# main character: faber
INCLUDE common.ink

VAR loaded = false

-> begin

=== begin ===
- Wait a minute while the activity loads...
+ [(wait for: loaded)]<i>Activity loaded!</i>
  -> article_loaded

=== article_loaded ===
- Click the Hack button above to close this conversation, so you have more space to read.
- If you'd like to go back to the main page, click the Home button.
-> END
