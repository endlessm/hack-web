var globalParameters = {
  code: `
<html> <!-- This tag tells the browser that this is an HTML document. That's a fancy way of saying it's a web page. -->
  <head> <!-- The <head> element is the header of the page. It contains everything that shows up at the very beginning of the page, like the page number and chapter name in a book. -->
  <title>This is a Test Web Page!</title>
  </head>
  <body> <!-- The <body> tag is what most people think of as the 'web page'.  <body> contains all the content you normally see, like text, links, and images. -->
  <h1>Welcome to my test website!</h1>
  <p>Hello, world!</p>
  </body> <!-- This is the closing tag for <body>. -->
</html> <!-- This is the closing tag for <html>, which means this is the end of the webpage. -->
  `,
};

function reload() {
  const content = document.getElementById('content');
  content.srcdoc = globalParameters.code;
}
