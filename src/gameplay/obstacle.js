/**
 * An obstacle is a type of object that cannot be pushed
 * but will interact with the balls. They may be placed
 * in ways that would impede easy shots, or just be
 * annoying. They should be a random shape such as
 * a triangle up to an octagon.
 */
class Obstacle {
    constructor(physics, x, y, radius, vertexCount){
        this.rb = physics.registerBody(new Body(x, y, 0, random(1, 100)));
        this.radius = radius;

        let c = new Collider(0, 0, 0);
        for(let v = 0; v < vertexCount; v++){
            angleMode(DEGREES);
            let r = v / vertexCount * 360;
            let x = cos(r) * radius - sin(r) * radius;
            let y = sin(r) * radius + cos(r) * radius;

            c.addPoint(x, y);
        }
        this.rb.addCollider(c);

        this.rb.static = true;
    }

    render(){
        this.rb.applyMatrices();

        fill(85);
        
        beginShape(TRIANGLE_FAN);
        vertex(0, 0);
        for(let i = 0; i < this.rb.colliders[0].vertices.length; i++){
            let v1 = this.rb.colliders[0].vertices[i];
            let v2 = this.rb.colliders[0].vertices[(i + 1) % this.rb.colliders[0].vertices.length];
            vertex(v1.x, v1.y);
            vertex(v2.x, v2.y);
        }
        endShape();
    }
}