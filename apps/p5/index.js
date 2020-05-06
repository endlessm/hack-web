var globalParameters = {
  code: `let num = 20;
let step, sz, offSet, theta, angle;

function setup() {
  createCanvas(600, 400);
  strokeWeight(5);
  step = 22;
  theta = 1;
}

function draw() {
  background(20);

  translate(width/2, height*0.75);
  angle=0;
  for (let i=0; i<num; i++) {
    stroke(255);
    noFill();
    sz = i*step;
    let offSet = TWO_PI/num*i;
    let arcEnd = map(sin(theta+offSet), -1, 1, PI, TWO_PI);
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
