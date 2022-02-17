// Variables
let physics;
let world;
let circles = [];
let cueBall;

// Functions
function setupTable(x, y){
    let index = 0;
    let rowSize = 1;
    let spacing = 14;

    while(index < circles.length){
        for(let row = 0; row < rowSize; row++){
            for(let col = 0; col < row + 1; col++){
                let c = circles[index];
                
                c.rb.pos.x = x + (col - row / 2) * spacing;
                c.rb.pos.y = y - row * spacing;
                console.log(index + "\tRow: " + row + "\tCol: " + col + "\t" + c.rb.pos);

                index++;
                if(index >= circles.length) return;
            }

            rowSize++;
        }
    }
}

// Initializer
function setup(){
    createCanvas(400, 400);

    physics = new World();

    world = physics.registerBody(bodyTypes.createWorldBody(width / 2, height / 2, 150, 220, 0));

    // floor = physics.registerBody(bodyTypes.createBoxBody(200, 375, 390, 10, 0, 10));
    // floor.static = true;
    // floor.collidedFunc = (body) => {};

    // Ugly but must be done, the standard colors are arbitrary.
    circles.push(new Ball(physics, 200, 200, "yellow", 1));
    circles.push(new Ball(physics, 200, 200, "blue", 2));
    circles.push(new Ball(physics, 200, 200, "red", 3));
    circles.push(new Ball(physics, 200, 200, "purple", 4));
    circles.push(new Ball(physics, 200, 200, "orange", 5));
    circles.push(new Ball(physics, 200, 200, "green", 6));
    circles.push(new Ball(physics, 200, 200, "burgundy", 7));
    circles.push(new Ball(physics, 200, 200, "black", 8));
    circles.push(new Ball(physics, 200, 200, "yellow", 9));
    circles.push(new Ball(physics, 200, 200, "blue", 10));
    circles.push(new Ball(physics, 200, 200, "red", 11));
    circles.push(new Ball(physics, 200, 200, "purple", 12));
    circles.push(new Ball(physics, 200, 200, "orange", 13));
    circles.push(new Ball(physics, 200, 200, "green", 14));
    circles.push(new Ball(physics, 200, 200, "burgundy", 15));
    cueBall = new Ball(physics, 200, 300, "white", " ");
    setupTable(200, 200);

    cueBall.rb.acc.y = -1;
}

// Runtime
function draw(){
    background(220);
    world.render();
    // floor.render();

    for(let c of circles){
        c.render();
    }

    cueBall.render();

    physics.update(1);
}