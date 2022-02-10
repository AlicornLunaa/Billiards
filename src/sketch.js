// Variables
let physWorld;
let testBody;
let test2;
let test3;

// Initializer
function setup(){
    createCanvas(400, 400);

    physWorld = new World();
    testBody = physWorld.registerBody(bodyTypes.createBoxBody(200, 100, 50, 70, 45, 100));
    test2 = physWorld.registerBody(bodyTypes.createBoxBody(200, 350, 100, 10, 0, 1));
    test2.collidedFunc = (body) => {
        console.log("Hit");
    };
    test2.vel.y = -1;
}

// Runtime
function draw(){
    background(220);
    testBody.render();
    test2.render();

    physWorld.update(0);
}