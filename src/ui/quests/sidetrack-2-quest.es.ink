=== hack_es ===
{ not skip:
  Felicitaciones por esa medalla, {get_user_name()}. Ahora, veamos de qué se trata este nivel... # character: ada
}
* [(wait for: currentLevel is 23)] {say_level_complete()}
  -> level23_es

=== level23_es ===
Ey, Échale un vistazo a esa instrucción en el medio del conjunto. ¡Ese no es un buen símbolo!
Supongo que deberíamos probar el nivel de todas formas, al menos para ver qué sucede... # character: ada
* [(wait for: success is 0)] ¡Has fallado en el nivel {currentLevel}!
  -> level23_fail_es
* [(wait for: flipped)] ¡Volteada!
  -> level23_fail_es

=== level23_fail_es ===
Creo que en realidad tenemos dos problemas. Primero, la instrucción del medio parece un error. Segundo, incluso si colocas ese error en otro lugar, ¡todavía necesitamos un <b><i>jump()</i></b> (un salto) para cruzar esos hoyos! # character: estelle
{flipped: -> level23_fail_2_es}
* ❯
  -> level23_fail_2_es
* [(wait for: flipped)] ¡Volteada!
  -> level23_fail_2_es

=== level23_fail_2_es ===
¡Lo bueno es que conozco justo a la persona que puede ayudar! Saniel, ¿estás ahí? # character: estelle
{flipped: -> level23_cont_3_es}
* ❯
  -> level23_cont_3_es
* [(wait for: flipped)] ¡Volteada!
  -> level23_cont_3_es

=== level23_cont_3_es ===
¿Qué? Sí, sí. Estoy aquí. Estaba... <i>inemuri</i>, como dicen los japoneses. Algo así como durmiendo, pero a la vez presente. # character: saniel
{flipped: -> level23_cont_4_es}
* ❯
  -> level23_cont_4_es
* [(wait for: flipped)] ¡Volteada!
  -> level23_cont_4_es

=== level23_cont_4_es ===
Ejem. A ver ¿qué tenemos aquí? Una línea de hoyos, una instrucción inválida... <b>Parece</b> que estamos atrapados, ¡Pero no lo creo! Riley, ¿hay alguna manera de que le echemos una mirada al código y depuremos esa instrucción? # character: saniel
{flipped: -> level23_cont_5_es}
* ❯
  -> level23_cont_5_es
* [(wait for: flipped)] ¡Volteada!
  -> level23_cont_5_es

=== level23_cont_5_es ===
¡Exacto, Dr. Rowe! Ese es el próximo paso. ¡Corregir el código equivocado! ¿Ves ese botón en el <b>lado izquierdo</b> de la pantalla, {get_user_name()}? ¡Ese es el botón <b>Voltear para hackear</b>! Puedes usarlo para ir detrás de escenas y hackear el juego con la <b>caja de herramientas</b>. ¡Vayamos!
{flipped: -> level23_cont_8_es}
~ attractFTH = 1
* [(wait for: flipped)] ¡Volteada!
  ~ attractFTH = 0
  -> level23_cont_8_es

=== level23_cont_8_es ===
~ hasLockKey = 1
Hay una cerradura aquí. Pero no temas, {get_user_name()}, ¡aquí está la llave! Haz click sobre la cerradura para abrirla, y podrás ver las <b>instrucciones</b>. Son la versión en código de los iconos que has estado arrastrando en el lado anverso de Sidetrack.
* [(wait for: isLocked is 0)] ¡Destrabado!
  -> level23_cont_10_es
* [(wait for: currentLevel is 24)] {say_level_complete()}
  -> level24_es

=== level23_cont_10_es ===
Mira de cerca a las instrucciones. Si ves algo extraño, intenta corregirlo.
Siempre puedes deshacer cualquier error por accidente que cometas (<b>Ctrl + Z</b>). Y si todo se pone realmente mal, siempre puedes reiniciar el código haciendo click en el botón <b>Reiniciar</b> en la parte superior derecha. ¿Lo tienes?
* [👍] ¡Lo tengo!
  -> level23_cont_11_es
* [👎] Estoy un poco perdido/a.
  -> level23_cont_12_es
* [(wait for: codeErrors is 0)] ¡Corregido!
  -> level23_flip_es

=== level23_cont_12_es ===
Observa esa instrucción del medio, {get_user_name()}. Estoy bastante segura de que <b>jumpp</b> no es una palabra que exista en inglés. ¡Y estoy segura de que tampoco es una <b>instrucción</b> correcta! Arréglala, vuelve a <b>voltear</b> para ver el anverso de Sidetrack, ¡y luego presiona el botón <b><i>Play</i></b>! # character: ada
* [(wait for: currentLevel is 24)] {say_level_complete()}
  -> level24_es
* [(wait for: codeErrors is 0)] ¡Corregido!
  -> level23_flip_es

=== level23_cont_11_es ===
¡Asombroso! Corrige el problema, vuelve a <b>voltear</b> para ver el anverso de Sidetrack, ¡y luego presiona el botón <b><i>Play</i></b>! # character: ada
* [(wait for: codeErrors is 0)] ¡Corregido!
  -> level23_flip_es

=== level23_flip_es ===
{not flipped: -> level23_play_es}
Ahora vuelve a <b>voltear</b> para ver el anverso de Sidetrack.
~ attractFTH = 1
* [(wait for: flipped)] ¡Vuelta a voltear!
  ~ attractFTH = 0
  -> level23_play_es
* [(wait for: currentLevel is 24)] {say_level_complete()}
  ~ attractFTH = 0
  -> level24_es

=== level23_play_es ===
OK, presiona el botón <b><i>Play</i></b>.
* [(wait for: currentLevel is 24)] {say_level_complete()}
  -> level24_es

=== level24_es ===
He estado guardando esta medalla para ti, {get_user_name()} ¡Veo que tienes talento para hackear!
~ set_game_state("quests.achievements/sidetrack2-complete", true)
Sin embargo, todavía hay muchos desafíos por delante. Continuemos. ¡<b>Voltea</b> la aplicación para volver a las <b>instrucciones</b>!
~ attractFTH = 1
* [(wait for: flipped)] ¡Volteada!
  ~ attractFTH = 0
  -> level24_3_es
* [(wait for: currentLevel is 25)] {say_level_complete()}
  ~ attractFTH = 0
  ¿Que... qué? ¡Lo has resuelto, {get_user_name()}! # character: saniel
  -> level25_es

=== level24_3_es ===
¡Creo que puedo ver el problema aquí!
* [Consejo] (Consejo)
  -> level24_3_hints_es
* [(wait for: codeErrors is 0)] ¡Corregido!
  -> level24_flip_es
* [(wait for: currentLevel is 25)] {say_level_complete()}
  -> level25_es

=== level24_flip_es ===
{not flipped: -> level24_play_es}
~ attractFTH = 1
¡Bien! Has corregido los errores. Ahora volvamos a <b>voltear</b> al lado anverso de Sidetrack. # character: saniel
* [(wait for: flipped)] ¡Vuelta a voltear!
  ~ attractFTH = 0
  -> level24_play_es

=== level24_play_es ===
OK, vamos a intentarlo. ¡Presiona el botón <b><i>Play</i></b>! Si no lo logras, es posible que necesites instrucciones diferentes. O un orden distinto en las instrucciones. # character: estelle
* [(wait for: currentLevel is 25)] {say_level_complete()}
  -> level25_es

=== level24_3_hints_es ===
Busca <b>instrucciones</b> que puedan estar mal deletreadas en inglés, o que no tengan ningún sentido. Recuerda, si agregas un nuevo error por accidente, siempre puedes deshacer (<b>Ctrl + Z</b>) o reiniciar el código haciendo click en el botón <b>Reiniciar</b> en la esquina superior derecha. # character: estelle
* [Consejo] (Consejo)
  -> level24_3_hints_2_es
* [(wait for: currentLevel is 25)] {say_level_complete()}
  -> level25_es
* [(wait for: codeErrors is 0)] ¡Corregido!
  -> level24_flip_es

=== level24_3_hints_2_es ===
¿Ves donde dice <tt>riley.fooorward();</tt>? No creo que eso esté correcto... # character: estelle
* [Consejo] (Consejo)
  -> level24_3_hints_final_es
* [(wait for: currentLevel is 25)] {say_level_complete()}
  -> level25_es
* [(wait for: codeErrors is 0)] ¡Corregido!
  -> level24_flip_es

=== level24_3_hints_final_es ===
Oh, ey, creo que veo otro problema. Observa las mayúsculas en ese código. ¡Creo que debería ser <tt>riley.jump()</tt>, no <tt>riley.<b>J</b>ump()</tt>! # character: faber
* [(wait for: currentLevel is 25)] {say_level_complete()}
  -> level25_es
* [(wait for: codeErrors is 0)] ¡Corregido!
  -> level24_flip_es

=== level25_es ===
Riley, ¿has olvidado probar tu código? ¡Nos hemos chocado con unos cuantos errores! # character: estelle
* [(wait for: codeErrors is 0)] ¡Corregido!
  -> level25_fix_es
* [(wait for: currentLevel is 26)] {say_level_complete()}
  -> level26_es

=== level25_fix_es ===
Bien hecho, has corregido los errores. Ahora, vuelve a <b>voltear</b> y prueba si puedes superar el nivel. Si no puedes, tal vez necesites reordenar o cambiar las instrucciones. # character: saniel
* [(wait for: currentLevel is 26)] {say_level_complete()}
-> level26_es

=== level26_es ===
No creo que esos errores sean un problema. Cada instrucción en este conjunto está mal. Y estadísticamente, la probabilidad de que esto ocurra es muy baja. # character: ada
* ❯
* [(wait for: flipped)] ¡Volteada!
* [(wait for: currentLevel is 27)] {say_level_complete()}
- -> level26_2_es

=== level26_2_es ===
Sí, casi como si fuera... intencional :D
<b><i>m*:3:3&rr0w!</i></b> # character: felix
Tú lo has dicho, Felix! Ey {get_user_name()}, ya conoces el camino. ¡<b>Voltea</b> para hackear!
* [(wait for: codeErrors is 0)] ¡Corregido!
  -> level26_fix_es
* [(wait for: currentLevel is 27)] {say_level_complete()}
  -> level27_es

=== level26_fix_es ===
Que hayas corregido los errores no significa que las instrucciones estén en el orden correcto. Probablemente tengas que volver a ordenarlas... # character: faber
* [(wait for: currentLevel is 27)] {say_level_complete()}
  -> level27_es

=== level27_es ===
Parece que este nivel solo tiene dos instrucciones incorrectas. Es un poco mejor. # character: ada
* [(wait for: currentLevel is 28)] {say_level_complete()}
  -> level28_es

=== level28_es ===
- Uh... esa es una gran pared. ¿Podemos saltar una pared? ¿Funcionará? # character: faber
* ❯
- Puedes experimentar con eso si lo deseas, Faber. Pero a juzgar por los niveles anteriores... probablemente no. Creo que necesitaremos una nueva herramienta para resolver este acertijo. # character: saniel
* ❯
- Oh, bueno. ¿Tenemos esa herramienta? # character: faber
* ❯
- ¡No todavía, Faber! No he terminado de implementar del todo esta versión web de Sidetrack, todavía. Si quieres resolver este acertijo ahora mismo, ¡tendrás que ir a Endless OS y jugar Sidetrack ahí!
* ❯
- Ejem. Creo que hablo por todos nosotros, aquí, cuando digo que lo hemos pasado muy bien contigo, {get_user_name()}. ¡Espero verte pronto en Endless OS! # character: saniel
~ set_game_state("quest.Sidetrack2/complete", true)
-> END
