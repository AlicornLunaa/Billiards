/**
 * The body class will contain a position, rotation, and
 * assosciated velocities. This will get updated by the
 * physics world if dynamics are enabled. A collision
 * manifold may also change the values.
 */
class Body {
    /**
     * Creates a new body for the physics world. A collider must be attached manually
     * @param {float} x 
     * @param {float} y 
     * @param {float} rotation 
     * @param {float} mass 
     */
    constructor(x, y, rotation, mass){
        this.pos = createVector(x, y); // The vector containing the position of the body
        this.vel = createVector(0, 0); // The vector containing the velocity
        this.acc = createVector(0, 0); // The vector containing acceleration forces
        this.rotation = rotation; // The float containing the rotation of the polygon
        this.angVel = 0; // The float containing the rotational velocity
        this.mass = mass;
        this.id = -1; // ID to track within the physics world.

        this.colliders = []; // An array containing colliders for the body to hit

        this.collidedFunc = (otherBody) => {}; // Collision callback
    }

    /**
     * Attaches a collider to the body
     * @param {Collider} collider 
     * @returns {Collider} The collider supplied
     */
    addCollider(collider){
        this.colliders.push(collider);
        return collider;
    }

    /**
     * Returns the transformed point of the collider based on the body's transform
     * @param {*} collider ID for the collider to access 
     * @param {*} point The ID of the point on the collider
     * @returns {p5.Vector}
     */
    getPoint(collider, point){
        // Get the local point
        let localP = this.colliders[collider].getPoint(point);

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

        // Return the results
        return transformed;
    }

    /**
     * Draw every collider attached as well as the center point
     */
    render(){
        for(let c of this.colliders){
            // Offset the shape
            resetMatrix();
            translate(this.pos.x, this.pos.y);
            rotate(this.rotation);

            // Draw the collider
            c.render();
        }
    }

}

// Helper functions
let bodyTypes = {
    createBoxBody(x, y, width, height, rotation, mass){
        let b = new Body(x, y, rotation, mass);
        b.addCollider(colliderTypes.createBoxCollider(0, 0, width, height, 0));

        return b;
    }
};