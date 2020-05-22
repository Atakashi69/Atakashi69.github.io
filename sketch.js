var sphere;
var supershape;

let n11Input;
let n21Input;
let n31Input;
let m1Slider;

let n12Input;
let n22Input;
let n32Input;
let m2Slider;

var n11, n21, n31, m1;
var n12, n22, n32, m2;

let cbox;
var animate = false;

let selection;
let figureCP;
let strokeCP;

function setup() {
  createCanvas(1200, 600, WEBGL);
  createEasyCam();
  textAlign(CENTER);

  supershape = new SuperShape(150, 40);
  supershape.compute();

  sphere = new Sphere(150, 40);
  sphere.compute();

  let a = createA('http://paulbourke.net/geometry/supershape/', 'Reference', '_blank');
  a.position(200, height + 5);

  let p1 = createP('SuperShape1:');
  p1.position(10, height + 5);

  n11Input = createInput('0.7');
  n11Input.position(10, height + 30);

  n21Input = createInput('0.3');
  n21Input.position(10, height + 50);

  n31Input = createInput('0.2');
  n31Input.position(10, height + 70);

  m1Input = createInput('2');
  m1Input.position(10, height + 90);
  m1 = m1Input.value();
  m1Input.input(setM1);

  let p2 = createP('SuperShape2:');
  p2.position(10, height + 115);

  n12Input = createInput('100');
  n12Input.position(10, height + 140);

  n22Input = createInput('100');
  n22Input.position(10, height + 160);

  n32Input = createInput('100');
  n32Input.position(10, height + 180);

  m2Input = createInput('3');
  m2Input.position(10, height + 200);
  m2 = m2Input.value();
  m2Input.input(setM2);

  cbox = createCheckbox('Animate', false);
  cbox.position(200, height + 95);

  sbox = createCheckbox('Sphere', false);
  sbox.position(200, height + 120);

  selection = createSelect();
  selection.position(400, height + 5)
  for (var i = 1; i <= 15; i++)
    selection.option('Figure ' + i);
  selection.changed(chooseFigure);

  let p3 = createP('Figure: ');
  p3.position(500, height + 5);
  figureCP = createColorPicker('red');
  figureCP.position(550, height + 5);

  let p4 = createP('Stroke: ');
  p4.position(500, height + 40);
  strokeCP = createColorPicker('white');
  strokeCP.position(550, height + 40);
}

function chooseFigure() {
  let fig = selection.value().slice(7);
  switch (fig) {
    case '1':
      n11Input.value(0.7); n21Input.value(0.3); n31Input.value(0.2); m1Input.value(2);
      n12Input.value(100); n22Input.value(100); n32Input.value(100); m2Input.value(3);
      break;
    case '2':
      n11Input.value(0.2); n21Input.value(1.7); n31Input.value(1.7); m1Input.value(7);
      n12Input.value(0.2); n22Input.value(1.7); n32Input.value(1.7); m2Input.value(7);
      break;
    case '3':
      n11Input.value(1); n21Input.value(1); n31Input.value(1); m1Input.value(2);
      n12Input.value(1); n22Input.value(1); n32Input.value(1); m2Input.value(4);
      break;
    case '4':
      n11Input.value(1); n21Input.value(1); n31Input.value(1); m1Input.value(6);
      n12Input.value(1); n22Input.value(1); n32Input.value(1); m2Input.value(3);
      break;
    case '5':
      n11Input.value(1); n21Input.value(1); n31Input.value(1); m1Input.value(3);
      n12Input.value(1); n22Input.value(1); n32Input.value(1); m2Input.value(6);
      break;
    case '6':
      n11Input.value(0.3); n21Input.value(0.3); n31Input.value(0.3); m1Input.value(1);
      n12Input.value(1);   n22Input.value(1);   n32Input.value(1);   m2Input.value(0);
      break;
    case '7':
      n11Input.value(0.25); n21Input.value(47.8); n31Input.value(-0.8); m1Input.value(6);
      n12Input.value(-76);   n22Input.value(0.5);   n32Input.value(-56);   m2Input.value(7);
      break;
    case '8':
      n11Input.value(3000); n21Input.value(1000); n31Input.value(1000); m1Input.value(6);
      n12Input.value(250);   n22Input.value(100);   n32Input.value(100);   m2Input.value(6);
      break;
    case '9':
      n11Input.value(60); n21Input.value(55); n31Input.value(1000); m1Input.value(6);
      n12Input.value(250);   n22Input.value(100);   n32Input.value(100);   m2Input.value(6);
      break;
    case '10':
      n11Input.value(60); n21Input.value(100); n31Input.value(30); m1Input.value(8);
      n12Input.value(10);   n22Input.value(10);   n32Input.value(10);   m2Input.value(2);
      break;
    case '11':
      n11Input.value(0.5); n21Input.value(1.7); n31Input.value(1.7); m1Input.value(3);
      n12Input.value(10);   n22Input.value(10);   n32Input.value(10);   m2Input.value(2);
      break;
    case '12':
      n11Input.value(0.1); n21Input.value(1.7); n31Input.value(1.7); m1Input.value(5);
      n12Input.value(0.3);   n22Input.value(0.5);   n32Input.value(0.5);   m2Input.value(1);
      break;
    case '13':
      n11Input.value(0.1); n21Input.value(1.7); n31Input.value(1.7); m1Input.value(0.2);
      n12Input.value(0.5);   n22Input.value(0.2);   n32Input.value(0.2);   m2Input.value(2);
      break;
    case '14':
      n11Input.value(0.5); n21Input.value(1); n31Input.value(2.5); m1Input.value(5.7);
      n12Input.value(3);   n22Input.value(0.2);   n32Input.value(1);   m2Input.value(10);
      break;
    case '15':
      n11Input.value(1); n21Input.value(1); n31Input.value(1); m1Input.value(5);
      n12Input.value(100);   n22Input.value(100);   n32Input.value(100);   m2Input.value(3);
      break;
  }
}

function setM1() {
  m1 = m1Input.value();
}

function setM2() {
  m2 = m2Input.value();
}

let m1off = 0;
let m2off = 0;

function draw() {
  background(0);

  /* Lights:
  push();
  strokeWeight(10);
  stroke(255);
  point(width / 2, height / 2, 200);
  point(-width /2, -height / 2, -200);
  point(width / 2, -height / 2, 200);
  point(-width / 2, height / 2, -200);
  pop();*/

  if (cbox.checked()) {
    m1 = map(sin(m1off), -1, 1, 0, 10);
    m2 = map(sin(m2off), -1, 1, 0, 10);
    m1Input.value(m1);
    m2Input.value(m2);
    m1off += radians(0.5);
    m2off += radians(0.5);
  } else {
    m1 = m1Input.value();
    m2 = m2Input.value();
  }

  n11 = n11Input.value();
  n21 = n21Input.value();
  n31 = n31Input.value();

  n12 = n12Input.value();
  n22 = n22Input.value();
  n32 = n32Input.value();

  if(!sbox.checked()) {
    supershape.compute(n11, n21, n31, m1, n12, n22, n32, m2);
    supershape.draw();
  } else {
    sphere.compute(m1 * 15 + 100);
    sphere.draw();
  }
}
