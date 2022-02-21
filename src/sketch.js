// Variables
let physics;
let world;
let goals = [];
let circles = [];
let potted = []; // List of the bodies that were scored
let cueBall;
let grabPos;
let gameState = {
    over: false,
    won: false,
    nextMove: true,
    debug: false
};

// Functions
function setupTable(x, y){
    let index = 0;
    let rowSize = 1;
    let spacing = 14;
    let exit = false;

    while(!exit){
        for(let row = 0; row < rowSize && !exit; row++){
            for(let col = 0; col < row + 1 && !exit; col++){
                let c = circles[index];
                
                c.rb.pos.x = x + (col - row / 2) * spacing;
                c.rb.pos.y = y - row * spacing;

                index++;
                exit = index >= circles.length;
            }

            rowSize++;
        }
    }

    // Swap 5 and 8 so that 8 is in the middle
    let temp = circles[4].rb.pos;
    circles[4].rb.pos = circles[7].rb.pos;
    circles[7].rb.pos = temp;

    // Set cue ball position
    circles[15].rb.pos.x = width / 2;
    circles[15].rb.pos.y = height - height / 4;
}

function goalScored(self, other){
    // Save collision if it doesnt exist
    let exists = false;
    for(let pot of potted){
        if(pot.ball.id === other.id){
            exists = true;
            break;
        }
    }
    if(exists) return;

    potted.push({
        goal: self,
        ball: other
    });

    if(other.id === cueBall.rb.id){
        // Cue ball was potted, end game
        gameState.over = true;
        gameState.won = false;
    } else if(other.id === circles[7].rb.id){
        // 8 ball was potted, check if everything else was potted first
        if(potted.length >= 14){
            gameState.won = true;
        }

        gameState.over = true;
    } else {
        // Regular ball was potted
        other.collidable = false;
        other.vel.mult(0);
    }
}

function drawBackground(){
    resetMatrix();
    background(200);

    // Exterior border
    rectMode(CENTER);
    fill(54, 19, 0);
    rect(width / 2, height / 2, 270, 410);

    // Interior green
    fill(5, 102, 15);
    rect(width / 2, height / 2, 210, 350);

    // Holes
    fill(2, 38, 5);
    rect(95, 28, 24, 24, 10, 10, 10, 10); // Top left
    rect(85, height / 2, 20, 24, 10, 0, 0, 10); // Mid left
    rect(95, height - 28, 24, 24, 10, 10, 10, 10); // Bottom left
    rect(width - 95, 28, 24, 24, 10, 10, 10, 10); // Top right
    rect(width - 85, height / 2, 20, 24, 0, 10, 10, 0); // Mid right
    rect(width - 95, height - 28, 24, 24, 10, 10, 10, 10); // Bottom right

    // Reset
    fill(255);
}

function displayEnding(){
    resetMatrix();
    fill(255);
    stroke(0);
    strokeWeight(2);
    textAlign(CENTER);
    text("Game over!", width / 2, height / 2);

    if(gameState.won){
        text("You won!", width / 2, height / 2 + 20);
    } else {
        text("You lost!", width / 2, height / 2 + 20);
    }

    strokeWeight(0.4);
}

// Initializer
function setup(){
    // Initialize window
    createCanvas(400, 405);
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
    goals.push(physics.registerBody(bodyTypes.createBoxBody(90, 24, 20, 25, 0, Infinity)));
    goals.push(physics.registerBody(bodyTypes.createBoxBody(85.5, height / 2, 10, 20, 0, Infinity)));
    goals.push(physics.registerBody(bodyTypes.createBoxBody(90, height - 24, 20, 25, 0, Infinity)));
    goals.push(physics.registerBody(bodyTypes.createBoxBody(width - 90, 24, 20, 25, 0, Infinity)));
    goals.push(physics.registerBody(bodyTypes.createBoxBody(width - 85.5, height / 2, 10, 20, 0, Infinity)));
    goals.push(physics.registerBody(bodyTypes.createBoxBody(width - 90, height - 24, 20, 25, 0, Infinity)));

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
    circles.push(new Ball(physics, 200, 300, "white", " "));
    cueBall = circles[15];
    setupTable(200, 200);
}

// Runtime
function draw(){
    // Physics
    physics.update(1);

    // Rendering
    background(220);
    drawBackground();

    gameState.nextMove = true;
    for(let c of circles){
        // Slow down the circles a little every frame
        c.rb.vel.mult(0.98);

        // Dont allow another shot until everything slows down
        if(c.rb.vel.magSq() > 0.045) gameState.nextMove = false;

        // Render the circles
        c.render();
    }

    if(gameState.debug){
        world.render();

        for(let g of goals){
            g.render();
        }
    }

    if(gameState.over){ displayEnding(); }

    // Logic
    for(let pot of potted){
        pot.ball.vel = p5.Vector.mult(p5.Vector.sub(pot.goal.pos, pot.ball.pos), 0.1);
    }

    if(grabPos != undefined && !gameState.over && gameState.nextMove){
        grabPos.x = mouseX;
        grabPos.y = mouseY;

        resetMatrix();
        line(cueBall.rb.pos.x, cueBall.rb.pos.y, grabPos.x, grabPos.y);
    }
}

function mousePressed(){
    // Start pulling back to show velocity line
    if(gameState.over || !gameState.nextMove){
        grabPos = undefined;
        return;
    }

    grabPos = createVector(mouseX, mouseY);
}

function mouseReleased(){
    // Apply the forces
    if(gameState.over || !gameState.nextMove || grabPos == undefined) return;
    
    cueBall.rb.acc.add(p5.Vector.mult(p5.Vector.sub(grabPos, cueBall.rb.pos), -0.075));
    grabPos = undefined;
}