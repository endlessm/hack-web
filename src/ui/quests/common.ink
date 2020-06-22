=== function get_user_name ===
    ~ return "Hacker"

EXTERNAL get_game_state(key)
EXTERNAL set_game_state(key, value)

// Fallbacks for external functions:

=== function get_game_state(key) ===
~ return 0

=== function set_game_state(key, value) ===
~ return
