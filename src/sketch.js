// Variables
let physWorld;
let testBody;
let test2;
let test3;

// Initializer
function setup(){
    createCanvas(400, 400);

    physWorld = new World();
    testBody = physWorld.registerBody(bodyTypes.createBoxBody(200, 100, 50, 70, 70, 100));
    test2 = physWorld.registerBody(bodyTypes.createBoxBody(170, 350, 200, 10, 0, 10));
    test2.collidedFunc = (body) => {
        console.log("Hit");
    };
}

// Runtime
function draw(){
    background(220);
    testBody.render();
    test2.render();
    
    testBody.vel.x = (mouseX - testBody.pos.x) * 0.01;
    testBody.vel.y = (mouseY - testBody.pos.y) * 0.01;
    test2.vel.x = (mouseX - test2.pos.x) * 0.01;
    test2.vel.y = (mouseY - test2.pos.y) * 0.01;

    physWorld.update(0);
}