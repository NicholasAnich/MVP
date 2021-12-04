var Bodies = Matter.Bodies;
var Constraint = Matter.Constraint;

var collisionBottom = Bodies.rectangle(370, 355, 60, 1, {
   isStatic: true,
   opacity: .2,
   isSensor: true,
    render: {
      visible: true,
       fillStyle: 'rgba(255, 255, 255, 0.5)',
      lineWidth: 0
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