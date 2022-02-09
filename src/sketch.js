// Variables
let physWorld;
let testBody;
let test2;
let test3;

// Initializer
function setup(){
    createCanvas(400, 400);

    physWorld = new World();
    testBody = physWorld.registerBody(bodyTypes.createBoxBody(100, 100, 50, 70, 45, 1));
    test2 = physWorld.registerBody(bodyTypes.createBoxBody(200, 350, 100, 10, 0, 10));
    test2.collidedFunc = (body) => {
        console.log("Hit");
    };

    let c = new Collider(0, 0, 0);
    c.addPoint(0, 20);
    c.addPoint(-20, 10);
    c.addPoint(20, 10);
    test3 = new Body(70, 300, 21, 0);
    test3.addCollider(c);
    physWorld.registerBody(test3);
}

// Runtime
function draw(){
    background(220);
    testBody.render();
    test2.render();
    test3.render();
    
    test2.pos.x = mouseX;
    test2.pos.y = mouseY;

    physWorld.update(0);
}