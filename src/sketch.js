// Variables
let physWorld;
let testBody;
let floor;
let circles = [];

// Initializer
function setup(){
    createCanvas(400, 400);

    physWorld = new World();

    // testBody = physWorld.registerBody(bodyTypes.createBoxBody(200, 100, 50, 50, 43, 100));

    floor = physWorld.registerBody(bodyTypes.createBoxBody(200, 375, 390, 10, 0, 10));
    floor.static = true;
    floor.collidedFunc = (body) => {
        // console.log("Hit");
    };

    circles.push(physWorld.registerBody(bodyTypes.createCircleBody(210, 10, 30, 10)));
    // circles.push(physWorld.registerBody(bodyTypes.createCircleBody(200, 390, 30, 10)));
    circles[0].vel.y = 10;
    // circles[1].vel.y = -1;
}

// Runtime
function draw(){
    background(220);
    // testBody.render();
    floor.render();

    for(let c of circles){
        c.render();
    }

    // testBody.acc.y += 0.01;

    physWorld.update(1);
}