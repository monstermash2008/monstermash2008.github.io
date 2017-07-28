/////////////////////////////////////////////////////////////
//
// Simple clockwise and anti-clockwise rotation of a square
// Created by Ryan Finnie
//
/////////////////////////////////////////////////////////////

var a = 0;
var squareSize = 200;
var increment = -0.03;
var clockwise = true
var padding = 10;

function setup() {
  createCanvas(800, 800);
  

  buttonClockwise = createButton('Clockwise');
  buttonClockwise.label = "different";
  buttonClockwise.position(padding, 65);
  buttonClockwise.size(200,50);
  buttonClockwise.mousePressed(rotClock);

  buttonAnti = createButton('Anti-clockwise');
  buttonAnti.size(200,50);
  buttonAnti.position(width-buttonAnti.width-padding, 65);
  buttonAnti.mousePressed(rotAnti);

  buttonClockwise.hide();

}

function draw() {
  clear();
  background(230);

  fill(204, 101, 192, 127);
  translate(width/2, height/2);
  a = a+increment;
  rotate(-a*PI/3.0);
  
  stroke(127, 63, 120);
  rect(-squareSize/2, -squareSize/2, squareSize,squareSize);
}

function rotClock() {
  if (!clockwise) {
    increment = -increment;
    clockwise = true;
    buttonClockwise.hide();
    buttonAnti.show();
  }
}

function rotAnti() {
  if (clockwise) {
    increment = -increment;
    clockwise = false;
    buttonClockwise.show();
    buttonAnti.hide();
    
  }
}