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
        this.torque = 0;
        this.mass = mass;
        this.elasticity = 1;
        this.inertia = 1000;
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
     * Returns true or false if an object is intersecting with another object using separating axis thoerem
     * @param {Body} body 
     * @returns {Manifold}
     */
     intersects(body){
        // Variables
        let manifold = new Manifold(false, createVector(0, 0), 0, createVector(0, 0), this, body);

        let minimumOverlap = Infinity;
        let minimumTranslation = createVector(0, 0);
        let maximumOverlap = -Infinity;
        let maximumContact = createVector(0, 0);

        // Check every collider against each other
        for(let colliderID1 = 0; colliderID1 < this.colliders.length; colliderID1++){
            let c1 = this.colliders[colliderID1];

            for(let colliderID2 = 0; colliderID2 < body.colliders.length; colliderID2++){
                let c2 = body.colliders[colliderID2];
                let collision = true;

                // Loop through every edge of the collider
                for(let i = 0; i < c1.vertices.length; i++){
                    let start = this.getPoint(colliderID1, i);
                    let end = this.getPoint(colliderID1, (i + 1) % c1.vertices.length);
                    let edge = p5.Vector.sub(end, start);
                    edge = createVector(edge.y, -edge.x);
                    edge.normalize();

                    let min1 = Infinity;
                    let max1 = -Infinity;
                    let min2 = Infinity;
                    let max2 = -Infinity;
                    
                    // Loop through every vertex of this polygon and get its projection
                    for(let k = 0; k < c1.vertices.length; k++){
                        let proj = edge.dot(this.getPoint(colliderID1, k));
                        min1 = min(proj, min1);
                        max1 = max(proj, max1);
                    }
                    
                    // Loop through every vertex of the other polygon and get its projection
                    for(let k = 0; k < c2.vertices.length; k++){
                        let v = body.getPoint(colliderID2, k);
                        let proj = edge.dot(v);
                        min2 = min(proj, min2);
                        max2 = max(proj, max2);
                        
                        let overlap = Utility.lineIntersection(p5.Vector.sub(end, start), p5.Vector.sub(v, body.pos));
                        if(overlap > maximumOverlap){
                            maximumOverlap = overlap;
                            maximumContact = v;
                        }
                    }

                    // Check for a separating axis
                    let overlap = max(max2, min2) - min(max1, min1);
                    if(!(max2 >= min1 && max1 >= min2)){
                        collision = false;
                        break;
                    }

                    // Get minimum translation vector
                    if(overlap < minimumOverlap){
                        minimumOverlap = overlap;
                        minimumTranslation = edge;
                    }
                }
                
                if(collision){
                    manifold.collides = true;
                    manifold.normal = minimumTranslation;
                    manifold.intersection = minimumOverlap;
                    manifold.contactPoint = maximumContact;
                }
            }
        }

        return manifold;
    }

    /**
     * Applies the current matrices for rendering
     */
    applyMatrices(){
        resetMatrix();
        translate(this.pos.x, this.pos.y);
        angleMode(DEGREES);
        rotate(this.rotation);
    }

    /**
     * Draw every collider attached as well as the center point
     */
    render(){
        for(let c of this.colliders){
            // Offset the shape
            this.applyMatrices();

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