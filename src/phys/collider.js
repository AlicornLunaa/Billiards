/**
 * A collider will contain vertices and an offset vector
 * which will allow bodies to have multiple colliders
 */
class Collider {
    /**
     * Constructs a new collider object to be attached to a body for collisions
     * @param {float} x The X offset of the collider with the parent
     * @param {float} y The Y offset of the collider with the parent
     * @param {float} rotation The rotational offset of the collider with the parent
     */
    constructor(x, y, rotation){
        this.pos = createVector(x, y);
        this.rotation = rotation;
        this.vertices = [];
    }

    /**
     * This function will add a vertex to the collider shape.
     * @param {float} x 
     * @param {float} y 
     */
    addPoint(x, y){
        this.vertices.push(createVector(x, y));
        return this.vertices.length - 1;
    }

    /**
     * Removes the point at the given position
     * @param {integer} n Index of the point
     */
    removePoint(n){
        this.vertices.splice(n, 1);
    }

    /**
     * Returns the tranformed point on the collider
     * @param {integer} point 
     * @returns {p5.Vector}
     */
    getPoint(point){
        // Create settings
        angleMode(DEGREES);

        // Get the local point
        let localP = this.vertices[point];

        // Transform the point in relation to the body
        let c = cos(this.rotation);
        let s = sin(this.rotation);

        let transformed = createVector(
            localP.x * c - localP.y * s,
            localP.x * s + localP.y * c
        );

        // Fix origin
        transformed.x += this.pos.x;
        transformed.y += this.pos.y;

        // Return data
        return transformed;
    }

    // Gets the collider type based on the amount of vertices supplied
    getType(){
        switch(this.vertices.length){
        case 0:
            return "invalid";
        case 1:
            return "point";
        case 2:
            return "line";
        default:
            return "polygon";
        }
    }

    /**
     * Debug rendering the collider
     */
    render(){
        rotate(this.rotation);
        translate(this.pos.x, this.pos.y);

        for(let i = 0; i < this.vertices.length; i++){
            let start = this.vertices[i];
            let end = this.vertices[(i + 1) % this.vertices.length];

            circle(start.x, start.y, 3);
            line(start.x, start.y, end.x, end.y);
        }
    }
}

class CircleCollider extends Collider {
    /**
     * Constructs a circle collider, not to have vertex functions used on.
     * @param {float} x The X offset of the collider with the parent
     * @param {float} y The Y offset of the collider with the parent
     * @param {float} radius The radius of the circle collider
     */
    constructor(x, y, radius){
        super(x, y, 0);
        this.radius = radius;
    }

    // Gets the collider type based on the amount of vertices supplied
    getType(){ return "circle"; }
    
    /**
     * Debug rendering the collider
     */
    render(){
        translate(this.pos.x, this.pos.y);
        circle(0, 0, 3);
        circle(0, 0, this.radius * 2);
    }
};

// Helper functions
let colliderTypes = {
    createBoxCollider(x, y, width, height, rotation){
        let halfWidth = width / 2;
        let halfHeight = height / 2;

        let c = new Collider(x, y, rotation);
        c.addPoint(-halfWidth, -halfHeight);
        c.addPoint(halfWidth, -halfHeight);
        c.addPoint(halfWidth, halfHeight);
        c.addPoint(-halfWidth, halfHeight);

        return c;
    }
};