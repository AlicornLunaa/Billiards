// Variables
let physWorld;
let testBody;
let test2;
let test3;

// Initializer
function setup(){
    createCanvas(400, 400);

    physWorld = new World();
    testBody = physWorld.registerBody(bodyTypes.createBoxBody(200, 100, 50, 70, 0, 100));
    test2 = physWorld.registerBody(bodyTypes.createBoxBody(170, 350, 200, 10, 0, 10));
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
    
    testBody.acc.x = (mouseX - testBody.pos.x) * 0.0001;
    testBody.acc.y = (mouseY - testBody.pos.y) * 0.0001;
    test2.acc.x = (mouseX - test2.pos.x) * 0.0001;
    test2.acc.y = (mouseY - test2.pos.y) * 0.0001;

    physWorld.update(0);
}