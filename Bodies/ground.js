var Bodies = Matter.Bodies;
var Constraint = Matter.Constraint;
// var Events = Matter.Events;
var size = 50;
var counter = -1;

var ground = Bodies.rectangle(400, 610, 1830, 50, {
   isStatic: true,
    render: {
      fillStyle: '#060a19'
    }
  })

var barrierBottom = Bodies.rectangle(370, 250, 200, 20, {
   isStatic: true,
   isSensor: true,
    render: {
       fillStyle: 'lightblue'
      }
  })

var barrierLeft = Bodies.rectangle(270, 210, 20, 100, {
  isStatic: true,
    render: {
      fillStyle: 'lightblue',
      rotate: 25
    }
})


var barrierRight = Bodies.rectangle(470, 210, 20, 100, {
  isStatic: true,
    render: {
      fillStyle: 'lightblue',
      rotate: 25
    }
})
