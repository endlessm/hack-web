=== baditems_minder_es
    * (gadolinium) [(wait for: html not contains "<li>77.683 gramos de Gadolinium.</li>")] #
        Ni idea de qué hace aquí un isótopo radioactivo...
        -> baditems_minder_es
    * (fish) [(wait for: html not contains "63 kilogramos de Pescado Sueco.")] #
        Un poco de Pescado Sueco está bien, ¿pero 63 Kilos? ¡Puaj!
        -> baditems_minder_es
    * (bore) [(wait for: html not contains "Engrana los polos electromagnéticos imaginando ruibarbo.")] #
        ¿... polos electromagnéticos ... ruibarbo? Tendré que buscar eso más tarde...
        -> baditems_minder_es
    * {gadolinium + fish + bore > 2}
        # character: riley
        ¡Buen trabajo! ¡Todo arreglado!
        ->->
    * [Pista] ¿Me puedes dar una pista?
        -> baditems_hint_es

=== baditems_hint_es
    # character: riley
    Mira esos ingredientes extraños: Gadolinium, Pescado Sueco, ¿y qué demonios es un polo electromagnético? ¡Eso definitivamente no son partes de la receta de galletas!
    -> baditems_minder_es


=== dry_ingredients_minder_es
    * (flour) {not flour_alt} {not flour_alt2} {not flour_alt3} [(wait for: html icontains "<li>1 3/4 de taza de harina.</li>")] #
        Harina, ¡listo!
        -> dry_ingredients_minder_es
    * (flour_alt) {not flour} {not flour_alt2} {not flour_alt3} [(wait for: html icontains "<li> 1 3/4 de taza de harina. </li>")] #
        Harina, ¡listo!
        -> dry_ingredients_minder_es
    * (flour_alt2) {not flour} {not flour_alt} {not flour_alt3} [(wait for: html icontains "<li> 1 3/4 de taza de harina.</li>")] #
        Harina, ¡listo!
        -> dry_ingredients_minder_es
    * (flour_alt3) {not flour} {not flour_alt} {not flour_alt2} [(wait for: html icontains "<li>1 3/4 de taza de harina. </li>")] #
        Harina, ¡listo!
        -> dry_ingredients_minder_es

    * (salt) {not salt_alt} {not salt_alt2} {not salt_alt3} [(wait for: html icontains "<li>2 cucharillas de sal.</li>")] #
        ¡La sal tiene buena pinta!
        -> dry_ingredients_minder_es
    * (salt_alt) {not salt} {not salt_alt2} {not salt_alt3} [(wait for: html icontains "<li> 2 cucharillas de sal. </li>")] #
        ¡La sal tiene buena pinta!
        -> dry_ingredients_minder_es
    * (salt_alt2) {not salt} {not salt_alt} {not salt_alt3} [(wait for: html icontains "<li> 2 cucharillas de sal.</li>")] #
        ¡La sal tiene buena pinta!
        -> dry_ingredients_minder_es
    * (salt_alt3) {not salt} {not salt_alt} {not salt_alt2} [(wait for: html icontains "<li>2 cucharillas de sal. </li>")] #
        ¡La sal tiene buena pinta!
        -> dry_ingredients_minder_es

    * (bksoda) {not bksoda_alt} {not bksoda_alt2} {not bksoda_alt3} [(wait for: html icontains "<li>1 cucharilla de bicarbonato.</li>")] #
        Bicarbonato: ¡Hecho!
        -> dry_ingredients_minder_es
    * (bksoda_alt) {not bksoda} {not bksoda_alt2} {not bksoda_alt3} [(wait for: html icontains " <li> 1 cucharilla de bicarbonato. </li>")] #
        Bicarbonato: ¡Hecho!
        -> dry_ingredients_minder_es
    * (bksoda_alt2) {not bksoda} {not bksoda_alt} {not bksoda_alt3} [(wait for: html icontains " <li> 1 cucharilla de bicarbonato.</li>")] #
        Bicarbonato: ¡Hecho!
        -> dry_ingredients_minder_es
    * (bksoda_alt3) {not bksoda} {not bksoda_alt} {not bksoda_alt2} [(wait for: html icontains "<li>1 cucharilla de bicarbonato. </li>")] #
        Bicarbonato: ¡Hecho!
        -> dry_ingredients_minder_es

    * (choc) {not choc_alt} {not choc_alt2} {not choc_alt3} [(wait for: html icontains "<li>Sobre 2/3 de taza de chocolate, cortado en trozos del tamaño de una uña.</li>")] #
        ¡El chocolate está listo!
        -> dry_ingredients_minder_es
    * (choc_alt) {not choc} {not choc_alt2} {not choc_alt3} [(wait for: html icontains "<li> Sobre 2/3 de taza de chocolate, cortado en trozos del tamaño de una uña. </li>")] #
        ¡El chocolate está listo!
        -> dry_ingredients_minder_es
    * (choc_alt2) {not choc} {not choc_alt} {not choc_alt3} [(wait for: html icontains "<li> Sobre 2/3 de taza de chocolate, cortado en trozos del tamaño de una uña.</li>")] #
        ¡El chocolate está listo!
        -> dry_ingredients_minder_es
    * (choc_alt3) {not choc} {not choc_alt} {not choc_alt2} [(wait for: html icontains "<li>Sobre 2/3 de taza de chocolate, cortado en trozos del tamaño de una uña. </li>")] #
        ¡El chocolate está listo!
        -> dry_ingredients_minder_es


    * {flour + salt + bksoda + choc + flour_alt + salt_alt + bksoda_alt + choc_alt + flour_alt2 + salt_alt2 + bksoda_alt2 + choc_alt2 + flour_alt3 + salt_alt3 + bksoda_alt3 + choc_alt3 > 3}
        # character: riley
        ¡Buen trabajo! ¡Tenemos todo en la lista!
        ->->


=== instructions_minder_es
    * (mix) {not mix_alt} {not mix_alt2} {not mix_alt3} [(wait for: html icontains "<li>Mezcla los ingredientes secos juntos en un bol, luego mezcla los ingredientes húmedos en un bol diferente.</li>")] #
        ¡Mézclalo!
        -> instructions_minder_es
    * (mix_alt) {not mix} {not mix_alt2} {not mix_alt3} [(wait for: html icontains "<li> Mezcla los ingredientes secos juntos en un bol, luego mezcla los ingredientes húmedos en un bol diferente. </li>")] #
        ¡Mézclalo!
        -> instructions_minder_es
    * (mix_alt2) {not mix} {not mix_alt} {not mix_alt3} [(wait for: html icontains "<li> Mezcla los ingredientes secos juntos en un bol, luego mezcla los ingredientes húmedos en un bol diferente.</li>")] #
        ¡Mézclalo!
        -> instructions_minder_es
    * (mix_alt3) {not mix} {not mix_alt} {not mix_alt2} [(wait for: html icontains "<li>Mezcla los ingredientes secos juntos en un bol, luego mezcla los ingredientes húmedos en un bol diferente. </li>")] #
        ¡Mézclalo!
        -> instructions_minder_es

    * (pour) {not pour_alt} {not pour_alt2} {not pour_alt3} [(wait for: html icontains "<li>Vierte los dos bols juntos y mezcla todo hasta que tenga una apariencia suave.</li>")] #
        Combina...
        -> instructions_minder_es
    * (pour_alt) {not pour} {not pour_alt2} {not pour_alt3} [(wait for: html icontains "<li> Vierte los dos bols juntos y mezcla todo hasta que tenga una apariencia suave. </li>")] #
        Combina...
        -> instructions_minder_es
    * (pour_alt2) {not pour} {not pour_alt} {not pour_alt3} [(wait for: html icontains "<li> Vierte los dos bols juntos y mezcla todo hasta que tenga una apariencia suave.</li>")] #
        Combina...
        -> instructions_minder_es
    * (pour_alt3) {not pour} {not pour_alt} {not pour_alt2} [(wait for: html icontains "<li>Vierte los dos bols juntos y mezcla todo hasta que tenga una apariencia suave. </li>")] #
        Combina...
        -> instructions_minder_es

    * (tray) {not tray_alt} {not tray_alt2} {not tray_alt3} [(wait for: html icontains "<li>Haz bolas de masa de la mitad de un huevo de tamaño, y deja 8 o 10 centímetros entre ellas en tu bandeja. (¡Tienes que tener suficiente para al menos 3 bandejas de horneado!)</li>")] #
        Pongamos esto en una bandeja, excelente.
        -> instructions_minder_es
    * (tray_alt) {not tray} {not tray_alt2} {not tray_alt3} [(wait for: html icontains "<li> Haz bolas de masa de la mitad de un huevo de tamaño, y deja 8 o 10 centímetros entre ellas en tu bandeja. (¡Tienes que tener suficiente para al menos 3 bandejas de horneado!) </li>")] #
        Pongamos esto en una bandeja, excelente.
        -> instructions_minder_es
    * (tray_alt2) {not tray} {not tray_alt} {not tray_alt3} [(wait for: html icontains "<li> Haz bolas de masa de la mitad de un huevo de tamaño, y deja 8 o 10 centímetros entre ellas en tu bandeja. (¡Tienes que tener suficiente para al menos 3 bandejas de horneado!)</li>")] #
        Pongamos esto en una bandeja, excelente.
        -> instructions_minder_es
    * (tray_alt3) {not tray} {not tray_alt} {not tray_alt2} [(wait for: html icontains "<li>Haz bolas de masa de la mitad de un huevo de tamaño, y deja 8 o 10 centímetros entre ellas en tu bandeja. (¡Tienes que tener suficiente para al menos 3 bandejas de horneado!) </li>")] #
        Pongamos esto en una bandeja, excelente.
        -> instructions_minder_es

    * (bake) {not bake_alt} {not bake_alt2} {not bake_alt3} [(wait for: html icontains "<li>Pon el horno a 180 grados celcius (sobre 350 grados Fahrenheit) y hornea durante 15 minutos.</li>")] #
        ¡Hornea!
        -> instructions_minder_es
    * (bake_alt) {not bake} {not bake_alt2} {not bake_alt3} [(wait for: html icontains "<li> Pon el horno a 180 grados celcius (sobre 350 grados Fahrenheit) y hornea durante 15 minutos. </li>")] #
        ¡Hornea!
        -> instructions_minder_es
    * (bake_alt2) {not bake} {not bake_alt} {not bake_alt3} [(wait for: html icontains "<li> Pon el horno a 180 grados celcius (sobre 350 grados Fahrenheit) y hornea durante 15 minutos.</li>")] #
        ¡Hornea!
        -> instructions_minder_es
    * (bake_alt3) {not bake} {not bake_alt} {not bake_alt2} [(wait for: html icontains "<li>Pon el horno a 180 grados celcius (sobre 350 grados Fahrenheit) y hornea durante 15 minutos. </li>")] #
        ¡Hornea!
        -> instructions_minder_es

    * (eat) {not eat_alt} {not eat_alt2} {not eat_alt3} [(wait for: html icontains "<li>¡Cómete tus deliciosas, asombrosas, cookies caseras! (Pero no todas de una sola vez.)</li>")] #
        Dulces, ¡dulces recompensas!
        -> instructions_minder_es
    * (eat_alt) {not eat} {not eat_alt2} {not eat_alt3} [(wait for: html icontains "<li> ¡Cómete tus deliciosas, asombrosas, cookies caseras! (Pero no todas de una sola vez.) </li>")] #
        Dulces, ¡dulces recompensas!
        -> instructions_minder_es
    * (eat_alt2) {not eat} {not eat_alt} {not eat_alt3} [(wait for: html icontains "<li> ¡Cómete tus deliciosas, asombrosas, cookies caseras! (Pero no todas de una sola vez.)</li>")] #
        Dulces, ¡dulces recompensas!
        -> instructions_minder_es
    * (eat_alt3) {not eat} {not eat_alt} {not eat_alt2} [(wait for: html icontains "<li>¡Cómete tus deliciosas, asombrosas, cookies caseras! (Pero no todas de una sola vez.) </li>")] #
        Dulces, ¡dulces recompensas!
        -> instructions_minder_es

    * {mix + pour + tray + bake + eat + mix_alt + pour_alt + tray_alt + bake_alt + eat_alt + mix_alt2 + pour_alt2 + tray_alt2 + bake_alt2 + eat_alt2 + mix_alt3 + pour_alt3 + tray_alt3 + bake_alt3 + eat_alt3 > 4}
        # character: riley
        ¡Instrucciones listas!
        ->->


=== css1_minder_es
    * (cssol) [(wait for: css icontains "ol li \{")] #
        ¡Ahora es más específico!
        -> css1_minder_es
    * (csscolor) {not csscolor_alt} [(wait for: css icontains "color: violet;")] #
        El color está bien.
        -> css1_minder_es
    * (csscolor_alt) {not csscolor} [(wait for: css icontains "color:violet;")] #
        El color está bien.
        -> css1_minder_es
    * {cssol + csscolor + csscolor_alt > 1}
        # character: riley
        Buen trabajo, CSS completado.
        ->->


=== begin_es ===
-> html1_1_es

=== html1_1_es ===
- ¡Hola, {get_user_name()}! Sé que has usado internet antes. Pero ¿te has preguntado qué implica mostrar una página web? He decidido averiguarlo, ¡y ahora voy a compartido contigo!
* [attracting: ❯] ❯
-> html1_2_es

=== html1_2_es ===
- Como me encanta cocinar, le he pedido a mi amigo Felix que escriba una de mis recetas favoritas como una página web, ¡y la he puesto en nuestra zona de pruebas web! La mitad izquierda muestra el código HTML, y la mitad derecha muestra el resultado, como si fuera una página real de internet.
- La parte izquierda funciona como un editor de texto:
Puedes copiar y pegar (<b>Ctrl + C</b> y <b>Ctrl + V</b> en PC o Linux, <b>⌘ + C</b> y <b>⌘ + V</b> en Mac)
Puedes deshacer (<b>Ctrl + Z</b> en PC y Linux, <b>⌘ + Z</b> en Mac)
Si te encuentras perdido, siempre puedes reiniciar todo el texto con el botón <b>Reiniciar código</b> en la esquina superior derecha de la zona de código.
* ❯
-> html1_3_es

=== html1_3_es ===
- Ups, parece que Felix se equivocó cuando estaba configurando la página... ¡Este no es un buen título para una receta de galletas!
- Vamos a arreglarlo. Encuentra esas palabras sin sentido en el <b>HTML</b> de esta página, y cámbialo a <b>Galletas Super-Fantásticas</b>
-
* [(wait for: html icontains "<h1>Galletas Super-Fantásticas</h1>")] (Hecho)
-> html1_4_es
* [(wait for: html icontains "<h1> Galletas Super-Fantásticas </h1>")] (Hecho)
-> html1_4_es
* [(wait for: html icontains "<h1>Galletas Super-Fantásticas </h1>")] (Hecho)
-> html1_4_es
* [(wait for: html icontains "<h1> Galletas Super-Fantásticas</h1>")] (Hecho)
-> html1_4_es

=== html1_4_es ===
- Buen trabajo, ¡acabas de editar una página web! Ahora, vamos a hacer esta receta un poco--- espera. ¿Ves lo que yo veo en la lista de ingredientes e instrucciones?
* [👍] Sí, creo que sí
-> html1_fix_es
* [👎] En realidad no...
-> html1_dontsee_es

=== html1_dontsee_es ===
- Fíjate en alguno de esos ingredientes... ¿Pescado Sueco? ¿Gadolinium? Se supone que esto es una receta de Galletas de Chocolate, creo que Felix está bromeando conmigo otra vez.
* ❯
-> html1_fix_es

=== html1_fix_es ===
- Tenemos que arreglar el texto antes de ir más lejos. Encuentra los ingredientes e instrucciones que no tengan sentido, ¡y elimínalos!
- Ve a la zona <b>HTML</b> y elimina todo el texto de esos ingredientes e instrucciones extraños. Si ves texto con <tt>&lt;</tt> y <tt>&gt;</tt> en la misma línea, puedes eliminar eso también. ¡Elimina la linea completa!
-> baditems_minder_es -> html1_5_es

=== html1_5_es ===
- Ahora que hemos limpiado todos esos ingredientes e instrucciones que no tenían sentido, podemos mirar el <b>formato</b> de la receta. La forma en que se muestra en la página.
- Los <b>Ingredientes húmedos</b> están bien, están <b>formateados</b> en una lista clara, pero los <b>Ingredientes secos</b> necesitan algo de ayuda.
* ❯
-> html1_6_es

=== html1_6_es ===
- Para aprender cómo <b>formatear</b>, necesitamos aprender acerca de las <b>etiquetas</b>. En HTML, todo texto con <tt>&lt;</tt> y <tt>&gt;</tt> alrededor se llama <b>etiqueta</b>. Las Etiquetas le dicen al navegador cómo mostrar el texto, las imágenes y cualquier cosa que queras en la página.
* ❯
-> html1_7_es

=== html1_7_es ===
- Las etiquetas vienen en parejas. Una <tt>&lt;etiqueta de apertura&gt;</tt>, y una <tt>&lt;/etiqueta de cierre&gt;</tt>, como decir <b>comienzo</b> y <b>fin</b>. ¡Fíjate en la barra (<b>/</b>) en la etiqueta de cierre!
* ❯
-> html1_list1_es

=== html1_list1_es ===
- Si miras la lista de <b>Ingredientes húmedos</b>, verás un conjunto de <b>etiquetas</b> que te permiten mostrar una lista. Ahora, vamos a aplicar eso a la lista de <b>Ingredientes secos</b>.
- Primero, rodea la lista completa de <b>Ingredientes secos</b> con <tt>&lt;ul&gt;</tt> y <tt>&lt;/ul&gt;</tt>. Puedes reemplazar las etiquetas <tt>&lt;p&gt;</tt> y <tt>&lt;/p&gt;</tt> que están ahí.
- No verás ningún cambio por ahora, así que avísame cuando podamos seguir.
* ❯
-> html1_list2_es

=== html1_list2_es ===
- ¡Genial! Ahora, necesitamos añadir <tt>&lt;li&gt;</tt> y <tt>&lt;/li&gt;</tt> alrededor de cada ingrediente en <b>Ingredientes secos</b>. Si no sabes cómo continuar, mira cómo está hecho en la lista de <b>ingredientes húmedos</b>, sin espacios antes o después de las etiquetas, ¡y no olvides el punto al final!
-> dry_ingredients_minder_es -> html1_list3_es

=== html1_list3_es ===
- Ahora que las dos listas de ingredientes están bien, vamos a trabajar en las instrucciones. Estoy teniendo problemas para leerlas, así que vamos a arreglar eso.
* ❯
-> html1_list4_es

=== html1_list4_es ===
- Primero, necesitamos reemplazar las etiquetas <tt>&lt;p&gt;</tt> y <tt>&lt;/p&gt;</tt> alrededor de las instrucciones con <tt>&lt;ol&gt;</tt> y <tt>&lt;/ol&gt;</tt>.
- <tt>&lt;ol&gt;</tt> significa que estamos creando una <b>ordered list (lista ordenada)</b>, una lista numerada, a diferencia de la <b>unordered list (lista sin orden)</b> que se crea con <tt>&lt;ul&gt;</tt>.
- Como antes, no verás ningún cambio inmediatamente, así que avísame cuando quieras continuar.
* ❯
-> html1_list5_es

=== html1_list5_es ===
- Ahora, como en los ingredientes, necesitamos rodear cada instrucción con <tt>&lt;li&gt;</tt> y <tt>&lt;/li&gt;</tt>.
-> instructions_minder_es -> html1_list6_es

=== html1_list6_es ===
- ¡Ahora tenemos una receta clara y bien construida!
* ❯
-> html1_list7_es

=== html1_list7_es ===
- Todavía creo que podemos mejorar esta página.
- Aquí es donde aparece un nuevo tipo de código <b>CSS</b>. <b>CSS</b> puede cambiar todo tipo de cosas, desde donde está el texto en la página, al color de cada parte de la página, al tipo de letra... ¡Déjame mostrarte un ejemplo rápido!
* ❯
-> html2_css1_es

=== html2_css1_es ===
- <b>CSS</b> está en la <b>pestaña CSS</b>, justo debajo de la <b>pestaña HTML</b>, en la esquina superior izquierda de tu pantalla. Puedes pulsar para cambiar entre las dos pestañas.
- Cambiemos el color de fondo de nuestra página. Busca <tt>body</tt> en la <b>pestaña CSS</b>. Entre las dos <b>llaves</b> (<b>\{ \}</b>), puedes ver <tt>background-color: lightgrey;</tt>. Esto le dice al navegador "Quiero que el fondo de la etiqueta <b>body</b> sea gris claro (light grey)." Vamos a cambiar eso a algo diferente, cambia <tt>lightgrey</tt> a <tt>darkslateblue</tt>.
- El código css usa palabras clave en inglés, así que si conoces algún color en inglés puedes probar, red, blue...
* [(wait for: css icontains "background-color: darkslateblue;")](Hecho)
-> html2_3_es
* [(wait for: css icontains "background-color:darkslateblue;")](Hecho)
-> html2_3_es

=== html2_3_es ===
- ¡Felicidades! ¡Acabas de escribir <b>CSS</b>! Vamos a aplicar algunos estilos al texto. En una línea nueva debajo de la <b>llave de cierre</b> (<b>\}</b>) del <b>body CSS</b>, escribe <tt>li \{</tt>(pulsa Enter)<tt>color: orange;</tt>(pulsa Enter otra vez)<tt>\}</tt>.
- Debes terminar con 3 líneas de <b>CSS</b> que será similar a las líneas de <tt>body</tt>.
* [(wait for: css icontains "color: orange;")](Hecho)
-> html2_4_es
* [(wait for: css icontains "color:orange;")](Hecho)
-> html2_4_es

=== html2_4_es ===
- ¡Fantástico! ¿Has visto qué ha hecho eso a todas las líneas de todas las listas? Lo que has escrito le dice al navegador "Quiero que todo el texto que hay dentro de la etiqueta <b>li</b> se coloree de naranja (orange)."
+ ❯
-> html2_5_es

=== html2_5_es ===
- Ahora, ¿qué tal si queremos un color más específico, en lugar de sólo "naranja (orange)"? Necesitarás una manera de describir exactamente el color, como dos pinturas podrían describir un nuevo color al mezclar...
* ❯
-> html2_5_2_es

=== html2_5_2_es ===
- ¿Ves a dónde quiero llegar con esto? ¡Tenemos una forma de hacer eso! Se llama <b>color hexadecimal</b>, y te permite crear colores usando un grupo de 6 letras y números, sólo 1 - 9, y A B C D E F. Aquí tienes un ejemplo de color hexadecimal, <tt>\#76EECF</tt>
* ❯
-> html2_6_es

=== html2_6_es ===
- Para usar este color hexadecimal, vamos a reemplazar <b>orange</b> en el CSS con este color, <tt>\#76EECF</tt> (Necesitas la \"\#\" delate para indicar al navegador \"las siguientes 6 letras o número son un color hexadecimal\")
* [(wait for: css icontains "color: \#76EECF")](Hecho)
-> html2_7_es
* [(wait for: css icontains "color:\#76EECF")](Hecho)
-> html2_7_es

=== html2_7_es ===
- ¿Genial eh? Si quieres, puedes cambiar los números ¡y ver si puedes crear un color diferente! Está un poco fuera de nuestro camino explicar ahora mismo por qué y cómo los Colores Hexadecimales funcionan, pero si te interesa, ¡podemos tomar un desvío!
* [👍] ¡Cuéntame más!
-> html2_7hexchars_es
* [👎] No ahora mismo, gracias.
-> html2_8_es

=== html2_7hexchars_es ===
- Esos 6 dígitos en los <b>colores hexadecimales</b> describen el color a partir de la mezcla de rojo, verde y azul, <b>RRVVAA (RRGGBB)</b>. Así <b>\#1155DD</b> significa, un poco de rojo, algo de verde y un montón de azul.
- ¿Pero por qué las letras? En los <b>Colores hexadecimales</b> se cuenta usando 1-9 y A-F porque tienen que expresar números más grandes de 9, pero no se pueden usar más de 6 dígitos en total. Esto significa que necesitamos una forma de expresar 10, 11 y otros números más grandes usando un sólo dígito. ¡Un reto!
- Así pues, los colores hexadecimales usan el sistema de numeración llamado <b>hexadecimal</b>, conde 10 = A, 11 = B, y así sucesivamente, hasta F. Podría explicar por qué sólo llegamos hasta 16, ¡pero <b>ESO</b> es desviarse aún más!
- Con esta forma de describir los colores, tenemos 16,777,216 posibles colores, ¡así que tenemos mucho margen! Si quieres usar un selector de colores, mira <a href="https:\/\/htmlcolorcodes.com\/">la lista de códigos de colores HTML</a>.
* ❯
-> html2_8_es

=== html2_8_es ===
- Vale, así que ahora ya sabes algo sobre colores. Ahora, recuerda cuando cambiamos el color de todas las etiquetas <tt>li</tt>. Sería más útil si pudiéramos hacer eso sólo para las instrucciones, ¡vamos allá!
* ❯
-> html2_8_2_es

=== html2_8_2_es ===
- Primero, vamos a duplicar nuestro CSS <tt>li</tt>, así la otra etiqueta <tt>li</tt> seguirá teniendo color cuando terminemos. Selecciona las tres líneas de CSS <tt>li</tt> CSS (<tt>li \{</tt>, el color, y el final <tt>\}</tt>), copia todo el texto, y luego pégalo justo debajo.
- Recuerda, si estás en un PC o Linux, puedes usar <b>Ctrl + C</b> para copiar y <b>Ctrl + V</b> para pegar. Si usas Mac, usa <b>⌘ + C</b> y <b>⌘ + V</b>.
* ❯
-> html2_9_es

=== html2_9_es ===
- Ahora, vamos a modificar el texto que has pegado. Necesitamos hacer el CSS más específico, de tal forma que en lugar de todos las etiquetas <tt>li</tt> sólo afecte a las etiquetas <tt>li</tt> que están dentro de la etiqueta <tt>ol</tt>. Para hacer eso, hacemos lo mismo que cuando pedimos a alguien que agarre un objeto específico de un grupo específico, "Acércame una patata del montón de patatas moradas, no de las patatas rojas ni de las marrones."
- Haremos lo mismo aquí. Cambia la primera línea de nuestro nuevo código CSS a <tt>ol li\{</tt>, y cambia el <b>color</b> a <tt>violet</tt>, así podremos ver el cambio mejor.
-> css1_minder_es -> html2_10_es

=== html2_10_es ===
- ¿Ves como funciona? Sólo los elementos de la lista (li) dentro de una lista ordenada (ol) serán violeta (violet), todos los demás seguirán siendo naranja (o el color que tengas). Esto nos muestra otra cosa importante acerca de CSS, la regla más específica es la que 'gana'. No importa cual color tengamos en la regla <tt>li</tt>, la regla <tt>ol li</tt> no se verá afectada. Si tenemos más etiquetas dentro de nuestra etiqueta <tt>li</tt>, dentro de <tt>ol</tt>, podremos escribir reglas incluso más específicas que sólo afecten a esas etiquetas.
* ❯
-> html2_11_es

=== html2_11_es ===
- Probemos a aplicar estilos a otra etiqueta con CSS. Ve a la pestaña HTML y busca otra etiqueta que puedas ser buena. ¿Ves alguna?
* [👍] Sí, ¡alguna buena hay!
-> html2_12_es
* [👎] No...
-> html2_11_dontsee_es

=== html2_11_dontsee_es ===
- En la pestaña HTML, busca el texto rodeado por <tt>&lt;h1&gt; &lt;/h1&gt;</tt>, <tt>&lt;h2&gt; &lt;/h2&gt;</tt> o <tt>&lt;h3&gt; &lt;/h3&gt;</tt>. ¡Eso es lo que vamos a modificar ahora!
* ❯
-> html2_12_es

=== html2_12_es ===
- ¡Vale! Vamos a probar con esas otras etiquetas. Vuelve a la pestaña CSS y crea una nueva línea debajo de tus reglas CSS. En esas nuevas líneas,
escribe <tt>h1 \{</tt>(pulsa Enter)<tt>color: MediumSpringGreen;</tt>(pulsa Enter otra vez)<tt>\}</tt>.
* [(wait for: css icontains "color: mediumspringgreen;")](Hecho)
-> html2_13_es
* [(wait for: css icontains "color:mediumspringgreen;")](Hecho)
-> html2_13_es

=== html2_13_es ===
- Genial. Puedes cambiar el color si quieres, a mi me gusta usar colores llamativos primero, para asegurarme de que puedo ver lo que estoy cambiando.
- Si quieres, puedes crear ahora algunas reglas más para las demás etiquetas. ¡Prueba <b>h2</b> y <b>h3</b>!
- Cuando quieras continuar, avísame.
* ❯
-> html2_14_es

=== html2_14_es ===
- Ahora, para los toques finales- ¡una imagen! Vuelve a la pestaña <b>HTML</b>.
- Vamos a poner una imagen arriba, just después del título. Pon el cursor justo después de <tt>&lt;/h1&gt;</tt> y pulsa <b>Enter</b>, eso debería añadir una nueva línea.
- Un vez tengamos la nueva línea, podemos enlazar la imagen. Escribe <tt>&lt;img src = "cookies.png"&gt;</tt>
* [(wait for: html icontains "img src = \"cookies.png\"")](Hecho)
-> html2_15_es
* [(wait for: html icontains "img src=\"cookies.png\"")](Hecho)
-> html2_15_es

=== html2_15_es ===
- ¡Genial! La imagen es un poco grande. Vamos a limitar el ancho (width) un poco. Añade <tt>width = 400</tt> just antes del carácter final (<b>&gt;</b>).
* [(wait for: html icontains " width = 400")](Hecho)
-> html2_16_es
* [(wait for: html icontains " width=400")](Hecho)
-> html2_16_es

=== html2_16_es ===
- Fantástico. Ese número asigna el ancho (width) de tu imagen en pixels, los pequeños puntos que dibujan todo en tu pantalla. Puedes cambiar el número para hacer la imagen más grande o más pequeña que su tamaño original. Encuentra un número que funcione para ti.
* ❯
-> complete_es

=== complete_es ===
- ¡Whew! Apuesto a que eso ha sido mucho para asimilar, y sólo hemos arañado la superficie de lo que puedes hacer con HTML y CSS. Espero verte en la versión de escritorio de Hack, algún día en el futuro, ¡y podemos seguir aprendiendo más cosas chulas! Te mereces una recompensa.
~ set_game_state("quest.Web/complete", true)
~ set_game_state("quests.achievements/web-complete", true)
* ❯
# character: felix
- <i>prrrow^r, brbrbrbr mrrr*&$0w!</i>
- ¡Bien visto, Felix! Hey {get_user_name()}, ¿por qué no vas a la cocina y horneas tú mismo algunas galletas? ¡Te prometo que son buenas!
-> END
