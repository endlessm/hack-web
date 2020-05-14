INCLUDE common.ink
# main character: faber

VAR loaded = false

-> begin

=== begin ===
# character: faber
- Wait a minute while the activity loads...
+ [(wait for: loaded)]<i>Activity loaded!</i>
  -> article_loaded

=== article_loaded ===
# character: faber
- Click the Hack button above to close this conversation, so you have more space to read.
# character: faber
- If you'd like to go back to the main page, click the Home button.
-> END
