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