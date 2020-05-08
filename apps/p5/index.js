var globalParameters = {
  code: `function setup() {
    createCanvas(400, 400);
    num = 20;
    step = 20;
    theta = 1;
}

function draw() {
    strokeWeight(5);
    background(20);
    arcColor = 255;
    doArcs(arcColor);
}


function doArcs(color) {
    translate(width/2, height*0.75);
    angle = 0;
    for (i = 0; i < num; i++) {
        stroke(color);
        noFill();
        sz = i*step;
        offSet = TWO_PI/num*i;
        arcEnd = map(sin(theta+offSet), -1, 1, PI, TWO_PI);
        arc(0, 0, sz, sz, PI, arcEnd*1.00001);
    }
    colorMode(RGB);
    resetMatrix();
    theta += 0.0523;
}
`,
};

function build() {
  try {
    // eslint-disable-next-line no-new,no-new-func
    new Function(globalParameters.code);
  } catch (err) {
    return false;
  }

  return true;
}

function reload() {
  if (!build()) {
    return;
  }

  const content = document.getElementById('content');
  content.srcdoc = `
<html>
  <head>
    <script src="p5.min.js"></script>
    <style>
      html, body {
        height: 100%;
      }
      body {
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      canvas {
        box-shadow: 0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12);
      }
    </style>
  </head>
  <body>
    <script>${globalParameters.code}</script>
  </body>
</html>
`;
}
