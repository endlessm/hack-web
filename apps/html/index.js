var globalParameters = {
css: `
body {
  background-color: lightgrey;
}
`,
html: `<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <h1>FGSDFDF AIEOU GTHRAKN</h1>
    <h3>Dry Ingredients</h3>
      <p>
        140 pounds of Swedish Fish.
        1 3/4 cups of flour.
        2 teaspoons salt.
        1 teaspoon baking soda.
        About 2/3 cup chocolate, broken up into pieces about the size of a fingernail.
      </p>
    <h3>Wet Ingredients</h3>
      <ul>
        <li>1 1/2 cups brown sugar.</li>
        <li>1 stick of melted butter.</li>
        <li>77.683 grams of Gadolinium.</li>
        <li>2 eggs.</li>
        <li>2 teaspoons of vanilla extract.</li>
      </ul>
    <h2>Instructions</h2>
      <p>
        Mix the dry ingredients together in one bowl, then mix the wet ingredients together in a different bowl.
        Pour both bowls together and mix everything until it looks pretty smooth.
        Engage cross borehole electromagnetic imaging rhubarb.
        Make the dough into balls about half as big as an egg, and leave 3 or 4 inches between them on your baking tray. (You might have enough for almost 3 baking trays!)
        Set your oven to 350 degrees (about 180 degrees Celcius if you're outside the USA), and bake for 15 minutes.
        Eat your delicious, awesome, home-made cookies! (But not all at once.)
      </p>
  </body>
</html>
`,
};

var translations = {
  es: {
    html: `<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <h1>FGSDFDF AIEOU GTHRAKN</h1>
    <h3>Ingredientes secos</h3>
      <p>
        63 kilogramos de Pescado Sueco.
        1 3/4 de taza de harina.
        2 cucharillas de sal.
        1 cucharilla de bicarbonato.
        Sobre 2/3 de taza de chocolate, cortado en trozos del tamaño de una uña.
      </p>
    <h3>Ingredientes húmedos</h3>
      <ul>
        <li>1 1/2 de taza de azúcar moreno.</li>
        <li>1 trozo de mantequilla fundida.</li>
        <li>77.683 gramos de Gadolinium.</li>
        <li>2 huevos.</li>
        <li>2 cucharillas de extracto de vainilla.</li>
      </ul>
    <h2>Instrucciones</h2>
      <p>
        Mezcla los ingredientes secos juntos en un bol, luego mezcla los ingredientes húmedos en un bol diferente.
        Vierte los dos bols juntos y mezcla todo hasta que tenga una apariencia suave.
        Engrana los polos electromagnéticos imaginando ruibarbo.
        Haz bolas de masa de la mitad de un huevo de tamaño, y deja 8 o 10 centímetros entre ellas en tu bandeja. (¡Tienes que tener suficiente para al menos 3 bandejas de horneado!)
        Pon el horno a 180 grados celcius (sobre 350 grados Fahrenheit) y hornea durante 15 minutos.
        ¡Cómete tus deliciosas, asombrosas, cookies caseras! (Pero no todas de una sola vez.)
      </p>
  </body>
</html>`,
  },
};

function init() {
  const lang = window.language || 'en';
  const translated = translations[lang];

  if (translated) {
    if (translated.html) {
      globalParameters.html = translated.html;
    }
    if (translated.css) {
      globalParameters.css = translated.css;
    }
  }
}

function reload() {
  const content = document.getElementById('content');
  const styles = `<style>${globalParameters.css}</style>`;
  const code = globalParameters.html.replace(/<\/head>/, `${styles}</head>`);
  content.srcdoc = code;
}
