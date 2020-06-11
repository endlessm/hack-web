# main character: faber
INCLUDE common.ink
INCLUDE pdf-quest.es.ink

VAR language = "en"
VAR loaded = false

{
- language == "es":
  -> begin_es
- else:
  -> begin
}

=== begin ===
- Wait a minute while the activity loads...
+ [(wait for: loaded)]<i>Activity loaded!</i>
  -> article_loaded

=== article_loaded ===
{set_game_state("quests.achievements/pdf-complete", true)}
- Click the Hack button above to close this conversation, so you have more space to read.
- If you'd like to go back to the main page, click the Home button.
-> END
