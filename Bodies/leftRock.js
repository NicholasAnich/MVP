const LeftRock = (x, y, w, h) => {
  this.leftRock = Bodies.circle(x, y, w, h);
  this.w = w;
  this.h = h;
  World.add(world, this.body);

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;
  }
}