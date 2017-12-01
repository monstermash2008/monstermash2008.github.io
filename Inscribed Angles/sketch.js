var R,r,r2;
var A,B,C;
var m;

var aAngle = 1*3.14159/4;
var bAngle = 3.14159;
var cAngle = 7*3.14159/4;

var angleA;
var angleB;
var angleC;

var flip, fix;

var a1, a2;

var Adragging, Bdragging, Cdragging;

function setup() {
	createCanvas(500, 500);
	frameRate(60);
	
	R = width/2-width/10;
	r = width/50;
	r2 = r*1.5;
	angleMode(RADIANS);
	m = createVector(0,0);
	A = new Point(aAngle, "#2FCC71"); // Green
	B = new Point(bAngle, "#3598DC"); // Blue
	C = new Point(cAngle, "#E84C3D"); // Red
}

function draw() {
	background(255);
	//clear();
	m.x = mouseX-(width/2);
  	m.y = mouseY-(height/2);

  	mouseOn();
	checkCursor();

	translate(width/2, height/2);
	push();

	noFill();
	ellipse(0,0,2*R,2*R);

	if (A.dragging) {
		A.theta = getAngle(m.x, m.y);
	}
	if (B.dragging) {
		B.theta = getAngle(m.x, m.y);
	}
	if (C.dragging) {
		C.theta = getAngle(m.x, m.y);
	}

	C.update();
	A.update();
  	B.update();

  	calcAngles(A.vec, B.vec, C.vec);



  	////////////// DRAWING //////////////

  	//ugly fix for one particular case that causes glitch
  	if (B.theta == A.theta) {
  		B.theta = B.theta+0.001
  	} else {

  	}

  	if (calculateAngleGamma().toFixed(0) != 90) {

	  	if (B.theta < C.theta && C.theta < A.theta) {
		  	flip = true;
	  		//console.log("Case A. Angle: " + 2*abs(a2-a1)*(180/(2*PI)));
		 }
		 else if (B.theta < A.theta && A.theta < C.theta) {
	  		flip = false;
	  		//console.log("Case B. Angle: " + 2*abs(a2-a1)*(180/(2*PI)));
		 }
		 else if (A.theta < B.theta && B.theta < C.theta) {
	  		flip = true
	  		//console.log("Case C. Angle: " + 2*abs(a2-a1)*(180/(2*PI)));
		 }
		 else if (A.theta < C.theta && C.theta < B.theta) {
	  		flip = false;
	  		//console.log("Case D. Angle: " + 2*abs(a2-a1)*(180/(2*PI)));
		 }
		 else if (C.theta < A.theta && A.theta < B.theta) {
	  		flip = true
	  		//console.log("Case E. Angle: " + 2*abs(a2-a1)*(180/(2*PI)));
		 }
		 else if (C.theta < B.theta && B.theta < A.theta) {
	  		flip = false;
	  		//console.log("Case F. Angle: " + 2*abs(a2-a1)*(180/(2*PI)));
		 }

	  	noFill();

		if (flip) {
			arc(B.x, B.y, 4*r2,4*r2, a2,a1);
		} else {
			arc(B.x, B.y, 4*r2,4*r2, a1,a2);
		}
	}
	else {
		push();
		translate(B.x, B.y);
		var square_angle = getAngle(B.x, B.y);

		if (B.theta < C.theta && C.theta < A.theta) {

	  		rotate(C.theta/2+PI/2+square_angle/2);
			translate(-B.x, -B.y);
			rect(B.x, B.y, 2*r,2*r);

	  		console.log("Condition A");
	  	}
	  	else if (B.theta < A.theta && A.theta < C.theta) {

	  		rotate(C.theta/2+square_angle/2);
			translate(-B.x, -B.y);
			rect(B.x, B.y, 2*r,2*r);

	  		console.log("Condition B");
	  	}
	  	else if (A.theta < B.theta && B.theta < C.theta) {

	  		rotate(C.theta/2+PI/2+square_angle/2);
			translate(-B.x, -B.y);
			rect(B.x, B.y, 2*r,2*r);

	  		console.log("Condition C");
	  	}
	  	else if (A.theta < C.theta && C.theta < B.theta) {

	  		rotate(C.theta/2+PI+square_angle/2);
			translate(-B.x, -B.y);
			rect(B.x, B.y, 2*r,2*r);

	  		console.log("Condition D");
	  	}
	  	else if (C.theta < A.theta && A.theta < B.theta) {

	  		rotate(C.theta/2-PI/2+square_angle/2);
			translate(-B.x, -B.y);
			rect(B.x, B.y, 2*r,2*r);

	  		console.log("Condition E");
	  	}
	  	else if (C.theta < B.theta && B.theta < A.theta) {

	  		rotate(C.theta/2+PI+square_angle/2);
			translate(-B.x, -B.y);
			rect(B.x, B.y, 2*r,2*r);

	  		console.log("Condition F");
	  	}
	  	pop();
	}

	line(A.x, A.y, B.x, B.y);
	line(C.x, C.y, B.x, B.y);

  	C.display();
  	A.display();
  	B.display();
  	

  	
	var angleStr = calculateAngleGamma();
	angleStr = angleStr.toFixed(0).toString();
	fill(127, 63, 120);
	textSize(32);
	text("angle = " + angleStr + "º", -80, height/2-10);

	pop();

}

function calculateAngleGamma() {
  var a = distBetweenPoints(C.x, C.y, B.x, B.y);
  var b = distBetweenPoints(C.x, C.y, A.x, A.y);
  var c = distBetweenPoints(A.x, A.y, B.x, B.y);
  return (180/PI)*Math.acos((Math.pow(a,2) + Math.pow(c,2) - Math.pow(b,2))/(2*a*c));
}

function distBetweenPoints(x2,y2, x1, y1) {
  return Math.abs(Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2)));
}

// Debugging function for displaying useful positional info.
function keyPressed() {
	if (keyCode == ENTER) {
		console.log("angle: " + 180/(2*PI)*2*abs(a1+a2));
	}
	return false;
}

function calcAngles(pt1,pt2,pt3) {
  var dx1 = pt1.x-pt2.x;
  var dy1 = pt1.y-pt2.y;
  var dx2 = pt3.x-pt2.x;
  var dy2 = pt3.y-pt2.y;
  a1 = Math.atan2(dy1,dx1);
  a2 = Math.atan2(dy2,dx2);
}

// Calculates angle point makes to centre.
function getAngle(x,y) {
  var angle = Math.atan2(y,x);

    if (angle < 0) {
      angle = TWO_PI+angle;
    }
    return angle;
}

function checkCursor() {

	if (B.mouseOn && mouseIsPressed && !C.dragging && !A.dragging) {
		B.dragging = true;
	}

	if (A.mouseOn && mouseIsPressed && !B.dragging && !C.dragging) {
		A.dragging = true;
	}

	if (C.mouseOn && mouseIsPressed && !A.dragging && !B.dragging) {
		C.dragging = true;
	}
}

function mouseOn() {
	if (m.dist(A.vec) <= r) {
		A.mouseOn = true;
	} else {
		A.mouseOn = false;
	}
	if (m.dist(B.vec) <= r) {
		B.mouseOn = true;
	} else {
		B.mouseOn = false;
	}
	if (m.dist(C.vec) <= r) {
		C.mouseOn = true;
	} else {
		C.mouseOn = false;
	}

	if (A.mouseOn || B.mouseOn || C.mouseOn || A.dragging || B.dragging || C.dragging) {
		document.body.style.cursor = "move";
	} else {
		document.body.style.cursor = "auto";
	}
}

// If mouse is released, set all pressed booleans to false.
function mouseReleased() {
  A.dragging = false;
  B.dragging = false;
  C.dragging = false;
  document.body.style.cursor = "auto";
}