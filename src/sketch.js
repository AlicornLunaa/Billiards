// Variables
let physWorld;
let testBody;
let floor;

// Initializer
function setup(){
    createCanvas(400, 400);

    physWorld = new World();

    testBody = physWorld.registerBody(bodyTypes.createBoxBody(200, 100, 50, 70, 45, 100));

    floor = physWorld.registerBody(bodyTypes.createBoxBody(200, 375, 390, 10, 0, 10));
    floor.static = true;
    floor.collidedFunc = (body) => {
        console.log("Hit");
    };
}

// Runtime
function draw(){
    background(220);
    testBody.render();
    floor.render();

    testBody.acc.y += 0.01;

    physWorld.update(0);
}