var Bodies = Matter.Bodies;
var Constraint = Matter.Constraint;

var ground = Bodies.rectangle(400, 610, 1830, 50, {
   isStatic: true,
    render: {
      fillStyle: '#060a19'
    }
  })

var ground2 = Bodies.rectangle(610, 250, 200, 20, {
   isStatic: true,
    render: {
       fillStyle: '#060a19'
      }
    });
rockOptions = { density: 0.004 },
rock = Bodies.polygon(170, 450, 8, 20, rockOptions),
anchor = { x: 170, y: 450 },
elastic = Constraint.create({
    pointA: anchor,
    bodyB: rock,
    stiffness: 0.09
});

