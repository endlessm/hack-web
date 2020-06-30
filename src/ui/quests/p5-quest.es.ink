=== begin_es ===
Ey {get_user_name()}, ¡tengo algo <b>super</b> interesante para tí! He estado aprendiendo un nuevo lenguaje de programación para hacer arte interactivo llamado <b>p5.js</b>. La parte "js" proviene de <b>JavaScript</b>. Probablemente hayas oído hablar del mismo antes. Es un lenguaje de programación utilizado para correr muchos sitios web.
+ [attracting: ❯] ❯
- En esta actividad, el código <b>p5.js</b> está en el lado izquierdo, y el resultado de ese código está en el centro. A medida que escribes, el código intentará ejecutarse constantemente y actualizará el área central.
- ¡Es <b>super</b> importante que escribas el código <b>exactamente</b> como te lo mostramos! ¡Los ordenadores pueden ser muy detallistas con cosas como los espacios! Si cometes algún error, siempre puedes deshacer (<b>Ctrl + Z</b>), o si se pone realmente malo, puedes reiniciar el código completamente con el botón <b>Reiniciar</b> que se encuentra en la esquina superior derecha.
+ ❯
- Comencemos con algo simple: ¿qué tal si cambiamos ese color de fondo? Busca la línea que dice <tt>background (20);</tt> y cámbiala para que se lea <tt>background ('green');</tt>.
- No olvides el punto y coma ( <b>;</b> ) al final de la línea, ¡y presta atención a los espacios!
TODO: Replace brute-force checks when we have a better check:
+ [(wait for: code contains "background('green');")]
+ [(wait for: code contains "background('Green');")]
+ [(wait for: code contains "background('GREEN');")]
-
(Hecho)
- -> p5_4_es

=== p5_4_es ===
¡Buen trabajo! <b>p5.js</b> comprende muchas palabras de colores en inglés. También podrías usar <tt>coral</tt>, <tt>lime</tt> o <tt>midnightblue</tt>, por ejemplo.
+ ❯
- Ahora, ¡vayamos un poco más allá y cambiemos algo del funcionamiento de la ola! Busca la línea que dice <tt>num = 20;</tt> y cambia  <b>20</b> por <b>5</b>. ¡No olvides escribir el código exactamente como lo ves!
+ [(wait for: code contains "num = 5;")] (Hecho)
- Oh, ¿A dónde fueron todas nuestras líneas? Intenta cambiar <tt>num</tt> a <b>15</b>.
+ [(wait for: code contains "num = 15;")] (Hecho)
- ¡Ese es un buen número! A continuación, cambiemos el espacio entre los arcos. Intenta cambiar <tt>step</tt> a 30.
+ [(wait for: code contains "step = 30;")] (Hecho)
- Hmm, ¡parece que vamos a necesitar una ventana más grande para contener esa ola! Podemos hacer que el <b><i>canvas</i></b> (lienzo en inglés, ese es el nombre del área en que el programa dibuja las cosas) sea más grande cambiando la línea que dice <tt>createCanvas(400, 400)</tt>. Esos dos números controlan el ancho y la altura del lienzo. Así que hagámoslo un poco más grande: aumenta el ancho a <b>600</b>.
+ [(wait for: code contains "createCanvas(600, 400);")] (Hecho)
- ¡Eso se ve mejor! Puedes seguir cambiando el tamaño, si lo deseas.
- Ahora, cambiemos el grosor de los arcos. Cambia <tt>strokeWeight</tt> de <b>5</b> a <b>10</b>.
+ [(wait for: code contains "strokeWeight(10);")] (Hecho)
- ¡Bien! Puedes volver a achicar el <tt>strokeWeight</tt>, o cambiarlo por el número que más te guste.
- Pasemos a divertirnos con los colores. Busca la línea que dice <tt>arcColor = 255</tt>.
- Esa <b>variable</b> controla el color de todas las líneas de la ola. ¡Cambiémosla por <b>100</b>, para ver qué pasa!
+ [(wait for: code contains "arcColor = 100;")] (Hecho)
- ¡Ahora tu ola es gris! Si desea que sea azul, verde, o de otro color, necesitamos una forma más compleja de expresar los colores. Es cierto que puedes usar palabras de color en inglés, como has hecho para el fondo, pero también puedes describir los colores en términos de la cantidad de rojo, verde y azul que tienen.
- Por ejemplo, hagamos que la ola sea roja. Cambia la línea que tiene <b>arcColor</b> a <tt>arcColor = color(255, 0, 0);</tt>. ¡No olvides verificar los espacios!
TODO: Replace brute-force checks when we have a better check:
+ [(wait for: code contains "arcColor = color(255, 0, 0);")]
+ [(wait for: code contains "arcColor = color(255,0, 0);")]
+ [(wait for: code contains "arcColor = color(255, 0,0);")]
+ [(wait for: code contains "arcColor = color(255,0,0);")]
-
(Hecho)
- -> p5_16_es

=== p5_16_es ===
¿Ves cómo los arcos son rojos? Cambia el color a <tt>(0, 255, 0);</tt> para darnos algunas olas verdes de la suerte.
TODO: Replace brute-force checks when we have a better check:
+ [(wait for: code contains "arcColor = color(0, 255, 0);")]
+ [(wait for: code contains "arcColor = color(0,255, 0);")]
+ [(wait for: code contains "arcColor = color(0, 255,0);")]
+ [(wait for: code contains "arcColor = color(0,255,0);")]
-
(Hecho)
- Ahora intentemos combinar los valores RGB: <tt>color(0, 255, 255);</tt>
TODO: Replace brute-force checks when we have a better check:
+ [(wait for: code contains "arcColor = color(0, 255, 255);")]
+ [(wait for: code contains "arcColor = color(0,255, 255);")]
+ [(wait for: code contains "arcColor = color(0, 255,255);")]
+ [(wait for: code contains "arcColor = color(0,255,255);")]
-
(Hecho)
- ¡Parece que el verde y el azul hacen un hermoso color verde azulado! Probemos con un color más complejo: me encanta el púrpura que obtienes con <tt>color(150, 0, 255)</tt>
TODO: Replace brute-force checks when we have a better check:
+ [(wait for: code contains "arcColor = color(150, 0, 255);")]
+ [(wait for: code contains "arcColor = color(150,0, 255);")]
+ [(wait for: code contains "arcColor = color(150, 0,255);")]
+ [(wait for: code contains "arcColor = color(150,0,255);")]
-
(Hecho)
- ¡Gran trabajo! Ahora <b>esas</b> sí que son unas hermosas olas.
- Estamos en una encrucijada: puedes quedarte aquí y seguir jugando con los colores y lo que hemos aprendido hasta ahora... o podemos avanzar hacia algo más complicado. ¿Cómo suena eso?
* [👍] ¡Sigamos!
  -> p5_21_es
* [👎] ¡Voy a quedarme aquí y continuar experimentando!
  ¡Que te diviertas! Recuerda, siempre puede reiniciar esta actividad si cambias de opinión.
  -> END

=== p5_21_es ===
De acuerdo, vayamos a algo más complejo. Haremos que los arcos cambien de color solo cuando hagas clic (o toque, si estás usando una tableta) en esa parte de la pantalla.
- Primero, envuelve los códigos <tt>doArcs(...</tt> existentes con <tt>if (mouseIsPressed) \{</tt>, y <tt>\}</tt>
- ¡Recuerda tener mucho cuidado con su espacio! Tu código debería verse así:
{snippet_p5_21()}
TODO: Replace brute-force checks when we have a better check:
+ [(wait for: code contains "if (mouseIsPressed) \{ doArcs(arcColor); \}")]
+ [(wait for: code contains "if(mouseIsPressed)\{ doArcs(arcColor); \}")]
+ [(wait for: code contains "if (mouseIsPressed) \{doArcs(arcColor);\}")]
+ [(wait for: code contains "if(mouseIsPressed)\{doArcs(arcColor);\}")]
+ [(wait for: code contains "if ( mouseIsPressed ) \{ doArcs(arcColor); \}")]
-
(Hecho)
- Bien, una cosa más: agrega una línea nueva después de la que acabas de escribir, y escribe <tt>else \{ doArcs(128); \}</tt>

- Si tienes problemas, verifica cuidadosamente que todo lo que hayas escrito esté en el lugar correcto, y con el espaciado correcto. Tu código debería verse así:
{snippet_p5_22()}
TODO: Replace brute-force checks when we have a better check:
+ [(wait for: code contains "else \{ doArcs(128); \}")]
+ [(wait for: code contains "else\{ doArcs(128); \}")]
+ [(wait for: code contains "else\{doArcs(128);\}")]
+ [(wait for: code contains "else \{doArcs(128);\}")]
-
(Hecho)
- Gran trabajo, ¡y también podemos aplicar la misma idea al color de fondo!
- En la línea con <tt>doArcs(...</tt>, agrega <tt>background(255);</tt> justo antes de <tt>doArcs(...</tt>
- Ahora tu código debería verse así:
{snippet_p5_23()}
TODO: Replace brute-force checks when we have a better check:
+ [(wait for: code contains "if (mouseIsPressed) \{ background(255); ")]
+ [(wait for: code contains "if(mouseIsPressed)\{ background(255); ")]
+ [(wait for: code contains "if(mouseIsPressed)\{background(255);")]
+ [(wait for: code contains "if (mouseIsPressed) \{background(255);")]
-
(Hecho)
- -> p5_24_es

=== p5_24_es ===
¿Ves lo que hemos hecho aquí? ¡Utilizamos una declaración <b>if</b> para cambiar el comportamiento de este programa dependiendo de lo que el usuario o la usuaria esté haciendo!
- Si haces clic o tocas el lienzo, <tt>mouseIsPressed</tt> es <b>verdadero</b>, por lo que la instrucción <i>if</i> salta a la primera sección del código y muestra los arcos con el color que has elegido.
- Si no haces clic ni tocas el lienzo, <tt>mouseIsPressed</tt> es <b>falso</b>, por lo que ejecuta el código dentro de la sección <b>else</b> y los arcos son del otro color.
- Puedes pensar en las declaraciones <b>if</b> como si fueran una oración: <i>Si esta prueba es verdadera, haz una cosa. Si no, haz otra cosa.</i>
+ ❯
- Finalmente, te presentaremos otro comando para usuarios avanzados: la función <b>map</b> (mapa en inglés). Las <b>funciones</b> toman algunos datos y generan otros datos. La función <b>map</b> toma un conjunto de números y los modifica para que se ajuste a otro rango de números. En este caso, vamos a utilizar <tt>map()</tt> para que la posición del ratón controle la velocidad de la ola.
+ ❯
- Primero, familiaricémonos con los números que cambiaremos. ¿Ves la última línea de nuestro código, <tt>theta + = 0.0523;</tt>? Ese número controla la velocidad de la ola.
- ¡El <b>0.0523</b> es un número super pequeño! Intentemos aumentarlo a <tt>0.1</tt>. ¡Recuerda darle un vistazo a esos espacios!
TODO: Replace brute-force checks when we have a better check:
+ [(wait for: code contains "theta += 0.1;")]
+ [(wait for: code contains "theta +=0.1;")]
+ [(wait for: code contains "theta+=0.1;")]
-
(Hecho)
- Guau, ¡qué rápido! ¿Qué sucede si lo hacemos mucho más pequeño que el original? ¿Digamos, <tt>0.001</tt>?
+ [(wait for: code contains "theta += 0.001;")] (Hecho)
- ¡Muy lento! Intenta encontrar un buen punto intermedio. O vuélvelo a <tt>0.0523</tt>.
+ ❯
-> p5_29_es

=== p5_29_es ===
Ahora, usemos la función de mapa para automatizar las cosas que hicimos en las últimas instrucciones. ¡Haremos que la posición vertical del cursor controle la velocidad de la ola!
- Cambia el número después de <tt>theta +=</tt> a <tt> map(mouseY, height, 0, 0.001, 0.1);</tt>. Como siempre, ten cuidado y asegúrate de que los espacios y los números que estás escribiendo sean correctos.
TODO: Replace brute-force checks when we have a better check:
+ [(wait for: code contains "theta += map(mouseY, height, 0, 0.001, 0.1);")]
+ [(wait for: code contains "theta += map(mouseY,height,0,0.001,0.1);")]
+ [(wait for: code contains "theta+=map(mouseY, height, 0, 0.001, 0.1);")]
+ [(wait for: code contains "theta+=map(mouseY,height,0,0.001,0.1);")]
-
(Hecho)

- ¡Echale un vistazo! A medida que mueves el cursor hacia arriba, la ola se acelera. A medida que lo mueves hacia abajo, ¡se ralentiza! Y por supuesto, aún puede hacer clic o tocar para cambiar los colores.
+ ❯
- Has navegado por todos esos ejercicios. Por eso, te daré una recompensa.
~ set_game_state("quest.P5/complete", true)
~ set_game_state("quests.achievements/p5-complete", true)
* ❯

- Hemos terminado por el momento, ¡pero hay mucho más por explorar en <b>p5.js</b>! Siéntete libre de cambiar cualquiera de las variables que has aprendido, y juega con el código todo lo que quieras. Si deseas continuar con más actividades como esta, ¡tengo un conjunto completo disponible en Hack para Endless OS!
-Puedes aprender a usar figuras complejas, números aleatorios, herramientas de programación como variables y bucles, e incluso "pintar" con sonido o crear tus propios juegos. ¡Me encantaría verte allí!
-> END

