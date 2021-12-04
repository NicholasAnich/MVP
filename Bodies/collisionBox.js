var Bodies = Matter.Bodies;
var Constraint = Matter.Constraint;
var SAT = Matter.SAT;

var collisionBottom = Bodies.rectangle(370, 250, 200, 20, {
   isStatic: true,
   opacity: .2,
   isSensor: true,
    render: {
       fillStyle: 'red'
      }
    });

    console.log(collisionBottom.isSensor)
var collisionLeft = Bodies.rectangle(270, 210, 20, 100, {
  isStatic: true,
  isSensor: true,
    render: {
      fillStyle: 'lightblue',
      rotate: 25
    }
})

var collisionRight = Bodies.rectangle(470, 210, 20, 100, {
  isStatic: true,
  isSensor:true,
    render: {
      fillStyle: 'lightblue',
      rotate: 25
    }
})