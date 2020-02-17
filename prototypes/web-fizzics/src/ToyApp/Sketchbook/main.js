document.body.style.margin = 0;
document.body.style.padding = 0;
document.body.style.overflow = 'hidden';

function setup() { 
    createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() { 
  background(255);
}