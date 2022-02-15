// Variables
let physWorld;
let testBody;
let floor;
let circles = [];

// Initializer
function setup(){
    createCanvas(400, 400);

    physWorld = new World();

    floor = physWorld.registerBody(bodyTypes.createBoxBody(200, 375, 390, 10, 0, 10));
    floor.static = true;
    floor.collidedFunc = (body) => {};

    circles.push(physWorld.registerBody(bodyTypes.createCircleBody(110, 10, 30, 10)));
}

// Runtime
function draw(){
    background(220);
    floor.render();

    for(let c of circles){
        c.render();
    }

    physWorld.update(1);
}