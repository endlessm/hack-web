INCLUDE sidetrack-1-quest.es.ink
INCLUDE sidetrack-2-quest.es.ink

=== begin_es ===
-> level1_es

=== level1_es ===
Ey, {get_user_name()}, ¡te doy la bienvenida a Sidetrack! ¿Ves la <b>salida</b> en el otro extremo de la pantalla? ¡Ese es nuestro objetivo! Usa las <b>instrucciones</b> ADELANTE, ARRIBA, y ABAJO para moverte a través de los obstáculos. ¡Pero ten cuidado con las <b>paredes</b>!
-> end_level_check(2) -> the_choice_es

=== the_choice_es ===
// Disable the level selector in Sidetrack:
~ levelSelectorsEnabled = 0
Oh, hay muchos más niveles aquí. ¡Este es sólo el principio!
Aquí tienes una opción: ¿Quieres continuar jugando normalmente, o saltar directo a hackear el juego?
* [¡Seguir jugando!] Voy a seguir jugando. Quiero completar todos los niveles.
  ~ availableLevels = 28
  -> play_es
* [¡Vamos a hackear!] ¡No puedo esperar a ver lo que hay ahí dentro!
  ~ availableLevels = 28
  ~ startLevel = 22
  -> transition_es

= transition_es
Bien, te haré un resumen rápido de lo que haremos: Tienes que arrastrar y soltar las tejas que tienen flechas dentro, de modo que yo las pueda seguir, ¡y así llegar a la salida sin peligro!
Si hay un hoyo, necesitaré saltar sobre el mismo. Y si hay una pared, tendré que esquivarla.
Una vez que tengas las instrucciones ordenadas, presiona el botón <i>Play</i> para empezar. ¡Y no intentes reordenar las instrucciones hasta que yo pierda o gane!
Si pierdo, tendrás que intercambiar las instrucciones hasta que estén bien ordenadas.
~ skip = 1
-> hack_es
