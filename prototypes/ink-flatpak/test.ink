-> start

=== start ===

// comment

Ada: Hello! I have a tutorial for you. Ready to start?
*       [Yes!]
-       Ada: OK! Let's do it. Do you want the full version?
*	[Short]I'm busy, give me the short version
        -> short
*	Full version[!], my friend!
	Ada: Nice to hear that!
-       Saniel: Annd back,
<>      with some glue.
-> question

=== short ===
Hello,
-> glue

=== glue ===
<> this is glue!
-> question

=== question ===
Ada: This is a question.
-> completed

=== completed ===
Ada (hurray): Well done!
Ada: Bye!
-> END
