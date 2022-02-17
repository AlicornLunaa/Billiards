/**
 * The ball class will contain a rigidbody as well as
 * information about the ball that has been placed.
 * This may include but is not limited to color and number.
 */
class Ball {
    constructor(physics, x, y, color, number){
        this.rb = physics.registerBody(bodyTypes.createCircleBody(x, y, 6, 10));
        this.color = color;
        this.number = number;
    }

    render(){
        this.rb.applyMatrices();

        fill(this.color);
        circle(0, 0, this.rb.colliders[0].radius * 2);
        fill("black");
        textAlign(CENTER);
        textSize(10);
        text(this.number, -0.5, 4);
        fill("white");
    }
}