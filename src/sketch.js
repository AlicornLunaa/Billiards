// Variables
let physWorld;
let testBody;

// Initializer
function setup(){
    createCanvas(400, 400);

    physWorld = new World();
    testBody = physWorld.registerBody(bodyTypes.createBoxBody(100, 100, 50, 70, 45, 1));
}

// Runtime
function draw(){
    background(220);
    testBody.render();
}