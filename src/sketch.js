// Variables
let physics;
let world;
let floor;
let circles = [];

// Initializer
function setup(){
    createCanvas(400, 400);

    physics = new World();

    world = physics.registerBody(bodyTypes.createWorldBody(width / 2, height / 2, 150, 150, 0));

    // floor = physics.registerBody(bodyTypes.createBoxBody(200, 375, 390, 10, 0, 10));
    // floor.static = true;
    // floor.collidedFunc = (body) => {};

    circles.push(physics.registerBody(bodyTypes.createCircleBody(200, 200, 30, 10)));
}

// Runtime
function draw(){
    background(220);
    world.render();
    // floor.render();

    for(let c of circles){
        c.render();

        c.acc.x = (mouseX - c.pos.x) * 0.001;
        c.acc.y = (mouseY - c.pos.y) * 0.001;
    }

    physics.update(1);
}