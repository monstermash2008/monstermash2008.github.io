function Point(theta, c) {
	this.theta = theta;
	this.x = R*Math.cos(theta);
	this.y = R*Math.sin(theta);

	this.vec = createVector(this.x, this.y);
	this.mouseOn = false;
	this.dragging = false;
	this.c = c;

	this.display = function() {
		fill(this.c)
		ellipse(this.x,this.y,2*r, 2*r);
	}

	this.update = function() {
		this.x = R*Math.cos(this.theta);
		this.y = R*Math.sin(this.theta);
		this.vec = createVector(this.x, this.y);
	}
}