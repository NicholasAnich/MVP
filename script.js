
var MatterHoop = MatterHoop || {};

MatterHoop.game = function() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Events = Matter.Events,
        Constraint = Matter.Constraint,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Common = Matter.Common,
        Composite = Matter.Composite,
        Bodies = Matter.Bodies,
        Body = Matter.Body;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 1830,
            height: 900,
            showAngleIndicator: false,
            wireframes: false,
            background: './winter.jpg',
            // background.position: 'absolute'
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    var defaultCategory = 0x0001,
        snowCategory = 0x0002;

    var colorA = '#ffff';

    rockOptions = {
      density: 0.005,
      friction: 0.05,
      render: {
        strokeStyle: '#ffffff',
        sprite: {
            texture: '../pngwing.com.png',
            xScale: .30,
            yScale: .30
        }
      }
    }
    // LEFT ROCK
    leftRock = Bodies.polygon(-25, 450, 8, 20, rockOptions)
    leftAnchor = { x: -25, y: 450 }
    leftElastic = Constraint.create({
        pointA: leftAnchor,
        bodyB: leftRock,
        stiffness: 0.05
    });


    // RIGHT ROCK
    rightRock = Bodies.polygon(800, 450, 8, 20, rockOptions)
    rightAnchor = { x: 800, y: 450 },
    rightElastic = Constraint.create({
      pointA: rightAnchor,
      bodyB: rightRock,
      stiffness: 0.05
    });

    var randomNumber = (min, max) => {
      return Math.random() * (max - min) + min;
    }

    setInterval(() => {
      Composite.add(world,
        Bodies.circle(randomNumber(-150, 970), 0, randomNumber(2, 5), {
          isSensor: true,
          frictionAir: randomNumber(0.2, 1),
          render: {
            strokeStyle: colorA,
            fillStyle: 'white',
            lineWidth: 1,
          },
        })
        )
    }, randomNumber(200, 500))

    let minutes = 2;
    let seconds = 59;
    document.getElementById('timer').innerHTML = (`${minutes}:${seconds}`)
    setInterval(() => {
      if (minutes === 0 && seconds === 0) {
      document.getElementById('timer').innerHTML = (`TIMES UP!`)
      document.getElementById('score').innerHTML = (`FINAL SCORE: ${score}`)
      clearInterval()
      }
      else if (seconds === 0 && minutes > 0) {
        minutes -= 1
        seconds = 59;
      document.getElementById('timer').innerHTML = (`${minutes}:${seconds}`)
      } else {
        seconds -= 1;
        if (seconds < 10) {
        document.getElementById('timer').innerHTML = (`${minutes}:0${seconds}`)
        } else {
          document.getElementById('timer').innerHTML = (`${minutes}:${seconds}`)
        }
      }

    }, 1000)

        // add revolute constraint
        var bodyA = Bodies.rectangle(700, 130, 100, 20, {
          render: {
            fillStyle: '#86d6d8'
          }
        });

        var constraintA = Constraint.create({
            pointA: { x: 700, y: 130 },
            bodyB: bodyA,
            length: 0
        });

        var bodyB = Bodies.rectangle(100, 130, 100, 20, {
          render: {
            fillStyle: '#20c3d0'
          }
        });

        var constraintB = Constraint.create({
            pointA: { x: 100, y: 130 },
            bodyB: bodyB,
            length: 0
        });


        Composite.add(world, [bodyA, bodyB, constraintA, constraintB]);



    // FILTER SNOW
    // setInterval(() => {
    //   var filterSnow = () => {
    //     world.bodies.forEach(snowball => {
    //       // console.log(snowball, 'FROM FILTER')
    //       if (snowball.label === 'Circle Body' && snowball.position.y > 800) {
    //         console.log(snowball, 'SNOWBALL FILTER')
    //         Matter.World.remove(snowball)
    //         console.log(Matter.World.remove(snowball))
    //       }
    //     });
    //   }
    // }, 5000)

    var cloth = MatterHoop.game.cloth(
      330, 350, 10, 5,
      5,   5,   false,
      2
      );

    for (var i = 0; i < 20; i++) {
      cloth.bodies[i].isStatic = true;
      cloth.bodies[i].isSensor = true;
    }


    setInterval(() => {
      var gravity = engine.gravity.x;
      engine.gravity.x = 0

      if (gravity >= 5 || gravity <= -5) {
        console.log('Huge wind shift!')
      }
      // console.log(gravity)

    }, 10000)


    setInterval(() => {
      engine.gravity.x = randomNumber(-10, 10)
    }, 50000)

    Composite.add(world, [
      // ground,

      // wallTop,
      wallBottom,
      wallRight,
      wallLeft,

      // barrierBottom,
      barrierLeft,
      barrierRight,

      collisionBottom,
      // collisionLeft,
      // collisionRight,

      leftRock,
      leftElastic,

      rightRock,
      rightElastic,

      cloth,

      Bodies.rectangle(200, 350, 280, 20, { isStatic: true, angle: Math.PI * 0.30, render: {
        fillStyle: './iceTexture.jpg',
      } }),
      Bodies.rectangle(570, 350, 280, 20, { isStatic: true, angle: Math.PI * - 0.30, render: {
        fillStyle: './iceTexture.jpg'
       } }),
       Bodies.rectangle(408, 356, 8, 8, { isStatic: true, render: {visible: false}}),
       Bodies.rectangle(337, 356, 8, 8, { isStatic: true, render: {visible: false}}),
    ]);

    Events.on(engine, 'beforeUpdate', function(event) {
      counter += 0.014;

      if (counter < 0) {
          return;
      }

      var px = 400 + 100 * Math.sin(counter);

      Body.setPosition(barrierLeft, { x: px - 110, y: barrierLeft.position.y});
      Body.setPosition(barrierRight, { x: px + 110, y: barrierRight.position.y});
      // Body.setPosition(collisionBottom, { x: px, y: collisionBottom.position.y});
    });

    // console.log(clothPosition)

    Events.on(engine, 'afterUpdate', function() {
      if (mouseConstraint.mouse.button === -1 &&
         (leftRock.position.x < -200 ||
          leftRock.position.y < 430)) {
        leftRock = Bodies.polygon(-25, 450, 7, 20, rockOptions);
        Composite.add(engine.world, leftRock);
        leftElastic.bodyB = leftRock;
      }

      if (mouseConstraint.mouse.button === -1 &&
         (rightRock.position.x > 1000  ||
          rightRock.position.y < 430)) {
        rightRock = Bodies.polygon(800, 450, 7, 20, rockOptions);
        Composite.add(world, rightRock);
        rightElastic.bodyB = rightRock;
      }

    });


    colorA = 'green'
    colorB = 'green'
    let score = 0

    document.getElementById('score').innerHTML = `SCORE: ${score}`;

    Events.on(engine, 'collisionStart', function(event) {
      var pairs = event.pairs;

      for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];

          if (pair.bodyA === collisionBottom && !pair.bodyB.isSensor) {
              score++
              document.getElementById('score').innerHTML = `SCORE: ${score}`
              // console.log(`Your score is: ${score}`)
          } else if (pair.bodyB === collisionBottom && !pair.bodyA.isSensor) {
              score++
              document.getElementById('score').innerHTML = `SCORE: ${score}`
              // console.log(`Your score is: ${score}`)
          }
      }
  });

  Events.on(engine, 'collisionEnd', function(event) {
    var pairs = event.pairs;

    for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];

        if (pair.bodyA === collisionBottom) {
            pair.bodyB.render.strokeStyle = colorB;
        } else if (pair.bodyB === collisionBottom) {
            pair.bodyA.render.strokeStyle = colorB;
        }
    }

  });


  // GRAVITY
   engine.gravity.y = 2

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    Composite.add(world, mouseConstraint);
    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {

        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        score: score,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};

MatterHoop.game.title = 'MatterHoop';
MatterHoop.game.score = score;
MatterHoop.game.for = '>=0.14.2';

if (typeof module !== 'undefined') {
    module.exports = MatterHoop.game;
}


MatterHoop.game.cloth = function(
  xx, yy, columns, rows,
  columnGap, rowGap, crossBrace,
  particleRadius, particleOptions,
  constraintOptions)
  {

  var Body = Matter.Body,
      Bodies = Matter.Bodies,
      Common = Matter.Common,
      Composites = Matter.Composites;

  var group = Body.nextGroup(true);

  particleOptions = Common.extend({
    inertia: Infinity,
    friction: 0.0001,
    collisionFilter: { group: group },
    render: { visible: false }},
    particleOptions);

  constraintOptions = Common.extend({
    stiffness: 0.02,
    isSensor: true,
    render: {
    type: 'line',
    anchors: false
    }
  },
    constraintOptions);

  var cloth = Composites.stack(xx, yy, columns, rows, columnGap, rowGap, function(x, y) {
      return Bodies.circle(x, y, particleRadius, particleOptions);
  });

  Composites.mesh(cloth, columns, rows, crossBrace, constraintOptions);

  cloth.label = 'Cloth Body';

  console.log(cloth.position, 'CLOTH')

  return cloth;
};

MatterHoop.game()