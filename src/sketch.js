// Variables
let physWorld;
let testBody;
let test2;

// Initializer
function setup(){
    createCanvas(400, 400);

    physWorld = new World();
    testBody = physWorld.registerBody(bodyTypes.createBoxBody(100, 100, 50, 70, 45, 1));
    test2 = physWorld.registerBody(bodyTypes.createBoxBody(200, 350, 100, 10, 0, 10));
    test2.collidedFunc = (body) => {
        console.log("Hit");
    };
}

// Runtime
function draw(){
    background(220);
    testBody.render();
    test2.render();
    test2.pos.x = mouseX;
    test2.pos.y = mouseY;

    physWorld.update(0);
}