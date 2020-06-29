=== hack_es ===
{ not skip:
  Ok, veamos de qué se trata este nivel... # character: ada
}
* [(wait for: currentLevel is 23)] {say_level_complete()}
  -> level23_es
* [(wait for: success is 0)] ¡Has fallado en el nivel {currentLevel}!
  -> reorder_es

= reorder_es
Creo que vamos a tener que reordenar las instrucciones, ¡hasta que estén correctas! # character: faber
-> end_level_check(23) -> level23_es

=== level23_es ===
Ey, Échale un vistazo a esa instrucción en el medio del conjunto. ¡Ese no es un buen símbolo!
* ❯
  -> level23_2_es
* [(wait for: success is 0)] ¡Has fallado en el nivel {currentLevel}!
  -> level23_fail_es
* [(wait for: flipped)] ¡Volteada!
  -> level23_fail_es

=== level23_2_es ===
Bueno, supongo que deberíamos probar el nivel de todas formas, al menos para ver qué sucede... # character: ada
* [(wait for: success is 0)] ¡Has fallado en el nivel {currentLevel}!
  -> level23_fail_es
* [(wait for: flipped)] ¡Volteada!
  -> level23_fail_es

=== level23_fail_es ===
Creo que en realidad tenemos dos problemas. Primero, la instrucción del medio parece un error. Segundo, incluso si colocas ese error en otro lugar, ¡todavía necesitamos un <b><i>jump()</i></b> (un salto) para cruzar esos hoyos! # character: estelle
{ flipped == true:
  -> level23_fail_2_es
}
* ❯
  -> level23_fail_2_es
* [(wait for: flipped)] ¡Volteada!
  -> level23_fail_2_es

=== level23_fail_2_es ===
¡Lo bueno es que conozco justo a la persona que puede ayudar! Saniel, ¿estás ahí? # character: estelle
{ flipped == true:
  -> level23_cont_3_es
}
* ❯
  -> level23_cont_3_es
* [(wait for: flipped)] ¡Volteada!
  -> level23_cont_3_es

=== level23_cont_3_es ===
¿Qué? Sí, sí. Estoy aquí. Estaba... <i>inemuri</i>, como dicen los japoneses. Algo así como durmiendo, pero a la vez presente. # character: saniel
{ flipped == true:
  -> level23_cont_4_es
}
* ❯
  -> level23_cont_4_es
* [(wait for: flipped)] ¡Volteada!
  -> level23_cont_4_es

=== level23_cont_4_es ===
Veamos qué tenemos aquí. Una línea de hoyos, una instrucción inválida... <b>Parece</b> que estamos atrapados, ¡Pero no lo creo! Riley, ¿hay alguna manera de que le echemos una mirada al código y depuremos esa instrucción? # character: saniel
{ flipped == true:
  -> level23_cont_5_es
}
* ❯
  -> level23_cont_5_es
* [(wait for: flipped)] ¡Volteada!
  -> level23_cont_5_es

=== level23_cont_5_es ===
~ attractFTH = 1
¡Ahí lo tienes, Dr. Rowe! Exactamente ese es el próximo paso. ¿Ves ese botón en el <b>lado izquierdo</b> de la pantalla, {get_user_name()}? ¡Ese es el botón <b>Voltear para hackear</b>! Puedes usarlo para ir detrás de escenas y hackear el juego con la <b>caja de herramientas</b>. ¡Vayamos!
{ flipped:
  -> level23_cont_8_es
}
* [(wait for: flipped)] ¡Volteada!
  -> level23_cont_8_es

=== level23_cont_8_es ===
~ attractFTH = 0
~ hasLockKey = 1
Hay una cerradura aquí. Pero no temas, {get_user_name()}, ¡aquí está la llave! Haz click sobre la cerradura para abrirla, y podrás ver las <b>instrucciones</b>. Son la versión en código de los iconos que has estado arrastrando en el lado anverso de Sidetrack.
* [(wait for: isLocked is 0)] ¡Destrabado!
  -> level23_cont_10_es
* [(wait for: currentLevel is 24)] {say_level_complete()}
  -> level24_es

=== level23_cont_10_es ===
Mira de cerca a las instrucciones. Cuando escribes código, tiene que ser <b>exactamente</b> como el ordenador lo espera... Así que, ¿ves algo extraño? Intenta corregir cualquier problema que veas. Siempre puedes deshacer cualquier error por accidente que cometas (<b>Ctrl + Z</b>). Y si todo se pone realmente mal, siempre puedes reiniciar el código haciendo click en el botón <b>Reiniciar</b> en la parte superior derecha.
* [👍] ¡Creo que veo el problema!
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
~ attractFTH = 1
Asombroso, ¡creo que lo has corregido! Ahora vuelve a <b>voltear</b> para ver el anverso de Sidetrack.
* [(wait for: flipped)] ¡Vuelta a voltear!
  -> level23_play_es

=== level23_play_es ===
~ attractFTH = 0
OK, ¡vamos a intentarlo! Presiona el botón <b><i>Play</i></b>.
* [(wait for: currentLevel is 24)] {say_level_complete()}
  -> level24_es

=== level24_es ===
~ attractFTH = 1
Ah, ¡mucho mejor! ¡Veo que tienes talento para hackear! Por eso, voy a darte una recompensa.
~ set_game_state("quests.achievements/sidetrack2-complete", true)
* ❯
- Guau, ¡parece que este nivel tiene dos errores! Hora de <b>voltear</b> la aplicación y volver a las <b>instrucciones</b>! # character: faber
* [(wait for: flipped)] ¡Volteada!
  -> level24_3_es
* [(wait for: currentLevel is 25)] {say_level_complete()}
  -> level25_es

=== level24_3_es ===
~ attractFTH = 0
- ¡Creo que puedo ver el problema aquí!
* [Consejo] (Consejo)
  -> level24_3_hints_es
* [(wait for: codeErrors is 0)] ¡Corregido!
  -> level24_flip_es
* [(wait for: currentLevel is 25)] {say_level_complete()}
  -> level25_es

=== level24_flip_es ===
~ attractFTH = 1
¡Increíble! Ya no hay más errores. Ahora volvamos a <b>voltear</b> al lado anverso de Sidetrack. # character: saniel
* [(wait for: flipped)] ¡Vuelta a voltear!
  -> level24_play_es

=== level24_play_es ===
~ attractFTH = 0
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
Buen trabajo, lo has corregido. Recuerda, ahora debemos volver a <b>voltear</b> y probar si puedes atravezar el laberinto. Si no puedes, tal vez necesites instrucciones diferentes. # character: saniel
* [(wait for: currentLevel is 26)] {say_level_complete()}
-> level26_es

=== level26_es ===
No estoy segura de que esos errores sean un problema. ¡Cada instrucción en este conjunto está mal! Estadísticamente, la probabilidad de que esto ocurra es muy baja. # character: ada
* ❯
  -> level26_2_es
* [(wait for: currentLevel is 27)] {say_level_complete()}
  -> level26_2_es

=== level26_2_es ===
¡Ya lo estás entendiendo! ¡Ve a las <b>instrucciones</b> de nuevo <b>volteando</b> Sidetrack!
* [(wait for: flipped)] ¡Volteada!
  -> level26_3_es
* [(wait for: currentLevel is 27)] {say_level_complete()}
  -> level27_es

=== level26_3_es ===
Una vez que corrijas los errores, es posible que aún necesites volver a ordenar las instrucciones para superar el nivel. # character: ada
* [(wait for: codeErrors is 0)] ¡Corregido!
  -> level26_fix_es
* [(wait for: currentLevel is 27)] {say_level_complete()}
  -> level27_es

=== level26_fix_es ===
¡Excelente! # character: faber
* [(wait for: currentLevel is 27)] {say_level_complete()}
  -> level27_es
* [(wait for: success is 0)] ¡Has fallado en el nivel {currentLevel}!
  -> level26_reorder_es

=== level26_reorder_es ===
Tendrás que reordenar las instrucciones hasta que estén en el orden correcto. # character: faber
* [(wait for: currentLevel is 27)] {say_level_complete()}
  -> level27_es
* [(wait for: success is 0)] ¡Has fallado en el nivel {currentLevel}!
  -> level26_reorder_es

=== level27_es ===
Parece que este nivel solo tiene dos instrucciones incorrectas. Es un poco mejor. # character: ada
* [(wait for: codeErrors is 0)] ¡Corregido!
  -> level27_fix_es
* [(wait for: currentLevel is 28)] {say_level_complete()}
  -> level28_es

=== level27_fix_es ===
Gran trabajo. ¡Ya lo tienes! # character: saniel
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
