// Variables
let physics;
let world;
let goals = [];
let circles = [];
let cueBall;
let grabPos;

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

                index++;
                if(index >= circles.length) return;
            }

            rowSize++;
        }
    }
}

function goalScored(self, other){
    other.collidable = false;
    other.vel.mult(0);
    other.pos.x = 10;
    other.pos.y = 10;
    
    if(other.id === cueBall.rb.id){
        cueBall.rb.collidable = true;
        cueBall.rb.pos.x = width / 2;
        cueBall.rb.pos.y = height - height / 4;
    }
}

// Initializer
function setup(){
    // Initialize window
    createCanvas(400, 400);
    physics = new World();

    // Setup table collisions
    world = physics.registerBody(bodyTypes.createWorldBody(width / 2, height / 2, 150, 220, 0));
    world.addCollider(colliderTypes.createBoxCollider(0, 185, 180, 20, 0));
    world.addCollider(colliderTypes.createBoxCollider(0, -185, 180, 20, 0));
    world.addCollider(colliderTypes.createBoxCollider(-115, 85, 20, 135, 0));
    world.addCollider(colliderTypes.createBoxCollider(115, 85, 20, 135, 0));
    world.addCollider(colliderTypes.createBoxCollider(-115, -85, 20, 135, 0));
    world.addCollider(colliderTypes.createBoxCollider(115, -85, 20, 135, 0));

    // Create goal areas
    goals.push(physics.registerBody(bodyTypes.createBoxBody(92, 25, 25, 30, 0, Infinity)));
    goals.push(physics.registerBody(bodyTypes.createBoxBody(85.5, height / 2, 20, 30, 0, Infinity)));
    goals.push(physics.registerBody(bodyTypes.createBoxBody(92, height - 25, 25, 30, 0, Infinity)));
    goals.push(physics.registerBody(bodyTypes.createBoxBody(width - 92, 25, 25, 30, 0, Infinity)));
    goals.push(physics.registerBody(bodyTypes.createBoxBody(width - 85.5, height / 2, 20, 30, 0, Infinity)));
    goals.push(physics.registerBody(bodyTypes.createBoxBody(width - 92, height - 25, 25, 30, 0, Infinity)));

    for(let g of goals){
        g.isTrigger = true;
        g.static = true;
        g.collidedFunc = goalScored;
    }

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
}

// Runtime
function draw(){
    // Physics
    physics.update(1);

    // Rendering
    background(220);
    world.render();

    for(let c of circles){
        // Slow down the circles a little every frame
        c.rb.vel.mult(0.99);

        // Render the circles
        c.render();
    }
    cueBall.rb.vel.mult(0.99);
    cueBall.render();

    for(let g of goals){ g.render(); }

    // Logic
    if(grabPos != undefined){
        grabPos.x = mouseX;
        grabPos.y = mouseY;

        resetMatrix();
        line(cueBall.rb.pos.x, cueBall.rb.pos.y, grabPos.x, grabPos.y);
    }
}

function mousePressed(){
    // Start pulling back to show velocity line
    grabPos = createVector(mouseX, mouseY);
}

function mouseReleased(){
    // Apply the forces
    cueBall.rb.acc.add(p5.Vector.mult(p5.Vector.sub(grabPos, cueBall.rb.pos), -0.075));
    grabPos = undefined;
}