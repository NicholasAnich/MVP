var wallBottom = Bodies.rectangle(400, 0, 1150, 50, {
  isStatic: true,
  render: {
    fillStyle: 'lightblue'
  }
 })
var wallTop = Bodies.rectangle(400, 600, 1150, 50, {
   isStatic: true,
   render: {
     fillStyle: 'lightblue'
    }
  })
var wallRight = Bodies.rectangle(1000, 300, 50, 600, {
   isStatic: true,
   render: {
     fillStyle: 'lightblue'
   }
  })
var wallLeft = Bodies.rectangle(-200, 300, 50, 600, {
   isStatic: true,
   render: {
     fillStyle: 'lightblue'
    }
  })