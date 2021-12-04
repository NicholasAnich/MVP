
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
        Composite = Matter.Composite,
        Bodies = Matter.Bodies;

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
            wireframes: false
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);


    rockOptions = {
      density: 0.001,
      friction: 0.05,
      render: {
        strokeStyle: '#ffffff',
        sprite: {
            texture: '../pngwing.com.png',
            xScale: .35,
            yScale: .35
        }
      }
    }
    // LEFT ROCK
    leftRock = Bodies.polygon(-25, 450, 8, 20, rockOptions)

    leftAnchor = { x: -25, y: 450 }

    leftElastic = Constraint.create({
        pointA: leftAnchor,
        bodyB: leftRock,
        stiffness: 0.1
    });


    // RIGHT ROCK
    rockRight = Bodies.polygon(800, 450, 8, 20, rockOptions)

    rightAnchor = { x: 800, y: 450 },

    rightElastic = Constraint.create({
      pointA: rightAnchor,
      bodyB: rockRight,
      stiffness: 0.05
    });

    Composite.add(engine.world, [
      ground,

      wallTop,
      wallBottom,
      wallRight,
      wallLeft,

      barrierBottom,
      barrierLeft,
      barrierRight,

      collisionBottom,
      collisionLeft,
      collisionRight,

      leftRock,
      leftElastic,

      rockRight,
      rightElastic,
    ]);

    Events.on(engine, 'afterUpdate', function() {
      if (mouseConstraint.mouse.button === -1 &&
         (leftRock.position.x < -70 ||
          leftRock.position.y < 430)) {
        leftRock = Bodies.polygon(-25, 450, 7, 20, rockOptions);
        Composite.add(engine.world, leftRock);
        leftElastic.bodyB = leftRock;
      }
    });

    let colorA = 'green'
    let colorB = 'green'
    let score = 0

    Events.on(engine, 'collisionStart', function(event) {
      var pairs = event.pairs;

      for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];
        // console.log(pair)

          if (pair.bodyA === collisionBottom) {
              pair.bodyB.render.strokeStyle = colorA;
              score++
              console.log(`Your score is: ${score}`)
          } else if (pair.bodyB === collisionBottom) {
              pair.bodyA.render.strokeStyle = colorA;
              score++
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
   engine.gravity.y = .9

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

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};

MatterHoop.game.title = 'MatterHoop';
MatterHoop.game.for = '>=0.14.2';

if (typeof module !== 'undefined') {
    module.exports = MatterHoop.game;
}

MatterHoop.game()