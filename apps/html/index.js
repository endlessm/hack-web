var globalParameters = {
  css: `body {
    padding: 10px;
}
`,
  html: `<!DOCTYPE html>
<html>
   <head>
      <title>This is a Test Web Page!</title>
   </head>
   <body>
      <h1>Welcome to my test website!</h1>
      <p>Hello, world!</p>
   </body>
</html>
`,
};

function reload() {
  const content = document.getElementById('content');
  const styles = `<style>${globalParameters.css}</style>`;
  const code = globalParameters.html.replace(/<\/head>/, `${styles}</head>`);
  content.srcdoc = code;
}
